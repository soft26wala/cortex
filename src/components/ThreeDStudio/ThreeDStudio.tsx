"use client";

import React, { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import ThreeDScene from "./ThreeDScene";
import UnrealHeader from "./UnrealHeader";
import UnrealToolbar from "./UnrealToolbar";
import UnrealDetailsPanel from "./UnrealDetailsPanel";
import UnrealSequencer from "./UnrealSequencer";
import CodeExporterModal from "./CodeExporterModal";
import {
  SceneObject,
  DirectionalLightConfig,
  PointLightConfig,
  SpotLightConfig,
  AmbientLightConfig,
  CameraConfig,
  StageConfig,
  TimelineState,
  GizmoMode,
  CameraPreset,
} from "./types";
import {
  INITIAL_BOX_OBJECT,
  INITIAL_SPHERE_OBJECT,
  DEFAULT_DIR_LIGHT,
  DEFAULT_POINT_LIGHT,
  DEFAULT_SPOT_LIGHT,
  DEFAULT_AMBIENT_LIGHT,
  DEFAULT_CAMERA,
  DEFAULT_STAGE,
} from "./presets";
import { exportSceneToGLB } from "./gltfExportUtils";
import { HelpCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function ThreeDStudio() {
  // Multi-object scene state
  const [sceneObjects, setSceneObjects] = useState<SceneObject[]>([
    INITIAL_BOX_OBJECT,
    INITIAL_SPHERE_OBJECT,
  ]);
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>("actor-1");

  // Lights & Camera States
  const [directionalLight, setDirectionalLight] =
    useState<DirectionalLightConfig>(DEFAULT_DIR_LIGHT);
  const [pointLight, setPointLight] = useState<PointLightConfig>(DEFAULT_POINT_LIGHT);
  const [spotLight, setSpotLight] = useState<SpotLightConfig>(DEFAULT_SPOT_LIGHT);
  const [ambientLight, setAmbientLight] = useState<AmbientLightConfig>(DEFAULT_AMBIENT_LIGHT);
  const [cameraConfig, setCameraConfig] = useState<CameraConfig>(DEFAULT_CAMERA);
  const [stage, setStage] = useState<StageConfig>(DEFAULT_STAGE);

  // Timeline Animation State
  const [timeline, setTimeline] = useState<TimelineState>({
    isPlaying: false,
    currentTime: 0,
    maxDuration: 5.0,
    loop: true,
    fps: 60,
  });

  // UI States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHotkeyHelp, setShowHotkeyHelp] = useState(false);

  // Container, Scene & Snapshot refs
  const studioContainerRef = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef<(() => string | null) | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);

  // Timeline Playback Loop
  useEffect(() => {
    let animFrameId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (timeline.isPlaying) {
        setTimeline((prev) => {
          let nextTime = prev.currentTime + delta;
          if (nextTime >= prev.maxDuration) {
            if (prev.loop) {
              nextTime = 0;
            } else {
              nextTime = prev.maxDuration;
              return { ...prev, currentTime: nextTime, isPlaying: false };
            }
          }
          return { ...prev, currentTime: nextTime };
        });
      }

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameId);
  }, [timeline.isPlaying]);

  // Keyboard Hotkeys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA", "SELECT"].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case " ":
          e.preventDefault();
          setTimeline((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
          break;
        case "w":
          setStage((prev) => ({ ...prev, gizmoMode: "translate" }));
          toast.success("Gizmo Mode: Move (Translate)", { id: "gizmo-toast" });
          break;
        case "e":
          setStage((prev) => ({ ...prev, gizmoMode: "rotate" }));
          toast.success("Gizmo Mode: Rotate", { id: "gizmo-toast" });
          break;
        case "r":
          setStage((prev) => ({ ...prev, gizmoMode: "scale" }));
          toast.success("Gizmo Mode: Scale / Resize", { id: "gizmo-toast" });
          break;
        case "q":
          setStage((prev) => ({ ...prev, gizmoMode: "none" }));
          toast("Gizmo Mode: Hidden", { id: "gizmo-toast" });
          break;
        case "h":
          setIsSidebarCollapsed((prev) => !prev);
          break;
        case "delete":
        case "backspace":
          if (selectedObjectId && sceneObjects.length > 1) {
            handleDeleteObject(selectedObjectId);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedObjectId, sceneObjects]);

  // Object Operations
  const handleAddObject = (type: SceneObject["type"]) => {
    const newId = `actor-${Date.now()}`;
    const nameMap: Record<string, string> = {
      box: "BP_Cube_Mesh",
      sphere: "BP_Sphere_Mesh",
      cylinder: "BP_Cylinder_Mesh",
      cone: "BP_Cone_Mesh",
      torus: "BP_Torus_Ring",
      plane: "BP_Plane_Mesh",
      dodecahedron: "BP_Dodecahedron",
    };

    const newObj: SceneObject = {
      id: newId,
      name: `${nameMap[type] || "BP_Actor"} #${sceneObjects.length + 1}`,
      type,
      position: [(Math.random() - 0.5) * 3, 1.2, (Math.random() - 0.5) * 3],
      rotation: [0, 0, 0],
      scale: [1, 1, 1],
      color: ["#3b82f6", "#06b6d4", "#ec4899", "#10b981", "#f59e0b", "#a855f7"][
        Math.floor(Math.random() * 6)
      ],
      materialType: "physical",
      roughness: 0.2,
      metalness: 0.8,
      emissiveColor: "#000000",
      emissiveIntensity: 0,
      wireframe: false,
      opacity: 1,
      transparent: false,
      texturePreset: "none",
      texturePrimaryColor: "#ffffff",
      visible: true,
      locked: false,
      keyframes: [],
    };

    setSceneObjects((prev) => [...prev, newObj]);
    setSelectedObjectId(newId);
    toast.success(`Spawned Actor ${newObj.name}`);
  };

  const handleDuplicateObject = (id: string) => {
    const found = sceneObjects.find((o) => o.id === id);
    if (!found) return;

    const dupId = `actor-${Date.now()}`;
    const dupObj: SceneObject = {
      ...found,
      id: dupId,
      name: `${found.name}_Copy`,
      position: [found.position[0] + 0.6, found.position[1], found.position[2] + 0.6],
    };

    setSceneObjects((prev) => [...prev, dupObj]);
    setSelectedObjectId(dupId);
    toast.success(`Duplicated Actor ${found.name}`);
  };

  const handleDeleteObject = (id: string) => {
    if (sceneObjects.length <= 1) {
      toast.error("Scene must contain at least 1 Actor");
      return;
    }

    setSceneObjects((prev) => prev.filter((o) => o.id !== id));
    if (selectedObjectId === id) {
      const remaining = sceneObjects.filter((o) => o.id !== id);
      setSelectedObjectId(remaining[0]?.id || null);
    }
    toast.success("Actor destroyed from World Outliner");
  };

  const handleUpdateSelectedObject = (updated: Partial<SceneObject>) => {
    if (!selectedObjectId) return;
    setSceneObjects((prev) =>
      prev.map((obj) => (obj.id === selectedObjectId ? { ...obj, ...updated } : obj))
    );
  };

  // Keyframe Recording Action
  const handleAddKeyframe = () => {
    const sel = sceneObjects.find((o) => o.id === selectedObjectId);
    if (!sel) return;

    const kfTime = Number(timeline.currentTime.toFixed(2));
    const newKf = {
      id: `kf-${Date.now()}`,
      time: kfTime,
      position: [...sel.position] as [number, number, number],
      rotation: [...sel.rotation] as [number, number, number],
      scale: [...sel.scale] as [number, number, number],
    };

    const updatedKeyframes = sel.keyframes.filter((k) => Math.abs(k.time - kfTime) > 0.05);
    updatedKeyframes.push(newKf);
    updatedKeyframes.sort((a, b) => a.time - b.time);

    handleUpdateSelectedObject({ keyframes: updatedKeyframes });
    toast.success(`Recorded keyframe for ${sel.name} at ${kfTime}s`);
  };

  const handleDeleteKeyframe = (keyframeId: string) => {
    const sel = sceneObjects.find((o) => o.id === selectedObjectId);
    if (!sel) return;
    handleUpdateSelectedObject({
      keyframes: sel.keyframes.filter((k) => k.id !== keyframeId),
    });
    toast.success("Keyframe removed");
  };

  // Export GLB 3D File
  const handleExportGLB = () => {
    if (sceneRef.current) {
      exportSceneToGLB(sceneRef.current, "unreal-5-scene.glb");
      toast.success("Exported 3D scene to .GLB file!");
    } else {
      toast.error("Scene unavailable for 3D export");
    }
  };

  // Save JSON Project File
  const handleExportJSON = () => {
    const projectData = {
      engine: "UnrealEngine5WebStudio",
      version: "5.4.0",
      sceneObjects,
      directionalLight,
      pointLight,
      spotLight,
      ambientLight,
      cameraConfig,
      stage,
      timeline,
    };

    const blob = new Blob([JSON.stringify(projectData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "unreal-studio-project.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Project JSON saved!");
  };

  // Import JSON Project File
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const parsed = JSON.parse(evt.target?.result as string);
        if (parsed.sceneObjects && Array.isArray(parsed.sceneObjects)) {
          setSceneObjects(parsed.sceneObjects);
          if (parsed.sceneObjects[0]) setSelectedObjectId(parsed.sceneObjects[0].id);
          if (parsed.directionalLight) setDirectionalLight(parsed.directionalLight);
          if (parsed.pointLight) setPointLight(parsed.pointLight);
          if (parsed.ambientLight) setAmbientLight(parsed.ambientLight);
          if (parsed.cameraConfig) setCameraConfig(parsed.cameraConfig);
          if (parsed.stage) setStage(parsed.stage);
          toast.success("Imported Unreal Engine Project!");
        }
      } catch (err) {
        toast.error("Invalid JSON scene file");
      }
    };
    reader.readAsText(file);
  };

  // Snapshot Capture
  const handleTakeSnapshot = () => {
    if (snapshotRef.current) {
      const dataUrl = snapshotRef.current();
      if (dataUrl) {
        const link = document.createElement("a");
        link.download = `ue5-snapshot-${Date.now()}.png`;
        link.href = dataUrl;
        link.click();
        toast.success("Snapshot PNG downloaded!");
      }
    }
  };

  // Reset Scene
  const handleResetScene = () => {
    setSceneObjects([INITIAL_BOX_OBJECT, INITIAL_SPHERE_OBJECT]);
    setSelectedObjectId("actor-1");
    setDirectionalLight(DEFAULT_DIR_LIGHT);
    setPointLight(DEFAULT_POINT_LIGHT);
    setSpotLight(DEFAULT_SPOT_LIGHT);
    setAmbientLight(DEFAULT_AMBIENT_LIGHT);
    setCameraConfig(DEFAULT_CAMERA);
    setStage(DEFAULT_STAGE);
    setTimeline({ isPlaying: false, currentTime: 0, maxDuration: 5.0, loop: true, fps: 60 });
    toast.success("Scene reset to UE5 defaults");
  };

  // Fullscreen Handler
  const toggleFullscreen = () => {
    if (!studioContainerRef.current) return;
    if (!document.fullscreenElement) {
      studioContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const selectedObj = sceneObjects.find((o) => o.id === selectedObjectId) || null;

  return (
    <div
      ref={studioContainerRef}
      className="relative w-full h-screen overflow-hidden select-none bg-[#080a0f] font-sans"
      style={{ backgroundColor: stage.bgColor }}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas
          shadows={stage.shadowsEnabled}
          gl={{ preserveDrawingBuffer: true, antialias: true }}
          camera={{
            position: cameraConfig.position,
            fov: cameraConfig.fov,
          }}
        >
          <ThreeDScene
            sceneObjects={sceneObjects}
            selectedObjectId={selectedObjectId}
            onSelectObject={setSelectedObjectId}
            onUpdateObject={(id, updated) => {
              setSceneObjects((prev) =>
                prev.map((o) => (o.id === id ? { ...o, ...updated } : o))
              );
            }}
            directionalLight={directionalLight}
            pointLight={pointLight}
            spotLight={spotLight}
            ambientLight={ambientLight}
            cameraConfig={cameraConfig}
            stage={stage}
            timeline={timeline}
            snapshotRef={snapshotRef}
            sceneRef={sceneRef}
          />
        </Canvas>
      </div>

      {/* Unreal Engine 5 Top Header */}
      <UnrealHeader
        stage={stage}
        setStage={setStage}
        timeline={timeline}
        setTimeline={setTimeline}
        onExportGLB={handleExportGLB}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onTakeSnapshot={handleTakeSnapshot}
        onResetScene={handleResetScene}
        toggleFullscreen={toggleFullscreen}
        isFullscreen={isFullscreen}
      />

      {/* Unreal Engine 5 Left Floating Toolbar */}
      <UnrealToolbar
        gizmoMode={stage.gizmoMode}
        setGizmoMode={(mode) => setStage((prev) => ({ ...prev, gizmoMode: mode }))}
        onAddObject={handleAddObject}
        gridSnap={stage.gridSnap}
        setGridSnap={(snap) => setStage((prev) => ({ ...prev, gridSnap: snap }))}
        onSelectCameraPreset={(preset) =>
          setCameraConfig((prev) => ({ ...prev, preset: preset as CameraPreset }))
        }
      />

      {/* Unreal Engine 5 Right Details Panel & Outliner */}
      <UnrealDetailsPanel
        sceneObjects={sceneObjects}
        selectedObjectId={selectedObjectId}
        onSelectObject={setSelectedObjectId}
        onAddObject={handleAddObject}
        onDuplicateObject={handleDuplicateObject}
        onDeleteObject={handleDeleteObject}
        onUpdateSelectedObject={handleUpdateSelectedObject}
        directionalLight={directionalLight}
        setDirectionalLight={setDirectionalLight}
        pointLight={pointLight}
        setPointLight={setPointLight}
        spotLight={spotLight}
        setSpotLight={setSpotLight}
        ambientLight={ambientLight}
        setAmbientLight={setAmbientLight}
        cameraConfig={cameraConfig}
        setCameraConfig={setCameraConfig}
        stage={stage}
        setStage={setStage}
        onExportGLB={handleExportGLB}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
        onTakeSnapshot={handleTakeSnapshot}
        onResetScene={handleResetScene}
        onExportJSON={handleExportJSON}
        onImportJSON={handleImportJSON}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Unreal Engine 5 Bottom Sequencer Timeline */}
      <UnrealSequencer
        timeline={timeline}
        setTimeline={setTimeline}
        selectedObject={selectedObj}
        onAddKeyframe={handleAddKeyframe}
        onDeleteKeyframe={handleDeleteKeyframe}
      />

      {/* Code Export Modal */}
      <CodeExporterModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        box={selectedObj ? (selectedObj as any) : (INITIAL_BOX_OBJECT as any)}
        directionalLight={directionalLight}
        pointLight={pointLight}
        spotLight={spotLight}
        ambientLight={ambientLight}
        cameraConfig={cameraConfig}
        stage={stage}
      />
    </div>
  );
}
