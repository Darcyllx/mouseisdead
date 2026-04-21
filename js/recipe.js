export const ingredients = [
  { name: "Gloves", amount: "1 pair", iconId: "gloves" },
  { name: "Canned tuna", amount: "1 spoon", iconId: "tuna" },
  { name: "Mayo", amount: "1 spoon", iconId: "mayo" },
  { name: "Small bowl", amount: "for mixing", iconId: "bowl" },
  { name: "Plastic wrap", amount: "1 medium sheet", iconId: "wrap" },
  { name: "Cooked rice", amount: "~3 spoons", iconId: "rice" },
  { name: "Nori (seaweed)", amount: "1 sheet", iconId: "nori" },
];

export const steps = [
  {
    text: "Put on gloves.",
    hint: "Start clean before handling rice.",
    animationId: 1,
  },
  {
    text: "Mix 1 spoon of tuna with 1 spoon of mayo in a small bowl.",
    hint: "Stir until smooth and creamy.",
    animationId: 2,
  },
  {
    text: "Lay out a medium sheet of plastic wrap, about the size of both hands.",
    hint: "This will shape your onigiri.",
    animationId: 3,
  },
  {
    text: "Place about 2 spoons of rice in the center and flatten it gently.",
    hint: "Make a shallow dish for the filling.",
    animationId: 4,
  },
  {
    text: "Add the tuna mayo filling in the middle.",
    hint: "Keep it centered — don't overfill.",
    animationId: 5,
  },
  {
    text: "Top with about 1 more spoon of rice.",
    hint: "Fully cover the filling.",
    animationId: 6,
  },
  {
    text: "Wrap it and shape it into a triangle.",
    hint: "Twist the plastic wrap and press the edges.",
    animationId: 7,
  },
  {
    text: "Remove the plastic wrap.",
    hint: "Gently — keep the triangle shape.",
    animationId: 8,
  },
  {
    text: "Wrap with a sheet of seaweed.",
    hint: "Press the nori around the bottom.",
    animationId: 9,
  },
  {
    text: "Done.",
    hint: "Give a thumbs up to finish.",
    animationId: 10,
  },
];

export const ingredientSvgs = {
  gloves:
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 20V10a2 2 0 0 1 4 0v6"/><path d="M14 16v-8a2 2 0 0 1 4 0v8"/><path d="M18 16v-6a2 2 0 0 1 4 0v10c0 3-2 6-6 6s-6-3-6-6"/><path d="M22 14v4"/></svg>',
  tuna:
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 16c4-6 12-6 18-4l4-2v12l-4-2c-6 2-14 2-18-4z"/><circle cx="22" cy="14" r="1" fill="currentColor"/></svg>',
  mayo:
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="8" width="12" height="18" rx="2"/><path d="M12 8V6h8v2"/><path d="M14 14h4"/></svg>',
  bowl:
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14h24c0 7-5 12-12 12S4 21 4 14z"/><path d="M10 10c0-2 2-4 6-4s6 2 6 4"/></svg>',
  wrap:
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="24" height="16" rx="1"/><path d="M4 12l24-2M4 20l24-2"/></svg>',
  rice:
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="10" cy="12" rx="3" ry="2"/><ellipse cx="18" cy="10" rx="3" ry="2"/><ellipse cx="22" cy="16" rx="3" ry="2"/><ellipse cx="14" cy="18" rx="3" ry="2"/><ellipse cx="20" cy="22" rx="3" ry="2"/></svg>',
  nori:
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="24" height="16" rx="1" fill="currentColor" fill-opacity="0.15"/><path d="M8 12h16M8 16h16M8 20h16"/></svg>',
};
