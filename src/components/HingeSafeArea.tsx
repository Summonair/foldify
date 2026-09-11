import type { CSSProperties, ReactNode } from 'react';
import { useViewportSegments } from '../hooks/useViewportSegments';
import { getHingeWidth, isHorizontalLayout } from '../utils/segments';

export interface HingeSafeAreaProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

/**
 * Pads its content by the physical hinge width so it is never obscured by
 * a device's hinge or seam.
 *
 * Prefers the CSS `env(viewport-segment-width)` environment variable
 * (populated by the browser when the Viewport Segments API is supported),
 * falling back to a width computed from the segments' `DOMRect`s. On a
 * standard single-screen device the hinge width is `0`, so this renders
 * as a plain, unpadded wrapper.
 */
export function HingeSafeArea({ children, className, style }: HingeSafeAreaProps) {
  const segments = useViewportSegments();
  const hasHinge = segments.length > 1;
  const hingeWidth = getHingeWidth(segments);
  const horizontal = isHorizontalLayout(segments);
  const padding = `env(viewport-segment-width 0 0, ${hingeWidth}px)`;

  const hingeStyle: CSSProperties = hasHinge
    ? horizontal
      ? { paddingLeft: padding, paddingRight: padding }
      : { paddingTop: padding, paddingBottom: padding }
    : {};

  return (
    <div className={className} style={{ ...hingeStyle, ...style }}>
      {children}
    </div>
  );
}
