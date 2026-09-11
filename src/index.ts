export { useViewportSegments, useDevicePosture, useIsFoldable } from './hooks';
export { FoldGrid, HingeSafeArea, type FoldGridProps, type HingeSafeAreaProps } from './components';

export {
  isSegmentsSupported,
  getViewportSegments,
  isHorizontalLayout,
  getHingeWidth,
} from './utils/segments';
export { isDevicePostureSupported, getDevicePosture } from './utils/posture';
export type { DevicePostureType } from './types/posture';
