"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, TransformControls, useHelper } from "@react-three/drei";
import * as THREE from "three";
import {
  SceneObject,
  DirectionalLightConfig,
  PointLightConfig,
  SpotLightConfig,
  AmbientLightConfig,
  CameraConfig,
  StageConfig,
  TimelineState,
} from "./types";
import { createProceduralTexture } from "./proceduralTextures";
import { getInterpolatedTransform } from "./animationUtils";

interface ThreeDSceneProps {
  sceneObjects: SceneObject[];
  selectedObjectId: string | null;
  onSelectObject: (id: string) => void;
  onUpdateObject: (id: string, updated: Partial<SceneObject>) => void;
  directionalLight: DirectionalLightConfig;
  pointLight: PointLightConfig;
  spotLight: SpotLightConfig;
  ambientLight: AmbientLightConfig;
  cameraConfig: CameraConfig;
  stage: StageConfig;
  timeline: TimelineState;
  snapshotRef?: React.MutableRefObject<(() => string | null) | null>;
  sceneRef?: React.MutableRefObject<THREE.Scene | null>;
}

// Directional Sunlight component with Helper
function DirectionalLightComponent({ config }: { config: DirectionalLightConfig }) {
  const lightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(
    config.enabled && config.showHelper ? (lightRef as React.RefObject<THREE.Object3D>) : null,
    THREE.DirectionalLightHelper,
    1,
    "#eab308"
  );

  if (!config.enabled) return null;

  return (
    <directionalLight
      ref={lightRef}
      position={config.position}
      intensity={config.intensity}
      color={config.color}
      castShadow={config.castShadow}
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-camera-near={0.5}
      shadow-camera-far={30}
    />
  );
}

// Point Light component with Helper
function PointLightComponent({ config }: { config: PointLightConfig }) {
  const lightRef = useRef<THREE.PointLight>(null!);
  useHelper(
    config.enabled && config.showHelper ? (lightRef as React.RefObject<THREE.Object3D>) : null,
    THREE.PointLightHelper,
    0.5,
    "#06b6d4"
  );

  if (!config.enabled) return null;

  return (
    <pointLight
      ref={lightRef}
      position={config.position}
      intensity={config.intensity * 10}
      color={config.color}
      distance={config.distance}
    />
  );
}

// Camera Rig controller to handle camera presets and FOV updates dynamically
function CameraController({ cameraConfig }: { cameraConfig: CameraConfig }) {
  const { camera } = useThree();

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = cameraConfig.fov;
      camera.updateProjectionMatrix();
    }
  }, [cameraConfig.fov, camera]);

  useEffect(() => {
    let targetPos: [number, number, number] | null = null;
    switch (cameraConfig.preset) {
      case "front":
        targetPos = [0, 1.5, 6];
        break;
      case "top":
        targetPos = [0, 7, 0.01];
        break;
      case "side":
        targetPos = [6, 1.5, 0];
        break;
      case "isometric":
        targetPos = [4.5, 4.5, 4.5];
        break;
      case "cinematic":
        targetPos = [-3.5, 2.5, 4];
        break;
      default:
        targetPos = cameraConfig.position;
        break;
    }

    if (targetPos) {
      camera.position.set(...targetPos);
      camera.lookAt(0, 1, 0);
    }
  }, [cameraConfig.preset, cameraConfig.position, camera]);

  return null;
}

// Scene Export Provider Hook
function SceneExportProvider({
  snapshotRef,
  sceneRef,
}: {
  snapshotRef?: React.MutableRefObject<(() => string | null) | null>;
  sceneRef?: React.MutableRefObject<THREE.Scene | null>;
}) {
  const { gl, scene, camera } = useThree();

  useEffect(() => {
    if (sceneRef) {
      sceneRef.current = scene;
    }
    if (snapshotRef) {
      snapshotRef.current = () => {
        gl.render(scene, camera);
        return gl.domElement.toDataURL("image/png");
      };
    }
  }, [gl, scene, camera, snapshotRef, sceneRef]);

  return null;
}

// Individual Scene Mesh Component with UE5 Shading Mode support
function SingleMesh({
  obj,
  isSelected,
  gizmoMode,
  shadingMode,
  timeline,
  onSelectObject,
  onUpdateObject,
}: {
  obj: SceneObject;
  isSelected: boolean;
  gizmoMode: StageConfig["gizmoMode"];
  shadingMode: StageConfig["shadingMode"];
  timeline: TimelineState;
  onSelectObject: (id: string) => void;
  onUpdateObject: (id: string, updated: Partial<SceneObject>) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Interpolate keyframe transform when timeline is running or scrubbed
  const currentTransform = useMemo(() => {
    return getInterpolatedTransform(
      obj.keyframes,
      timeline.currentTime,
      obj.position,
      obj.rotation,
      obj.scale
    );
  }, [obj.keyframes, timeline.currentTime, obj.position, obj.rotation, obj.scale]);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.position.set(...currentTransform.position);
    meshRef.current.rotation.set(
      (currentTransform.rotation[0] * Math.PI) / 180,
      (currentTransform.rotation[1] * Math.PI) / 180,
      (currentTransform.rotation[2] * Math.PI) / 180
    );
    meshRef.current.scale.set(...currentTransform.scale);
  });

  const texture = useMemo(() => {
    return createProceduralTexture(
      obj.texturePreset,
      obj.texturePrimaryColor,
      obj.color
    );
  }, [obj.texturePreset, obj.texturePrimaryColor, obj.color]);

  if (obj.visible === false) return null;

  // Material setup based on UE5 Shading Mode (lit, unlit, wireframe, normal)
  const renderMaterial = () => {
    const isWireframe = shadingMode === "wireframe" || obj.wireframe;
    const matProps = {
      color: obj.color,
      wireframe: isWireframe,
      opacity: obj.opacity,
      transparent: obj.transparent || obj.opacity < 1,
      map: texture || undefined,
      emissive: obj.emissiveColor || "#000000",
      emissiveIntensity: obj.emissiveIntensity || 0,
    };

    if (shadingMode === "unlit") {
      return <meshBasicMaterial {...matProps} />;
    }
    if (shadingMode === "normal") {
      return <meshNormalMaterial wireframe={isWireframe} opacity={obj.opacity} transparent={obj.transparent} />;
    }

    switch (obj.materialType) {
      case "physical":
        return (
          <meshPhysicalMaterial
            {...matProps}
            roughness={obj.roughness}
            metalness={obj.metalness}
            clearcoat={0.6}
            reflectivity={0.9}
          />
        );
      case "normal":
        return <meshNormalMaterial wireframe={isWireframe} opacity={obj.opacity} transparent={obj.transparent} />;
      case "basic":
        return <meshBasicMaterial {...matProps} />;
      case "phong":
        return <meshPhongMaterial {...matProps} shininess={80} />;
      case "standard":
      default:
        return (
          <meshStandardMaterial
            {...matProps}
            roughness={obj.roughness}
            metalness={obj.metalness}
          />
        );
    }
  };

  const renderGeometry = () => {
    switch (obj.type) {
      case "sphere":
        return <sphereGeometry args={[0.8, 32, 32]} />;
      case "cylinder":
        return <cylinderGeometry args={[0.7, 0.7, 1.5, 32]} />;
      case "cone":
        return <coneGeometry args={[0.8, 1.6, 32]} />;
      case "torus":
        return <torusGeometry args={[0.7, 0.25, 24, 48]} />;
      case "plane":
        return <planeGeometry args={[2, 2]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[0.9]} />;
      case "box":
      default:
        return <boxGeometry args={[1, 1, 1, 16, 16, 16]} />;
    }
  };

  const meshContent = (
    <mesh
      ref={meshRef}
      position={obj.position}
      scale={obj.scale}
      castShadow
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        onSelectObject(obj.id);
      }}
    >
      {renderGeometry()}
      {renderMaterial()}
    </mesh>
  );

  if (isSelected && gizmoMode !== "none") {
    return (
      <TransformControls
        mode={gizmoMode}
        size={0.85}
        onObjectChange={() => {
          if (!meshRef.current) return;
          const { position, rotation, scale } = meshRef.current;
          onUpdateObject(obj.id, {
            position: [
              Number(position.x.toFixed(2)),
              Number(position.y.toFixed(2)),
              Number(position.z.toFixed(2)),
            ],
            rotation: [
              Number(((rotation.x * 180) / Math.PI).toFixed(1)),
              Number(((rotation.y * 180) / Math.PI).toFixed(1)),
              Number(((rotation.z * 180) / Math.PI).toFixed(1)),
            ],
            scale: [
              Number(scale.x.toFixed(2)),
              Number(scale.y.toFixed(2)),
              Number(scale.z.toFixed(2)),
            ],
          });
        }}
      >
        {meshContent}
      </TransformControls>
    );
  }

  return meshContent;
}

export default function ThreeDScene({
  sceneObjects,
  selectedObjectId,
  onSelectObject,
  onUpdateObject,
  directionalLight,
  pointLight,
  spotLight,
  ambientLight,
  cameraConfig,
  stage,
  timeline,
  snapshotRef,
  sceneRef,
}: ThreeDSceneProps) {
  return (
    <>
      <CameraController cameraConfig={cameraConfig} />
      <SceneExportProvider snapshotRef={snapshotRef} sceneRef={sceneRef} />

      <OrbitControls
        makeDefault
        enableDamping={cameraConfig.enableDamping}
        dampingFactor={0.05}
        autoRotate={cameraConfig.autoRotate}
        autoRotateSpeed={cameraConfig.autoRotateSpeed}
        maxPolarAngle={Math.PI / 2 + 0.05}
        minDistance={1.5}
        maxDistance={35}
      />

      {/* Lights */}
      {ambientLight.enabled && stage.shadingMode !== "unlit" && (
        <ambientLight color={ambientLight.color} intensity={ambientLight.intensity} />
      )}
      {stage.shadingMode !== "unlit" && (
        <>
          <DirectionalLightComponent config={directionalLight} />
          <PointLightComponent config={pointLight} />
        </>
      )}

      {/* Render All Scene Objects */}
      {sceneObjects.map((obj) => (
        <SingleMesh
          key={obj.id}
          obj={obj}
          isSelected={selectedObjectId === obj.id}
          gizmoMode={stage.gizmoMode}
          shadingMode={stage.shadingMode}
          timeline={timeline}
          onSelectObject={onSelectObject}
          onUpdateObject={onUpdateObject}
        />
      ))}

      {/* Floor Plane */}
      {stage.showFloor && (
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0, 0]}
          receiveShadow={stage.shadowsEnabled}
        >
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial
            color={stage.floorColor}
            roughness={1 - stage.floorReflectivity}
            metalness={stage.floorReflectivity}
          />
        </mesh>
      )}

      {/* Grid & Axes Helpers */}
      {stage.showGrid && (
        <gridHelper
          args={[stage.gridSize, stage.gridSize * 2, stage.gridColor, stage.gridColor]}
          position={[0, 0.001, 0]}
        />
      )}

      {stage.showAxes && <primitive object={new THREE.AxesHelper(3)} position={[0, 0.002, 0]} />}
    </>
  );
}
