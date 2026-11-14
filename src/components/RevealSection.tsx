import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { getRevealStyles, RevealStyleOptions } from '../utils/revealUtils';

export interface RevealSectionProps extends RevealStyleOptions {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  id?: string;
}

/**
 * RevealSection
 * Wraps section content with a high-performance IntersectionObserver animation.
 * Smoothly fades in and scales slightly as the user scrolls down.
 */
export const RevealSection: React.FC<RevealSectionProps> = ({
  children,
  className = '',
  delayMs = 0,
  scaleFrom = 0.97,
  translateYPx = 24,
  durationMs = 900,
  threshold = 0.08,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
  id,
}) => {
  const { ref, isVisible } = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const styles = getRevealStyles(isVisible, {
    scaleFrom,
    translateYPx,
    delayMs,
    durationMs,
  });

  return (
    <div
      id={id}
      ref={ref}
      style={styles}
      className={`transition-all will-change-transform will-change-opacity ${className}`}
    >
      {children}
    </div>
  );
};
