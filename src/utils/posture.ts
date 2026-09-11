import type { DevicePostureType } from '../types/posture';

/**
 * Whether the browser exposes the Device Posture API.
 */
export function isDevicePostureSupported(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.devicePosture;
}

/**
 * Returns the current device posture. Falls back to `'continuous'`
 * (a standard, flat, single-screen device) when the Device Posture API
 * is unavailable.
 */
export function getDevicePosture(): DevicePostureType {
  if (!isDevicePostureSupported()) {
    return 'continuous';
  }
  return navigator.devicePosture?.type ?? 'continuous';
}

/**
 * Subscribes to device posture changes. Returns an unsubscribe function.
 * No-ops safely when the Device Posture API is unavailable.
 */
export function subscribeToDevicePosture(callback: () => void): () => void {
  if (!isDevicePostureSupported()) {
    return () => {};
  }

  const posture = navigator.devicePosture as DevicePosture;
  posture.addEventListener('change', callback);
  return () => posture.removeEventListener('change', callback);
}
