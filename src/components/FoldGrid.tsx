import { Children, type CSSProperties, type ReactNode } from 'react';
import { useViewportSegments } from '../hooks/useViewportSegments';
import { isHorizontalLayout } from '../utils/segments';

export interface FoldGridProps {
  /** Expects two children: one per screen segment. */
  children: ReactNode;
  /** Layout direction to fall back to on single-screen devices. */
  fallbackDirection?: 'row' | 'column';
  className?: string;
  style?: CSSProperties;
}

/**
 * Distributes its children across the device's screen segments.
 *
 * On a foldable or dual-screen device, `children[0]` is placed on the
 * first screen and `children[1]` on the second, with a gap sized to the
 * physical hinge between them. On a standard single-screen device, it
 * falls back to stacking children with a plain flex layout in the
 * direction given by `fallbackDirection`.
 */
export function FoldGrid({ children, fallbackDirection = 'row', className, style }: FoldGridProps) {
  const segments = useViewportSegments();
  const childArray = Children.toArray(children);
  const isFoldable = segments.length > 1 && childArray.length >= 2;

  if (!isFoldable) {
    const fallbackStyle: CSSProperties = {
      display: 'flex',
      flexDirection: fallbackDirection,
      width: '100%',
      height: '100%',
      ...style,
    };

    return (
      <div className={className} style={fallbackStyle}>
        {childArray}
      </div>
    );
  }

  const [first, second] = segments;
  const horizontal = isHorizontalLayout(segments);
  const gap = horizontal
    ? Math.max(0, second.left - first.right)
    : Math.max(0, second.top - first.bottom);

  const gridStyle: CSSProperties = {
    display: 'grid',
    width: '100%',
    height: '100%',
    gridTemplateColumns: horizontal ? `${first.width}px ${second.width}px` : '1fr',
    gridTemplateRows: horizontal ? '1fr' : `${first.height}px ${second.height}px`,
    columnGap: horizontal ? gap : 0,
    rowGap: horizontal ? 0 : gap,
    ...style,
  };

  return (
    <div className={className} style={gridStyle}>
      <div style={{ minWidth: 0, minHeight: 0, overflow: 'auto' }}>{childArray[0]}</div>
      <div style={{ minWidth: 0, minHeight: 0, overflow: 'auto' }}>{childArray[1]}</div>
    </div>
  );
}
