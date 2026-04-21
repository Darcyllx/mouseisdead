/**
 * Tutorial step configuration. Each entry names the view it owns and the
 * gesture event that completes it. `openpalm-toggle` means the user must
 * open palm, pause, then open palm again to resume (two events).
 */

export const tutorialSteps = [
  {
    view: "tutorial-thumbsup",
    gesture: "thumbsup",
    success: "Nice — that's a thumbs up.",
  },
  {
    view: "tutorial-swipe-left",
    gesture: "swipeleft",
    success: "That's a swipe left.",
  },
  {
    view: "tutorial-swipe-right",
    gesture: "swiperight",
    success: "That's a swipe right.",
  },
  {
    view: "tutorial-open-palm",
    gesture: "openpalm-toggle",
    success: "Perfect — you can pause and resume anytime.",
  },
];
