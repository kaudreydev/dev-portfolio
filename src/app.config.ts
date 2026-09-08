/* Tailwind v3 default breakpoints (in pixels) */
export const defaultBreakpoints = {
  sm: 640, // 40rem
  md: 768, // 48rem
  lg: 1024, // 64rem
  xl: 1280, // 80rem
  "2xl": 1536, // 96rem
};

/* Override default breakpoints to format Skill Cards appropriately */
export const appBreakpoints = Object.assign({}, defaultBreakpoints, {
  // Add breakpoint modifications here
  md: 920, // 57.5rem
  lg: 1104, // 69rem
  xl: 1440, // 90rem
});
