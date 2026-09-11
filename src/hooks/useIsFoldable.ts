import { useViewportSegments } from './useViewportSegments';

/**
 * Returns `true` when the current device reports more than one viewport
 * segment (i.e. it is a foldable or dual-screen device that is currently
 * spanning the hinge).
 */
export function useIsFoldable(): boolean {
  const segments = useViewportSegments();
  return segments.length > 1;
}
