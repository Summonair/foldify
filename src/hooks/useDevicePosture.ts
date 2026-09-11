import { useCallback, useEffect, useState } from 'react';
import type { DevicePostureType } from '../types/posture';
import { getDevicePosture, subscribeToDevicePosture } from '../utils/posture';

/**
 * Returns the device's current posture: `'continuous'` (flat, e.g. on a
 * table) or `'folded'` (bent, e.g. like a laptop).
 *
 * Falls back to `'continuous'` when the Device Posture API is unavailable,
 * and listens for the `change` event to stay in sync.
 */
export function useDevicePosture(): DevicePostureType {
  const [posture, setPosture] = useState<DevicePostureType>(() => getDevicePosture());

  const updatePosture = useCallback(() => {
    setPosture(getDevicePosture());
  }, []);

  useEffect(() => {
    updatePosture();
    return subscribeToDevicePosture(updatePosture);
  }, [updatePosture]);

  return posture;
}
