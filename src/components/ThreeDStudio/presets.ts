import { SceneObject, DirectionalLightConfig, PointLightConfig, SpotLightConfig, AmbientLightConfig, CameraConfig, StageConfig } from "./types";

export const INITIAL_BOX_OBJECT: SceneObject = {
  id: "actor-1",
  name: "BP_MainCube_Mesh",
  type: "box",
  position: [0, 1.2, 0],
  rotation: [0, 0, 0],
  scale: [1.6, 1.6, 1.6],
  color: "#3b82f6",
  materialType: "physical",
  roughness: 0.15,
  metalness: 0.85,
  emissiveColor: "#000000",
  emissiveIntensity: 0,
  wireframe: false,
  opacity: 1,
  transparent: false,
  texturePreset: "none",
  texturePrimaryColor: "#ffffff",
  visible: true,
  locked: false,
  keyframes: [
    {
      id: "kf-1",
      time: 0,
      position: [0, 1.2, 0],
      rotation: [0, 0, 0],
      scale: [1.6, 1.6, 1.6],
    },
    {
      id: "kf-2",
      time: 2.5,
      position: [0, 2.2, 0],
      rotation: [0, 180, 0],
      scale: [1.9, 1.9, 1.9],
    },
    {
      id: "kf-3",
      time: 5.0,
      position: [0, 1.2, 0],
      rotation: [0, 360, 0],
      scale: [1.6, 1.6, 1.6],
    },
  ],
};

export const INITIAL_SPHERE_OBJECT: SceneObject = {
  id: "actor-2",
  name: "BP_GlowSphere_Actor",
  type: "sphere",
  position: [2.5, 1.2, 0],
  rotation: [0, 0, 0],
  scale: [1.1, 1.1, 1.1],
  color: "#06b6d4",
  materialType: "standard",
  roughness: 0.1,
  metalness: 0.9,
  emissiveColor: "#06b6d4",
  emissiveIntensity: 0.6,
  wireframe: false,
  opacity: 1,
  transparent: false,
  texturePreset: "none",
  texturePrimaryColor: "#ffffff",
  visible: true,
  locked: false,
  keyframes: [],
};

export const DEFAULT_DIR_LIGHT: DirectionalLightConfig = {
  enabled: true,
  color: "#ffffff",
  intensity: 3.0,
  position: [6, 9, 6],
  castShadow: true,
  showHelper: true,
  shadowSoftness: 0.8,
};

export const DEFAULT_POINT_LIGHT: PointLightConfig = {
  enabled: true,
  color: "#06b6d4",
  intensity: 4,
  position: [-4, 3, -2],
  distance: 12,
  showHelper: false,
};

export const DEFAULT_SPOT_LIGHT: SpotLightConfig = {
  enabled: false,
  color: "#a855f7",
  intensity: 5,
  position: [0, 7, 4],
  angle: 0.6,
  penumbra: 0.5,
  showHelper: false,
};

export const DEFAULT_AMBIENT_LIGHT: AmbientLightConfig = {
  enabled: true,
  color: "#ffffff",
  intensity: 0.5,
};

export const DEFAULT_CAMERA: CameraConfig = {
  fov: 45,
  focalLength: 50,
  preset: "custom",
  position: [5, 4, 7],
  autoRotate: false,
  autoRotateSpeed: 1,
  enableDamping: true,
};

export const DEFAULT_STAGE: StageConfig = {
  bgColor: "#080a0f",
  shadingMode: "lit",
  showGrid: true,
  gridSnap: false,
  gridSnapSize: 0.5,
  gridSize: 14,
  gridColor: "#1e293b",
  showAxes: true,
  showFloor: true,
  floorColor: "#0f172a",
  floorReflectivity: 0.35,
  shadowsEnabled: true,
  gizmoMode: "translate",
  fogEnabled: false,
  fogColor: "#080a0f",
  fogDensity: 0.03,
};
