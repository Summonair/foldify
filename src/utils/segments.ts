function createRect(x: number, y: number, width: number, height: number): DOMRect {
  if (typeof DOMRectReadOnly !== 'undefined') {
    return DOMRectReadOnly.fromRect({ x, y, width, height }) as DOMRect;
  }

  return {
    x,
    y,
    width,
    height,
    top: y,
    left: x,
    right: x + width,
    bottom: y + height,
    toJSON() {
      return { x, y, width, height, top: y, left: x, right: x + width, bottom: y + height };
    },
  } as DOMRect;
}

function getFallbackSegment(): DOMRect {
  if (typeof window === 'undefined') {
    return createRect(0, 0, 0, 0);
  }
  return createRect(0, 0, window.innerWidth, window.innerHeight);
}

/**
 * Whether the browser exposes the Viewport Segments API.
 */
export function isSegmentsSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    !!window.visualViewport &&
    Array.isArray(window.visualViewport.segments)
  );
}

/**
 * Returns the current viewport segments. Falls back to a single segment
 * spanning the whole viewport when the Viewport Segments API is unavailable
 * or reports a single-screen layout.
 */
export function getViewportSegments(): DOMRect[] {
  if (!isSegmentsSupported()) {
    return [getFallbackSegment()];
  }

  const segments = window.visualViewport?.segments;
  if (!segments || segments.length === 0) {
    return [getFallbackSegment()];
  }

  return segments;
}

/**
 * Whether the two given segments are arranged side-by-side (row) rather
 * than stacked (column), inferred from how far apart their origins are
 * on each axis.
 */
export function isHorizontalLayout(segments: DOMRect[]): boolean {
  if (segments.length < 2) return true;
  const [first, second] = segments;
  const dx = Math.abs(second.left - first.left);
  const dy = Math.abs(second.top - first.top);
  return dx >= dy;
}

/**
 * The physical gap (hinge width) between the first two segments, in CSS
 * pixels. Returns 0 when there is only a single segment.
 */
export function getHingeWidth(segments: DOMRect[]): number {
  if (segments.length < 2) return 0;
  const [first, second] = segments;
  return isHorizontalLayout(segments)
    ? Math.max(0, second.left - first.right)
    : Math.max(0, second.top - first.bottom);
}
