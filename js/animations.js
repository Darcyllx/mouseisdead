/**
 * Inline SVG line animations for each recipe step and tutorial gesture.
 * All use stroke-based minimal line art; motion is driven by CSS keyframes
 * defined in css/style.css (class names like `.anim-s1-glove`).
 */

const COMMON_ATTRS =
  'viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" ' +
  'stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"';

// --- Gesture illustrations (tutorial) --------------------------------------

export const gestureSvgs = {
  thumbsup: `
    <svg class="gesture-illustration-svg" ${COMMON_ATTRS}>
      <g class="anim-thumb tutorial-hand">
        <g transform="translate(30 30) scale(4.375)">
          <path d="M7 13h4l2.5-6.5a2.5 2.5 0 0 1 4.5 1.5V12h6a3 3 0 0 1 3 3c0 1.5-1 4-2 7s-4 5-7 5h-7V13z" vector-effect="non-scaling-stroke"/>
          <rect x="3" y="13" width="4" height="12" rx="1" vector-effect="non-scaling-stroke"/>
        </g>
      </g>
    </svg>`,

  "swipe-right": `
    <svg class="gesture-illustration-svg" ${COMMON_ATTRS}>
      <g class="tutorial-hand" transform="translate(30 30) scale(4.375)">
        <path d="M10 24v-8a2 2 0 0 1 4 0v2v-6a2 2 0 0 1 4 0v6v-8a2 2 0 0 1 4 0v8v-6a2 2 0 0 1 4 0v6v-1a2 2 0 0 1 4 0v5a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6z" vector-effect="non-scaling-stroke"/>
      </g>
      <g class="anim-swipe-arrow">
        <path d="M40 100 h70" class="accent" stroke-width="4" vector-effect="non-scaling-stroke" />
        <path d="M100 90 l12 10 -12 10" class="accent" stroke-width="4" vector-effect="non-scaling-stroke" />
      </g>
    </svg>`,

  "swipe-left": `
    <svg class="gesture-illustration-svg" ${COMMON_ATTRS}>
      <g class="tutorial-hand" transform="translate(30 30) scale(4.375)">
        <path d="M22 24v-8a2 2 0 0 0-4 0v2v-6a2 2 0 0 0-4 0v6v-8a2 2 0 0 0-4 0v8v-6a2 2 0 0 0-4 0v6v-1a2 2 0 0 0-4 0v5a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6z" vector-effect="non-scaling-stroke"/>
      </g>
      <g class="anim-swipe-arrow anim-swipe-arrow--reverse">
        <path d="M160 100 h-70" class="accent" stroke-width="4" vector-effect="non-scaling-stroke" />
        <path d="M100 90 l-12 10 12 10" class="accent" stroke-width="4" vector-effect="non-scaling-stroke" />
      </g>
    </svg>`,

  openpalm: `
    <svg class="gesture-illustration-svg" ${COMMON_ATTRS}>
      <g class="anim-palm tutorial-hand">
        <g transform="translate(30 30) scale(4.375)">
          <path d="M6 22v-10a2 2 0 0 1 4 0v2v-6a2 2 0 0 1 4 0v6v-8a2 2 0 0 1 4 0v8v-6a2 2 0 0 1 4 0v6v-2a2 2 0 0 1 4 0v10a4 4 0 0 1-4 4h-12a4 4 0 0 1-4-4z" vector-effect="non-scaling-stroke"/>
        </g>
      </g>
    </svg>`,
};

// --- Step animations -------------------------------------------------------

export const stepSvgs = {
  // 1. Put on gloves
  1: `
    <svg class="step-svg" ${COMMON_ATTRS}>
      <!-- hand outline (openpalm shape, matches tutorial pause gesture) -->
      <g class="muted" opacity="0.4" transform="translate(36 46) scale(4)">
        <path d="M6 22v-10a2 2 0 0 1 4 0v2v-6a2 2 0 0 1 4 0v6v-8a2 2 0 0 1 4 0v8v-6a2 2 0 0 1 4 0v6v-2a2 2 0 0 1 4 0v10a4 4 0 0 1-4 4h-12a4 4 0 0 1-4-4z" stroke-width="0.55"/>
      </g>
      <!-- glove (animated, same shape so it lands cleanly on the hand) -->
      <g class="anim-s1-glove accent">
        <g transform="translate(36 46) scale(4)">
          <path d="M6 22v-10a2 2 0 0 1 4 0v2v-6a2 2 0 0 1 4 0v6v-8a2 2 0 0 1 4 0v8v-6a2 2 0 0 1 4 0v6v-2a2 2 0 0 1 4 0v10a4 4 0 0 1-4 4h-12a4 4 0 0 1-4-4z" stroke-width="0.55"/>
        </g>
      </g>
    </svg>`,

  // 2. Mix tuna + mayo in bowl
  2: `
    <svg class="step-svg" ${COMMON_ATTRS}>
      <!-- bowl (top view) -->
      <ellipse cx="100" cy="110" rx="60" ry="40" />
      <ellipse cx="100" cy="110" rx="50" ry="33" opacity="0.4" class="muted" />
      <!-- spoon stirring (head near center, handle extends outward) -->
      <g class="anim-s2-spoon accent">
        <ellipse cx="118" cy="110" rx="10" ry="7" />
        <line x1="128" y1="110" x2="168" y2="110" stroke-width="3" />
      </g>
      <!-- mixture swirls -->
      <path d="M80 100 q10 -8 20 0 q10 8 20 0" class="muted" opacity="0.5" />
    </svg>`,

  // 3. Lay out plastic wrap
  3: `
    <svg class="step-svg" ${COMMON_ATTRS}>
      <!-- roll on left -->
      <rect x="20" y="60" width="32" height="80" rx="3" class="muted" opacity="0.5" />
      <circle cx="36" cy="60" r="16" class="muted" opacity="0.5" />
      <!-- unrolled wrap (animated dash draw) -->
      <g class="accent">
        <path d="M52 60 h100" class="anim-s3-wrap" stroke-width="2.5" />
        <path d="M52 140 h100" class="anim-s3-wrap" stroke-width="2.5" />
        <path d="M152 60 v80" class="anim-s3-wrap" />
      </g>
      <!-- sparkles -->
      <path d="M95 100 l2.5 -5 l2.5 5 l5 2.5 l-5 2.5 l-2.5 5 l-2.5 -5 l-5 -2.5 z" class="muted" opacity="0.4" />
    </svg>`,

  // 4. Place rice and flatten
  4: `
    <svg class="step-svg" ${COMMON_ATTRS}>
      <!-- plate / wrap base -->
      <rect x="30" y="80" width="140" height="60" rx="4" class="muted" opacity="0.3" />
      <!-- rice grains (animated) -->
      <g class="anim-s4-rice">
        <ellipse cx="85" cy="105" rx="6" ry="4" />
        <ellipse cx="100" cy="100" rx="6" ry="4" />
        <ellipse cx="115" cy="105" rx="6" ry="4" />
        <ellipse cx="92" cy="115" rx="6" ry="4" />
        <ellipse cx="108" cy="115" rx="6" ry="4" />
        <ellipse cx="100" cy="110" rx="6" ry="4" />
      </g>
    </svg>`,

  // 5. Add filling
  5: `
    <svg class="step-svg" ${COMMON_ATTRS}>
      <!-- rice bed -->
      <ellipse cx="100" cy="130" rx="55" ry="14" class="muted" opacity="0.5" />
      <g class="muted" opacity="0.5">
        <ellipse cx="80" cy="128" rx="5" ry="3.5" />
        <ellipse cx="100" cy="125" rx="5" ry="3.5" />
        <ellipse cx="120" cy="128" rx="5" ry="3.5" />
      </g>
      <!-- filling blob (animated drop) -->
      <g class="anim-s5-filling accent">
        <path d="M82 115 q0 -14 18 -14 q18 0 18 14 q0 10 -10 14 q-8 2 -16 0 q-10 -4 -10 -14 z" />
        <path d="M90 110 q5 -3 10 0" opacity="0.6" />
      </g>
    </svg>`,

  // 6. Top with more rice
  6: `
    <svg class="step-svg" ${COMMON_ATTRS}>
      <!-- base rice + filling -->
      <ellipse cx="100" cy="135" rx="60" ry="16" class="muted" opacity="0.4" />
      <ellipse cx="100" cy="125" rx="18" ry="11" class="muted" opacity="0.5" />
      <!-- rice falling from top -->
      <g class="anim-s6-rice-top">
        <ellipse cx="86" cy="105" rx="6" ry="4" />
        <ellipse cx="100" cy="98" rx="6" ry="4" />
        <ellipse cx="114" cy="105" rx="6" ry="4" />
        <ellipse cx="93" cy="112" rx="6" ry="4" />
        <ellipse cx="107" cy="112" rx="6" ry="4" />
      </g>
    </svg>`,

  // 7. Wrap and shape into triangle
  7: `
    <svg class="step-svg" ${COMMON_ATTRS}>
      <!-- top-down plastic wrap base -->
      <rect x="22" y="60" width="156" height="108" rx="7"
            class="anim-s7-wrap-base muted" opacity="0.3" />

      <!-- gray rice ball and loose rice from top-down view -->
      <g class="anim-s7-rice-ball muted" opacity="0.65">
        <ellipse cx="100" cy="120" rx="22" ry="18" stroke-width="2.5" />
        <ellipse cx="72" cy="98" rx="5" ry="3.5" />
        <ellipse cx="85" cy="89" rx="5" ry="3.5" />
        <ellipse cx="131" cy="104" rx="5" ry="3.5" />
        <ellipse cx="61" cy="129" rx="5" ry="3.5" />
        <ellipse cx="137" cy="136" rx="5" ry="3.5" />
        <ellipse cx="82" cy="153" rx="5" ry="3.5" />
        <ellipse cx="116" cy="160" rx="5" ry="3.5" />
      </g>


      <!-- final rounded triangle onigiri shape; keep the existing triangle animation style -->
      <path d="M100 72 Q104 72 108 78 L150 142 Q154 150 144 150 L56 150 Q46 150 50 142 L92 78 Q96 72 100 72 Z"
            class="anim-s7-triangle accent" stroke-width="3" />
    </svg>`,

  // 8. Remove plastic wrap
  8: `
    <svg class="step-svg" ${COMMON_ATTRS}>
      <!-- finished triangle -->
      <path d="M100 72 Q104 72 108 78 L150 142 Q154 150 144 150 L56 150 Q46 150 50 142 L92 78 Q96 72 100 72 Z" stroke-width="2.5" />
      <!-- plastic wrap peeling off (animated slide) -->
      <g class="anim-s8-wrap-peel muted">
        <path d="M100 72 Q104 72 108 78 L150 142 Q154 150 144 150 L56 150 Q46 150 50 142 L92 78 Q96 72 100 72 Z" fill="currentColor" fill-opacity="0.06" stroke-dasharray="4 3" />
      </g>
    </svg>`,

  // 9. Wrap with seaweed
  9: `
    <svg class="step-svg" ${COMMON_ATTRS}>
      <!-- triangle on top -->
      <path d="M100 62 Q104 62 108 68 L150 132 Q154 140 144 140 L56 140 Q46 140 50 132 L92 68 Q96 62 100 62 Z" stroke-width="2.5" />
      <!-- seaweed rising from bottom (animated) -->
      <g class="anim-s9-nori">
        <rect x="65" y="120" width="70" height="36" rx="2"
              fill="currentColor" fill-opacity="0.18" stroke="currentColor" stroke-width="2" />
        <path d="M72 130 h56 M72 140 h56 M72 150 h56" opacity="0.5" />
      </g>
    </svg>`,

  // 10. Done - check + onigiri
  10: `
    <svg class="step-svg" ${COMMON_ATTRS}>
      <!-- onigiri -->
      <g class="anim-s10-onigiri">
        <path d="M100 92 Q104 92 108 98 L140 142 Q146 150 136 150 L64 150 Q54 150 60 142 L92 98 Q96 92 100 92 Z" stroke-width="2.5" />
        <rect x="75" y="138" width="50" height="14" fill="currentColor" fill-opacity="0.85" stroke="none" />
        <circle cx="92" cy="115" r="1.8" fill="currentColor" />
        <circle cx="108" cy="110" r="1.8" fill="currentColor" />
        <circle cx="100" cy="125" r="1.8" fill="currentColor" />
      </g>
      <!-- check -->
      <g class="accent">
        <circle cx="150" cy="60" r="20" stroke-width="2" />
        <path d="M141 60 l7 7 l11 -14" class="anim-s10-check" stroke-width="3" />
      </g>
    </svg>`,
};

// --- Icons used in the tutorial intro grid ---------------------------------

export const gestureIconSvgs = {
  thumbsup:
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 13h4l2.5-6.5a2.5 2.5 0 0 1 4.5 1.5V12h6a3 3 0 0 1 3 3c0 1.5-1 4-2 7s-4 5-7 5h-7V13z"/><rect x="3" y="13" width="4" height="12" rx="1"/></svg>',
  
  "swipe-right":
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 24v-8a2 2 0 0 1 4 0v2v-6a2 2 0 0 1 4 0v6v-8a2 2 0 0 1 4 0v8v-6a2 2 0 0 1 4 0v6v-1a2 2 0 0 1 4 0v5a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6z"/><path d="M2 14h6M5 11l3 3-3 3"/></svg>',

  "swipe-left":
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 24v-8a2 2 0 0 0-4 0v2v-6a2 2 0 0 0-4 0v6v-8a2 2 0 0 0-4 0v8v-6a2 2 0 0 0-4 0v6v-1a2 2 0 0 0-4 0v5a6 6 0 0 0 6 6h8a6 6 0 0 0 6-6z"/><path d="M30 14h-6M27 11l-3 3 3 3"/></svg>',
  
  openpalm:
    '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22v-10a2 2 0 0 1 4 0v2v-6a2 2 0 0 1 4 0v6v-8a2 2 0 0 1 4 0v8v-6a2 2 0 0 1 4 0v6v-2a2 2 0 0 1 4 0v10a4 4 0 0 1-4 4h-12a4 4 0 0 1-4-4z"/></svg>',
};
