/**
 * Pure utility functions for IntersectionObserver reveal animations.
 * Provides deterministic styling calculations for scroll-based section transitions.
 */

export interface RevealStyleOptions {
  scaleFrom?: number;
  translateYPx?: number;
  delayMs?: number;
  durationMs?: number;
}

export interface RevealComputedStyles {
  opacity: number;
  transform: string;
  transitionDuration: string;
  transitionDelay: string;
  transitionTimingFunction: string;
}

/**
 * Calculates CSS style properties for the reveal transition.
 * When isVisible is false: scaled slightly down (e.g. 0.97) and offset downward (e.g. 24px) with 0 opacity.
 * When isVisible is true: scaled to 1.0, translated to 0px with full opacity.
 */
export function getRevealStyles(
  isVisible: boolean,
  options: RevealStyleOptions = {}
): RevealComputedStyles {
  const {
    scaleFrom = 0.97,
    translateYPx = 24,
    delayMs = 0,
    durationMs = 900,
  } = options;

  // Clamp scaleFrom between 0.8 and 1.0 for safety
  const safeScale = Math.min(1.0, Math.max(0.8, scaleFrom));
  // Clamp translateYPx between 0 and 100
  const safeTranslateY = Math.min(100, Math.max(0, translateYPx));

  return {
    opacity: isVisible ? 1 : 0,
    transform: isVisible
      ? 'translateY(0px) scale(1)'
      : `translateY(${safeTranslateY}px) scale(${safeScale})`,
    transitionDuration: `${Math.max(100, durationMs)}ms`,
    transitionDelay: `${Math.max(0, delayMs)}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  };
}

/**
 * Validates threshold options for IntersectionObserver.
 */
export function validateObserverThreshold(threshold: number | number[]): number | number[] {
  if (Array.isArray(threshold)) {
    return threshold.map((t) => Math.min(1, Math.max(0, t)));
  }
  return Math.min(1, Math.max(0, threshold));
}
