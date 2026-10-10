import { Keyframe } from "./types";

/**
 * Linearly interpolates keyframe position, rotation, and scale
 * for smooth 3D timeline playback.
 */
export function getInterpolatedTransform(
  keyframes: Keyframe[],
  currentTime: number,
  fallbackPos: [number, number, number],
  fallbackRot: [number, number, number],
  fallbackScale: [number, number, number]
): {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
} {
  if (!keyframes || keyframes.length === 0) {
    return { position: fallbackPos, rotation: fallbackRot, scale: fallbackScale };
  }

  const sorted = [...keyframes].sort((a, b) => a.time - b.time);

  if (currentTime <= sorted[0].time) {
    return {
      position: sorted[0].position,
      rotation: sorted[0].rotation,
      scale: sorted[0].scale,
    };
  }

  if (currentTime >= sorted[sorted.length - 1].time) {
    const last = sorted[sorted.length - 1];
    return {
      position: last.position,
      rotation: last.rotation,
      scale: last.scale,
    };
  }

  for (let i = 0; i < sorted.length - 1; i++) {
    const kfA = sorted[i];
    const kfB = sorted[i + 1];
    if (currentTime >= kfA.time && currentTime <= kfB.time) {
      const alpha = (currentTime - kfA.time) / (kfB.time - kfA.time || 1);

      const pos: [number, number, number] = [
        kfA.position[0] + (kfB.position[0] - kfA.position[0]) * alpha,
        kfA.position[1] + (kfB.position[1] - kfA.position[1]) * alpha,
        kfA.position[2] + (kfB.position[2] - kfA.position[2]) * alpha,
      ];

      const rot: [number, number, number] = [
        kfA.rotation[0] + (kfB.rotation[0] - kfA.rotation[0]) * alpha,
        kfA.rotation[1] + (kfB.rotation[1] - kfA.rotation[1]) * alpha,
        kfA.rotation[2] + (kfB.rotation[2] - kfA.rotation[2]) * alpha,
      ];

      const scale: [number, number, number] = [
        kfA.scale[0] + (kfB.scale[0] - kfA.scale[0]) * alpha,
        kfA.scale[1] + (kfB.scale[1] - kfA.scale[1]) * alpha,
        kfA.scale[2] + (kfB.scale[2] - kfA.scale[2]) * alpha,
      ];

      return { position: pos, rotation: rot, scale };
    }
  }

  return { position: fallbackPos, rotation: fallbackRot, scale: fallbackScale };
}
