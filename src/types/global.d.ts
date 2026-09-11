import type { DevicePostureType } from './posture';

declare global {
  interface DevicePosture extends EventTarget {
    readonly type: DevicePostureType;
    onchange: ((this: DevicePosture, ev: Event) => unknown) | null;
  }

  interface Navigator {
    readonly devicePosture?: DevicePosture;
  }

  interface VisualViewport {
    /**
     * Screen segments, per the Viewport Segments API draft spec.
     * https://github.com/w3c/csswg-drafts/blob/main/css-viewport-1/EXPLAINER.md
     */
    readonly segments?: DOMRect[];
  }
}
