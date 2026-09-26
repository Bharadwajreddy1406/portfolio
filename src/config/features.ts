const enabledValues = new Set(['1', 'true', 'yes', 'on'])

/**
 * Set NEXT_PUBLIC_ENABLE_PRELOADER=true to show the opening hexagon animation.
 * It is disabled by default so visitors reach the hero immediately.
 */
export const ENABLE_PRELOADER = enabledValues.has(
  (process.env.NEXT_PUBLIC_ENABLE_PRELOADER ?? '').trim().toLowerCase()
)
