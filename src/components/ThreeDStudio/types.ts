export type GeometryType =
  | "box"
  | "sphere"
  | "cylinder"
  | "cone"
  | "torus"
  | "plane"
  | "dodecahedron"
  | "gltf";

export type MaterialType =
  | "standard"
  | "physical"
  | "normal"
  | "basic"
  | "phong";

export type TexturePreset = "none" | "checker" | "grid" | "dots" | "noise" | "stripes";

export type GizmoMode = "translate" | "rotate" | "scale" | "none";

export type ShadingMode = "lit" | "unlit" | "wireframe" | "normal" | "detail";

export type CameraPreset = "custom" | "front" | "top" | "side" | "isometric" | "cinematic";

export interface Keyframe {
  id: string;
  time: number; // in seconds (0.0 to 10.0)
  position: [number, number, number];
  rotation: [number, number, number];
  scale: [number, number, number];
}

export interface SceneObject {
  id: string;
  name: string;
  type: GeometryType;
  position: [number, number, number];
  rotation: [number, number, number]; // in degrees
  scale: [number, number, number];
  color: string;
  materialType: MaterialType;
  roughness: number;
  metalness: number;
  emissiveColor: string;
  emissiveIntensity: number;
  wireframe: boolean;
  opacity: number;
  transparent: boolean;
  texturePreset: TexturePreset;
  texturePrimaryColor: string;
  keyframes: Keyframe[];
  visible: boolean;
  locked: boolean;
  gltfDataUrl?: string;
}

export interface DirectionalLightConfig {
  enabled: boolean;
  color: string;
  intensity: number;
  position: [number, number, number];
  castShadow: boolean;
  showHelper: boolean;
  shadowSoftness: number;
}

export interface PointLightConfig {
  enabled: boolean;
  color: string;
  intensity: number;
  position: [number, number, number];
  distance: number;
  showHelper: boolean;
}

export interface SpotLightConfig {
  enabled: boolean;
  color: string;
  intensity: number;
  position: [number, number, number];
  angle: number;
  penumbra: number;
  showHelper: boolean;
}

export interface AmbientLightConfig {
  enabled: boolean;
  color: string;
  intensity: number;
}

export interface CameraConfig {
  fov: number;
  focalLength: number; // in mm
  preset: CameraPreset;
  position: [number, number, number];
  autoRotate: boolean;
  autoRotateSpeed: number;
  enableDamping: boolean;
}

export interface StageConfig {
  bgColor: string;
  shadingMode: ShadingMode;
  showGrid: boolean;
  gridSnap: boolean;
  gridSnapSize: number;
  gridSize: number;
  gridColor: string;
  showAxes: boolean;
  showFloor: boolean;
  floorColor: string;
  floorReflectivity: number;
  shadowsEnabled: boolean;
  gizmoMode: GizmoMode;
  fogEnabled: boolean;
  fogColor: string;
  fogDensity: number;
}

export interface TimelineState {
  isPlaying: boolean;
  currentTime: number; // 0 to maxDuration
  maxDuration: number; // default 5.0 seconds
  loop: boolean;
  fps: number; // 30 or 60
}
