# Onigiri — a gesture-controlled recipe

A web app that walks you through making tuna mayo rice balls using only hand gestures. Works on desktop and mobile browsers with a front camera.

Powered by [MediaPipe Tasks Vision](https://developers.google.com/mediapipe) `GestureRecognizer`. Visual language inspired by Claude's warm cream + coral design system.

## Gestures

| Gesture      | What it does                              |
|--------------|-------------------------------------------|
| 👍 Thumbs up | Confirm / proceed / finish                |
| 👉 Swipe right | Next step                               |
| 👈 Swipe left  | Previous step                           |
| ✋ Open palm | Pause everything · open palm again to resume |

## User flow

1. **Tutorial** — four short screens that practice each gesture against live camera input.
2. **Start cooking** — click "Start cooking" (mouse) after the tutorial.
3. **Ingredients check** — review the ingredient list, thumbs up when ready.
4. **Ten recipe steps** — swipe to navigate. At any time, open palm to pause (no other gestures register while paused).
5. **Finish** — thumbs up on the completion screen to wrap up.

Keyboard fallback (useful without a camera): `→` next, `←` back, `Enter`/`Space` confirm, `p` pause.

## Run locally

MediaPipe needs to be served over HTTP(S) — it won't work from `file://`.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static HTTP server works (`npx serve`, `caddy`, etc.).

Browsers require HTTPS for camera access on anything other than `localhost`, so to test on a phone you need either:
- a tunnel like `ngrok http 8000`, or
- deploy to GitHub Pages (below).

## Deploy to GitHub Pages

1. Push to `main` (or whatever branch is set as the Pages source).
2. Settings → Pages → Source = `main` / `root`.
3. Wait a minute, open `https://<user>.github.io/mouseisdead/`.

No build step — all files are static.

## File layout

```
index.html            Single-page app with all view sections
css/style.css         Design tokens + layouts + step animations (CSS keyframes)
js/app.js             State machine, view rendering, button + gesture wiring
js/gesture.js         MediaPipe wrapper — dispatches thumbsup / swipe* / openpalm events
js/recipe.js          Ingredients list + 10 steps (text, hint, animation id)
js/animations.js      Inline SVGs for each step + tutorial gesture illustrations
js/tutorial.js        Tutorial step order and success messages
```

## Tweaking

- Change the recipe → edit `js/recipe.js`. Each step references an `animationId` from `js/animations.js`.
- Adjust gesture sensitivity → `GESTURE_SCORE_MIN`, `SWIPE_THRESHOLD`, `SWIPE_WINDOW_MS`, and the cooldown constants at the top of `js/gesture.js`.
- Change colors/type → CSS variables in `css/style.css` under `:root`.

## Privacy

Camera video is processed entirely in-browser by MediaPipe — nothing is uploaded or stored.
