import {
  FilesetResolver,
  GestureRecognizer,
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/+esm";

const MODEL_URL =
  "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";
const WASM_URL =
  "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.8/wasm";

const GESTURE_SCORE_MIN = 0.6;
const GESTURE_COOLDOWN_MS = 1500;
const SWIPE_COOLDOWN_MS = 1500;
const SWIPE_WINDOW_MS = 500;
const SWIPE_THRESHOLD = 0.18;
const HISTORY_MAX = 30;

// Consecutive frames required before firing each named gesture. Open_Palm
// needs many more frames than Thumb_Up because mid-swipe the classifier
// frequently flickers to Open_Palm for a handful of frames.
const FRAME_REQ = { Thumb_Up: 3, Open_Palm: 12 };
const FRAME_REQ_DEFAULT = 3;

// Open_Palm-specific guards to avoid false pauses during a swipe.
const OPEN_PALM_STATIONARY_WINDOW_MS = 300;
const OPEN_PALM_STATIONARY_MAX_DX = 0.05; // normalized x range
const SWIPE_TO_PALM_LOCKOUT_MS = 1000;

class GestureEngine extends EventTarget {
  constructor() {
    super();
    this.recognizer = null;
    this.video = null;
    this.stream = null;
    this.running = false;
    this.lastGestureTime = 0;
    this.lastSwipeTime = 0;
    this.lastSwipeFireTime = 0;
    this.lastGestureName = null;
    this.gestureFrameCount = 0;
    this.paused = false;
    this.xHistory = [];
    this.currentGesture = "None";
    this.currentScore = 0;
  }

  async init(videoEl) {
    this.video = videoEl;

    // Request camera
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
        width: { ideal: 640 },
        height: { ideal: 480 },
      },
      audio: false,
    });
    this.stream = stream;
    this.video.srcObject = stream;
    await new Promise((resolve) => {
      if (this.video.readyState >= 2) resolve();
      else this.video.addEventListener("loadeddata", resolve, { once: true });
    });
    await this.video.play().catch(() => {});

    // Mirror feed to the preview element if present
    const previewVideo = document.getElementById("cameraPreviewVideo");
    if (previewVideo) previewVideo.srcObject = stream;

    // Load MediaPipe
    const vision = await FilesetResolver.forVisionTasks(WASM_URL);
    this.recognizer = await GestureRecognizer.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath: MODEL_URL,
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 1,
    });

    this.running = true;
    this._loop();
  }

  setPaused(paused) {
    this.paused = paused;
    if (paused) {
      this.xHistory = [];
    }
  }

  _loop = () => {
    if (!this.running) return;
    if (this.video && this.video.readyState >= 2 && this.recognizer) {
      const now = performance.now();
      let result;
      try {
        result = this.recognizer.recognizeForVideo(this.video, now);
      } catch (err) {
        console.warn("recognizeForVideo failed", err);
      }
      if (result) this._handleResult(result, now);
    }
    requestAnimationFrame(this._loop);
  };

  _handleResult(result, now) {
    const topGesture =
      result.gestures && result.gestures.length > 0 && result.gestures[0].length > 0
        ? result.gestures[0][0]
        : null;
    const landmarks =
      result.landmarks && result.landmarks.length > 0 ? result.landmarks[0] : null;

    this.currentGesture = topGesture ? topGesture.categoryName : "None";
    this.currentScore = topGesture ? topGesture.score : 0;

    this.dispatchEvent(
      new CustomEvent("frame", {
        detail: {
          gesture: this.currentGesture,
          score: this.currentScore,
          paused: this.paused,
        },
      }),
    );

    // Track wrist (landmark 0) x-position for swipe detection
    if (landmarks && landmarks.length > 0) {
      const wrist = landmarks[0];
      this.xHistory.push({ x: wrist.x, t: now });
      while (this.xHistory.length > HISTORY_MAX) this.xHistory.shift();
      while (this.xHistory.length > 0 && now - this.xHistory[0].t > SWIPE_WINDOW_MS) {
        this.xHistory.shift();
      }
      this._detectSwipe(now);
    } else {
      this.xHistory = [];
    }

    // Named gesture detection (thumbs up, open palm) — need 3 consecutive frames
    if (topGesture && topGesture.score >= GESTURE_SCORE_MIN) {
      const name = topGesture.categoryName;
      if (name === this.lastGestureName) {
        this.gestureFrameCount += 1;
      } else {
        this.lastGestureName = name;
        this.gestureFrameCount = 1;
      }

      const required = FRAME_REQ[name] || FRAME_REQ_DEFAULT;
      if (this.gestureFrameCount === required) {
        this._fireGesture(name, now);
      }
    } else {
      this.lastGestureName = null;
      this.gestureFrameCount = 0;
    }
  }

  _fireGesture(name, now) {
    if (now - this.lastGestureTime < GESTURE_COOLDOWN_MS) return;

    if (name === "Open_Palm") {
      // Reject if a swipe just fired — the classifier often flickers to
      // Open_Palm at the tail end of a swipe.
      if (now - this.lastSwipeFireTime < SWIPE_TO_PALM_LOCKOUT_MS) {
        this.gestureFrameCount = 0;
        return;
      }
      // Reject if the hand is still moving horizontally.
      if (!this._isHandStationary(now)) {
        this.gestureFrameCount = 0;
        return;
      }
      // Open palm is always allowed — it's the pause/resume toggle
      this.lastGestureTime = now;
      this.dispatchEvent(new CustomEvent("openpalm"));
      return;
    }

    // All other gestures suppressed while paused
    if (this.paused) return;

    if (name === "Thumb_Up") {
      this.lastGestureTime = now;
      this.dispatchEvent(new CustomEvent("thumbsup"));
    }
  }

  _isHandStationary(now) {
    const recent = this.xHistory.filter(
      (p) => now - p.t <= OPEN_PALM_STATIONARY_WINDOW_MS,
    );
    if (recent.length < 2) return true;
    let min = Infinity;
    let max = -Infinity;
    for (const p of recent) {
      if (p.x < min) min = p.x;
      if (p.x > max) max = p.x;
    }
    return max - min <= OPEN_PALM_STATIONARY_MAX_DX;
  }

  _detectSwipe(now) {
    if (this.paused) return;
    if (now - this.lastSwipeTime < SWIPE_COOLDOWN_MS) return;
    if (this.xHistory.length < 5) return;

    const first = this.xHistory[0];
    const last = this.xHistory[this.xHistory.length - 1];
    const dist = first.x - last.x; // unmirrored feed
    const dt = last.t - first.t;

    if (dt < 100) return;

    // In the unmirrored MediaPipe feed, the user's "swipe right" (their
    // perspective) causes x to decrease (hand moves to the viewer-left of
    // the frame). Preserve the prototype mapping.
    if (dist > SWIPE_THRESHOLD) {
      this.lastSwipeTime = now;
      this.lastSwipeFireTime = now;
      this.gestureFrameCount = 0;
      this.xHistory = [];
      this.dispatchEvent(new CustomEvent("swiperight"));
    } else if (dist < -SWIPE_THRESHOLD) {
      this.lastSwipeTime = now;
      this.lastSwipeFireTime = now;
      this.gestureFrameCount = 0;
      this.xHistory = [];
      this.dispatchEvent(new CustomEvent("swipeleft"));
    }
  }
}

export const gestureEngine = new GestureEngine();
