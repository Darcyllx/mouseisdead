import { gestureEngine } from "./gesture.js";
import { ingredients, steps, ingredientSvgs } from "./recipe.js";
import { stepSvgs, gestureSvgs, gestureIconSvgs } from "./animations.js";
import { tutorialSteps } from "./tutorial.js";

// --- DOM helpers ---------------------------------------------------------

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.from(document.querySelectorAll(sel));

function setView(view) {
  state.view = view;
  $$("section[data-view]").forEach((s) => s.classList.remove("active"));
  const el = document.querySelector(`section[data-view="${view}"]`);
  if (el) el.classList.add("active");

  // Show/hide camera preview
  const showCamera = view !== "tutorial-intro" && view !== "finish";
  $("#cameraPreview").classList.toggle("visible", showCamera);
}

function toast(message) {
  const el = $("#gestureToast");
  el.innerHTML = `<span class="gesture-toast__dot"></span>${message}`;
  el.classList.add("visible");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.remove("visible"), 1400);
}

function setTutorialStatus(view, opts = {}) {
  const { success = false, text } = opts;
  const el = document.querySelector(
    `section[data-view="${view}"] .tutorial-status`,
  );
  if (!el) return;
  el.classList.toggle("success", success);
  if (text) el.querySelector(".tutorial-status__text").textContent = text;
}

// --- State ---------------------------------------------------------------

const state = {
  view: "tutorial-intro",
  tutorialIndex: 0,
  tutorialOpenPalmCount: 0,
  currentStep: 0,
  paused: false,
  booted: false,
};

// --- Rendering -----------------------------------------------------------

function renderIngredients() {
  const list = $("#ingredientsList");
  list.innerHTML = ingredients
    .map(
      (ing, i) => `
      <li class="ingredients-list__item" style="animation-delay: ${i * 80}ms">
        <span class="ingredients-list__icon">${ingredientSvgs[ing.iconId] || ""}</span>
        <span class="ingredients-list__name">${ing.name}</span>
        <span class="ingredients-list__amount">${ing.amount}</span>
      </li>`,
    )
    .join("");
}

function renderTutorialIllustrations() {
  $$("[data-gesture-illustration]").forEach((el) => {
    const key = el.dataset.gestureIllustration;
    el.innerHTML = `<div class="gesture-illustration">${gestureSvgs[key] || ""}</div>`;
  });
  $$("[data-icon]").forEach((el) => {
    const key = el.dataset.icon;
    el.innerHTML = gestureIconSvgs[key] || "";
  });
}

function renderStep(index) {
  state.currentStep = index;
  const step = steps[index];
  if (!step) return;

  // Inject animation SVG (replace container to restart CSS animations)
  const container = $("#stepAnimation");
  container.innerHTML = "";
  // Force reflow to replay animations
  void container.offsetWidth;
  container.innerHTML = stepSvgs[step.animationId] || "";

  $("#stepEyebrow").textContent = `Step ${index + 1} of ${steps.length}`;
  $("#stepText").textContent = step.text;
  $("#stepHint").textContent =
    index === steps.length - 1
      ? "Thumbs up to finish."
      : "Swipe left for next · Swipe right to go back";

  // Progress dots
  const dots = steps
    .map((_, i) => {
      const cls =
        i < index ? "progress-dots__dot done" : i === index ? "progress-dots__dot active" : "progress-dots__dot";
      return `<span class="${cls}"></span>`;
    })
    .join("");
  $("#stepProgress").innerHTML = dots;
}

function renderTutorialProgressDots() {
  $$(".progress-dots[data-progress='tutorial']").forEach((el) => {
    const total = Number(el.dataset.total);
    const current = Number(el.dataset.current);
    el.innerHTML = Array.from({ length: total })
      .map((_, i) => {
        const cls =
          i < current - 1
            ? "progress-dots__dot done"
            : i === current - 1
              ? "progress-dots__dot active"
              : "progress-dots__dot";
        return `<span class="${cls}"></span>`;
      })
      .join("");
  });
}

// --- Tutorial flow -------------------------------------------------------

function advanceTutorial(successText) {
  const step = tutorialSteps[state.tutorialIndex];
  setTutorialStatus(step.view, { success: true, text: successText });
  setTimeout(() => {
    state.tutorialIndex += 1;
    if (state.tutorialIndex >= tutorialSteps.length) {
      setView("tutorial-complete");
    } else {
      setView(tutorialSteps[state.tutorialIndex].view);
    }
  }, 900);
}

// --- Pause handling ------------------------------------------------------

function setPaused(paused) {
  state.paused = paused;
  gestureEngine.setPaused(paused);
  $("#pauseOverlay").classList.toggle("visible", paused);
  $("#pauseOverlay").setAttribute("aria-hidden", paused ? "false" : "true");
}

// --- Gesture event wiring ------------------------------------------------

function wireGestureEvents() {
  gestureEngine.addEventListener("thumbsup", () => {
    if (state.paused) return;
    toast("Thumbs up");
    handleThumbsUp();
  });

  gestureEngine.addEventListener("swiperight", () => {
    if (state.paused) return;
    toast("Swipe right");
    handleSwipeRight();
  });

  gestureEngine.addEventListener("swipeleft", () => {
    if (state.paused) return;
    toast("Swipe left");
    handleSwipeLeft();
  });

  gestureEngine.addEventListener("openpalm", () => {
    handleOpenPalm();
  });
}

function handleThumbsUp() {
  const v = state.view;
  if (v === "tutorial-thumbsup") {
    advanceTutorial(tutorialSteps[state.tutorialIndex].success);
  } else if (v === "ingredients") {
    setView("step");
    renderStep(0);
  } else if (v === "step" && state.currentStep === steps.length - 1) {
    setView("completed");
  } else if (v === "completed") {
    setView("finish");
    $("#cameraPreview").classList.remove("visible");
  }
}

function handleSwipeLeft() {
  const v = state.view;
  if (v === "tutorial-swipe-left") {
    advanceTutorial(tutorialSteps[state.tutorialIndex].success);
  } else if (v === "step" && state.currentStep < steps.length - 1) {
    renderStep(state.currentStep + 1);
  } else if (v === "step" && state.currentStep === steps.length - 1) {
    setView("completed");
  }
}

function handleSwipeRight() {
  const v = state.view;
  if (v === "tutorial-swipe-right") {
    advanceTutorial(tutorialSteps[state.tutorialIndex].success);
  } else if (v === "step" && state.currentStep > 0) {
    renderStep(state.currentStep - 1);
  } else if (v === "completed") {
    setView("step");
    renderStep(steps.length - 1);
  }
}

function handleOpenPalm() {
  const v = state.view;

  // Tutorial open-palm step: first triggers pause, second resumes
  if (v === "tutorial-open-palm") {
    if (state.tutorialOpenPalmCount === 0) {
      state.tutorialOpenPalmCount = 1;
      setPaused(true);
      setTutorialStatus(v, { text: "Paused. Open your hand again to resume…" });
    } else {
      state.tutorialOpenPalmCount = 2;
      setPaused(false);
      advanceTutorial(tutorialSteps[state.tutorialIndex].success);
    }
    return;
  }

  // Global pause toggle on any recipe view (ingredients, step, completed)
  const pausable = ["ingredients", "step", "completed"];
  if (pausable.includes(v)) {
    toast(state.paused ? "Resumed" : "Paused");
    setPaused(!state.paused);
  }
}

// --- Button handlers -----------------------------------------------------

function wireButtons() {
  $("#enableCameraBtn").addEventListener("click", boot);
  $("#startTutorialBtn").addEventListener("click", () => {
    state.tutorialIndex = 0;
    state.tutorialOpenPalmCount = 0;
    setView(tutorialSteps[0].view);
  });
  $("#startCookingBtn").addEventListener("click", () => {
    setView("ingredients");
  });
  $("#restartBtn").addEventListener("click", () => {
    state.tutorialIndex = 0;
    state.tutorialOpenPalmCount = 0;
    state.currentStep = 0;
    setPaused(false);
    setView("tutorial-intro");
  });
}

// --- Boot ----------------------------------------------------------------

async function boot() {
  const status = $("#bootStatus");
  const btn = $("#enableCameraBtn");
  btn.disabled = true;
  status.textContent = "Loading camera and gesture model…";
  try {
    const videoEl = $("#camera");
    await gestureEngine.init(videoEl);
    state.booted = true;
    wireGestureEvents();
    $("#bootScreen").classList.add("hidden");
  } catch (err) {
    console.error(err);
    btn.disabled = false;
    status.textContent = `Couldn't start the camera: ${err.message || err}. Make sure you allow camera access.`;
  }
}

// --- Init ----------------------------------------------------------------

function init() {
  renderIngredients();
  renderTutorialIllustrations();
  renderTutorialProgressDots();
  wireButtons();
  setView("tutorial-intro");
  // Keyboard fallback (also useful when testing without camera)
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") handleSwipeLeft();
    else if (e.key === "ArrowRight") handleSwipeRight();
    else if (e.key === "Enter" || e.key === " ") handleThumbsUp();
    else if (e.key === "p" || e.key === "P") handleOpenPalm();
  });
}

init();
