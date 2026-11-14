import { useEffect, useRef, useState } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  root?: Element | Document | null;
}

/**
 * Custom hook for Intersection Observer based element visibility.
 * Gracefully handles SSR, unsupported environments, and reduced-motion preferences.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>({
  threshold = 0.08,
  rootMargin = '0px 0px -60px 0px',
  triggerOnce = true,
  root = null,
}: UseIntersectionObserverOptions = {}) {
  const elementRef = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [hasIntersected, setHasIntersected] = useState<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;

    // Graceful fallback for non-browser or test environments
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    // Honor user accessibility preference for reduced motion
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      setIsIntersecting(true);
      setHasIntersected(true);
      return;
    }

    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        const intersecting = entry.isIntersecting;
        setIsIntersecting(intersecting);

        if (intersecting) {
          setHasIntersected(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        }
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, root]);

  return {
    ref: elementRef,
    isIntersecting,
    hasIntersected: triggerOnce ? hasIntersected : isIntersecting,
    isVisible: triggerOnce ? hasIntersected : isIntersecting,
  };
}
