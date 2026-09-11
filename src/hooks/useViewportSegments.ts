import { useCallback, useEffect, useState } from 'react';
import { getViewportSegments } from '../utils/segments';

/**
 * Returns the current viewport segments as an array of `DOMRect` objects.
 *
 * On a standard, single-screen device this resolves to a single segment
 * spanning the whole viewport. On a foldable or dual-screen device it
 * resolves to one `DOMRect` per screen. Stays in sync with `resize` and
 * `orientationchange` events.
 */
export function useViewportSegments(): DOMRect[] {
  const [segments, setSegments] = useState<DOMRect[]>(() => getViewportSegments());

  const updateSegments = useCallback(() => {
    setSegments(getViewportSegments());
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    updateSegments();

    const viewport = window.visualViewport;
    window.addEventListener('resize', updateSegments);
    window.addEventListener('orientationchange', updateSegments);
    viewport?.addEventListener('resize', updateSegments);

    return () => {
      window.removeEventListener('resize', updateSegments);
      window.removeEventListener('orientationchange', updateSegments);
      viewport?.removeEventListener('resize', updateSegments);
    };
  }, [updateSegments]);

  return segments;
}
