"use client";

import React, { useState } from "react";
import Outliner from "./Outliner";
import {
  SceneObject,
  DirectionalLightConfig,
  PointLightConfig,
  SpotLightConfig,
  AmbientLightConfig,
  CameraConfig,
  StageConfig,
  MaterialType,
  TexturePreset,
  GizmoMode,
  CameraPreset,
} from "./types";
import {
  Box,
  Sun,
  Lightbulb,
  Camera,
  Layers,
  Sparkles,
  Code,
  Download,
  RotateCcw,
  Eye,
  Sliders,
  Move,
  RotateCw,
  Maximize2,
  ChevronRight,
  Plus,
  FileJson,
  Upload,
  Copy,
  Trash2,
} from "lucide-react";

interface ControlPanelProps {
  sceneObjects: SceneObject[];
  selectedObjectId: string | null;
  onSelectObject: (id: string) => void;
  onAddObject: (type: SceneObject["type"]) => void;
  onDuplicateObject: (id: string) => void;
  onDeleteObject: (id: string) => void;
  onUpdateSelectedObject: (updated: Partial<SceneObject>) => void;
  directionalLight: DirectionalLightConfig;
  setDirectionalLight: React.Dispatch<React.SetStateAction<DirectionalLightConfig>>;
  pointLight: PointLightConfig;
  setPointLight: React.Dispatch<React.SetStateAction<PointLightConfig>>;
  spotLight: SpotLightConfig;
  setSpotLight: React.Dispatch<React.SetStateAction<SpotLightConfig>>;
  ambientLight: AmbientLightConfig;
  setAmbientLight: React.Dispatch<React.SetStateAction<AmbientLightConfig>>;
  cameraConfig: CameraConfig;
  setCameraConfig: React.Dispatch<React.SetStateAction<CameraConfig>>;
  stage: StageConfig;
  setStage: React.Dispatch<React.SetStateAction<StageConfig>>;
  onExportGLB: () => void;
  onOpenCodeModal: () => void;
  onTakeSnapshot: () => void;
  onResetScene: () => void;
  onExportJSON: () => void;
  onImportJSON: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

export default function ControlPanel({
  sceneObjects,
  selectedObjectId,
  onSelectObject,
  onAddObject,
  onDuplicateObject,
  onDeleteObject,
  onUpdateSelectedObject,
  directionalLight,
  setDirectionalLight,
  pointLight,
  setPointLight,
  spotLight,
  setSpotLight,
  ambientLight,
  setAmbientLight,
  cameraConfig,
  setCameraConfig,
  stage,
  setStage,
  onExportGLB,
  onOpenCodeModal,
  onTakeSnapshot,
  onResetScene,
  onExportJSON,
  onImportJSON,
  isCollapsed,
  setIsCollapsed,
}: ControlPanelProps) {
  const [activeTab, setActiveTab] = useState<"objects" | "design" | "lights" | "camera" | "stage" | "export">(
    "objects"
  );

  const selectedObject = sceneObjects.find((o) => o.id === selectedObjectId) || sceneObjects[0] || null;

  const updateDirLight = (fields: Partial<DirectionalLightConfig>) => {
    setDirectionalLight((prev) => ({ ...prev, ...fields }));
  };

  const updatePointLight = (fields: Partial<PointLightConfig>) => {
    setPointLight((prev) => ({ ...prev, ...fields }));
  };

  const updateAmbientLight = (fields: Partial<AmbientLightConfig>) => {
    setAmbientLight((prev) => ({ ...prev, ...fields }));
  };

  const updateCamera = (fields: Partial<CameraConfig>) => {
    setCameraConfig((prev) => ({ ...prev, ...fields }));
  };

  const updateStage = (fields: Partial<StageConfig>) => {
    setStage((prev) => ({ ...prev, ...fields }));
  };

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed top-20 right-4 z-40 p-3 bg-slate-900/90 backdrop-blur-md text-white rounded-xl border border-indigo-500/30 shadow-2xl hover:bg-slate-800 transition flex items-center gap-2 group"
      >
        <Sliders className="w-5 h-5 text-indigo-400 group-hover:rotate-45 transition-transform" />
        <span className="text-xs font-semibold tracking-wide">Blender Inspector</span>
      </button>
    );
  }

  return (
    <div className="fixed top-20 right-4 bottom-16 z-40 w-80 md:w-96 bg-slate-950/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl flex flex-col text-slate-200 overflow-hidden select-none animate-fade-in">
      {/* Inspector Header */}
      <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between bg-slate-900/50">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide">Blender Studio Inspector</h2>
            <p className="text-[10px] text-slate-400">Scene Objects, Design & Lighting</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onResetScene}
            title="Reset Scene"
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsCollapsed(true)}
            title="Collapse Sidebar"
            className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="grid grid-cols-6 p-1 bg-slate-900/80 border-b border-slate-800/80 text-xs">
        {[
          { id: "objects", label: "Scene", icon: Layers },
          { id: "design", label: "Design", icon: Box },
          { id: "lights", label: "Lights", icon: Sun },
          { id: "camera", label: "Camera", icon: Camera },
          { id: "stage", label: "Stage", icon: Sliders },
          { id: "export", label: "Export", icon: Download },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex flex-col items-center gap-1 py-1.5 px-1 rounded-lg transition text-[10px] font-medium ${
                isActive
                  ? "bg-indigo-600/90 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar text-xs">
        {/* ===================== TAB: OBJECTS & OUTLINER ===================== */}
        {activeTab === "objects" && (
          <div className="space-y-4">
            <Outliner
              sceneObjects={sceneObjects}
              selectedObjectId={selectedObjectId}
              onSelectObject={onSelectObject}
              onAddObject={onAddObject}
              onDuplicateObject={onDuplicateObject}
              onDeleteObject={onDeleteObject}
              directionalLight={directionalLight}
              pointLight={pointLight}
              spotLight={spotLight}
            />

            {/* Selected Object Quick Rename & Actions */}
            {selectedObject && (
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Active Mesh Properties</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono">
                    {selectedObject.type.toUpperCase()}
                  </span>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Object Name</label>
                  <input
                    type="text"
                    value={selectedObject.name}
                    onChange={(e) => onUpdateSelectedObject({ name: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200 font-medium outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===================== TAB: DESIGN / MATERIAL ===================== */}
        {activeTab === "design" && selectedObject && (
          <div className="space-y-4">
            {/* Color Picker */}
            <div>
              <label className="text-[11px] font-semibold text-slate-300 mb-1.5 block">
                Mesh Color ({selectedObject.name})
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={selectedObject.color}
                  onChange={(e) => onUpdateSelectedObject({ color: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={selectedObject.color}
                  onChange={(e) => onUpdateSelectedObject({ color: e.target.value })}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs uppercase"
                />
              </div>
              <div className="flex gap-1.5 mt-2">
                {["#6366f1", "#ec4899", "#10b981", "#f59e0b", "#06b6d4", "#f43f5e", "#ffffff", "#1e293b"].map(
                  (c) => (
                    <button
                      key={c}
                      onClick={() => onUpdateSelectedObject({ color: c })}
                      className="w-6 h-6 rounded-md border border-slate-700 hover:scale-110 transition shadow"
                      style={{ backgroundColor: c }}
                    />
                  )
                )}
              </div>
            </div>

            {/* Material Selector */}
            <div>
              <label className="text-[11px] font-semibold text-slate-300 mb-1.5 block">
                Material Shader Type
              </label>
              <select
                value={selectedObject.materialType}
                onChange={(e) =>
                  onUpdateSelectedObject({ materialType: e.target.value as MaterialType })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 outline-none focus:border-indigo-500"
              >
                <option value="standard">Standard PBR Shader</option>
                <option value="physical">Physical Glass / Refractive</option>
                <option value="phong">Phong Shiny Reflective</option>
                <option value="normal">Normal Map Visualizer</option>
                <option value="basic">Flat Unlit Color</option>
              </select>
            </div>

            {/* Sliders */}
            {selectedObject.materialType !== "normal" && selectedObject.materialType !== "basic" && (
              <div className="space-y-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Roughness</span>
                    <span className="font-mono">{selectedObject.roughness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={selectedObject.roughness}
                    onChange={(e) =>
                      onUpdateSelectedObject({ roughness: parseFloat(e.target.value) })
                    }
                    className="w-full accent-indigo-500"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-400 mb-1">
                    <span>Metalness</span>
                    <span className="font-mono">{selectedObject.metalness.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={selectedObject.metalness}
                    onChange={(e) =>
                      onUpdateSelectedObject({ metalness: parseFloat(e.target.value) })
                    }
                    className="w-full accent-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Wireframe */}
            <div className="flex items-center justify-between p-3 bg-slate-900/60 rounded-xl border border-slate-800/60">
              <span className="font-medium text-slate-300">Wireframe Mode</span>
              <button
                onClick={() =>
                  onUpdateSelectedObject({ wireframe: !selectedObject.wireframe })
                }
                className={`w-11 h-6 rounded-full transition-colors relative p-1 ${
                  selectedObject.wireframe ? "bg-indigo-600" : "bg-slate-800"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    selectedObject.wireframe ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Texture Generator */}
            <div>
              <label className="text-[11px] font-semibold text-slate-300 mb-1.5 block">
                Procedural Texture
              </label>
              <select
                value={selectedObject.texturePreset}
                onChange={(e) =>
                  onUpdateSelectedObject({ texturePreset: e.target.value as TexturePreset })
                }
                className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 outline-none focus:border-indigo-500"
              >
                <option value="none">None (Plain Material)</option>
                <option value="checker">Checkerboard Grid</option>
                <option value="grid">Fine Line Matrix</option>
                <option value="dots">Polka Dots</option>
                <option value="stripes">Diagonal Stripes</option>
                <option value="noise">Metallic Noise Grain</option>
              </select>
            </div>

            {/* Transform Numerical Inputs */}
            <div className="space-y-3 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60">
              <h3 className="font-semibold text-slate-200 border-b border-slate-800 pb-1">
                Numerical Coordinates
              </h3>

              {/* Position */}
              <div>
                <label className="text-slate-400 text-[10px] block mb-1">Position (X, Y, Z)</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["0", "1", "2"] as const).map((idx, i) => (
                    <div key={i} className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded">
                      <span className="text-[10px] font-bold text-indigo-400">
                        {["X", "Y", "Z"][i]}
                      </span>
                      <input
                        type="number"
                        step="0.2"
                        value={selectedObject.position[i]}
                        onChange={(e) => {
                          const newPos = [...selectedObject.position] as [number, number, number];
                          newPos[i] = parseFloat(e.target.value) || 0;
                          onUpdateSelectedObject({ position: newPos });
                        }}
                        className="w-full bg-transparent text-right font-mono outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Scale */}
              <div>
                <label className="text-slate-400 text-[10px] block mb-1">Scale (X, Y, Z)</label>
                <div className="grid grid-cols-3 gap-2">
                  {(["0", "1", "2"] as const).map((idx, i) => (
                    <div key={i} className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded">
                      <span className="text-[10px] font-bold text-cyan-400">
                        {["X", "Y", "Z"][i]}
                      </span>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        value={selectedObject.scale[i]}
                        onChange={(e) => {
                          const newScale = [...selectedObject.scale] as [number, number, number];
                          newScale[i] = parseFloat(e.target.value) || 0.1;
                          onUpdateSelectedObject({ scale: newScale });
                        }}
                        className="w-full bg-transparent text-right font-mono outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: LIGHTS ===================== */}
        {activeTab === "lights" && (
          <div className="space-y-4">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-slate-200">Directional Sun Light</span>
                </div>
                <button
                  onClick={() => updateDirLight({ enabled: !directionalLight.enabled })}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                    directionalLight.enabled ? "bg-amber-500" : "bg-slate-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      directionalLight.enabled ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {directionalLight.enabled && (
                <>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={directionalLight.color}
                      onChange={(e) => updateDirLight({ color: e.target.value })}
                      className="w-7 h-7 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between text-slate-400 mb-1">
                        <span>Intensity</span>
                        <span className="font-mono">{directionalLight.intensity.toFixed(1)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="8"
                        step="0.2"
                        value={directionalLight.intensity}
                        onChange={(e) =>
                          updateDirLight({ intensity: parseFloat(e.target.value) })
                        }
                        className="w-full accent-amber-500"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-cyan-400" />
                  <span className="font-semibold text-slate-200">Point Bulb Light</span>
                </div>
                <button
                  onClick={() => updatePointLight({ enabled: !pointLight.enabled })}
                  className={`w-9 h-5 rounded-full transition-colors relative p-0.5 ${
                    pointLight.enabled ? "bg-cyan-500" : "bg-slate-800"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      pointLight.enabled ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: CAMERA ===================== */}
        {activeTab === "camera" && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 mb-2 block">
                Camera Angle Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "front", label: "Front View" },
                  { id: "top", label: "Top View" },
                  { id: "side", label: "Side View" },
                  { id: "isometric", label: "Isometric 3D" },
                  { id: "cinematic", label: "Cinematic Angle" },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => updateCamera({ preset: p.id as CameraPreset })}
                    className={`py-2 px-3 rounded-lg border text-xs font-medium transition ${
                      cameraConfig.preset === p.id
                        ? "bg-indigo-600 border-indigo-400 text-white shadow"
                        : "bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/60">
              <div className="flex justify-between text-slate-300 mb-1 font-semibold">
                <span>Field of View (FOV)</span>
                <span className="font-mono text-indigo-400">{cameraConfig.fov}°</span>
              </div>
              <input
                type="range"
                min="20"
                max="90"
                step="1"
                value={cameraConfig.fov}
                onChange={(e) =>
                  updateCamera({ fov: parseInt(e.target.value), preset: "custom" })
                }
                className="w-full accent-indigo-500"
              />
            </div>
          </div>
        )}

        {/* ===================== TAB: STAGE & GIZMO ===================== */}
        {activeTab === "stage" && (
          <div className="space-y-4">
            <div>
              <label className="text-[11px] font-semibold text-slate-300 mb-1.5 block">
                Environment Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={stage.bgColor}
                  onChange={(e) => updateStage({ bgColor: e.target.value })}
                  className="w-9 h-9 rounded-lg border border-slate-700 bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={stage.bgColor}
                  onChange={(e) => updateStage({ bgColor: e.target.value })}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 font-mono text-xs uppercase"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-300 mb-1.5 block">
                Interactive Gizmo Handle Mode
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: "translate", label: "Move", icon: Move },
                  { id: "rotate", label: "Rotate", icon: RotateCw },
                  { id: "scale", label: "Scale", icon: Maximize2 },
                  { id: "none", label: "Off", icon: Eye },
                ].map((g) => {
                  const Icon = g.icon;
                  const active = stage.gizmoMode === g.id;
                  return (
                    <button
                      key={g.id}
                      onClick={() => updateStage({ gizmoMode: g.id as GizmoMode })}
                      className={`flex flex-col items-center gap-1 py-2 px-1 rounded-lg border transition text-[10px] ${
                        active
                          ? "bg-indigo-600 border-indigo-400 text-white"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{g.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ===================== TAB: IMPORT & EXPORT ===================== */}
        {activeTab === "export" && (
          <div className="space-y-3">
            <h3 className="font-bold text-slate-200 text-xs">Import & Export Blender Scene</h3>

            {/* Export 3D GLB Model File */}
            <button
              onClick={onExportGLB}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <Download className="w-4 h-4" />
              <span>Export 3D Model (.GLB / .GLTF)</span>
            </button>

            {/* Export JSON Project */}
            <button
              onClick={onExportJSON}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-300 font-semibold transition flex items-center justify-center gap-2"
            >
              <FileJson className="w-4 h-4 text-amber-400" />
              <span>Save Scene Project (.JSON)</span>
            </button>

            {/* Import JSON Project */}
            <label className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold transition flex items-center justify-center gap-2 cursor-pointer">
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>Import JSON Scene File</span>
              <input
                type="file"
                accept=".json"
                onChange={onImportJSON}
                className="hidden"
              />
            </label>

            {/* Export React Code */}
            <button
              onClick={onOpenCodeModal}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-indigo-300 font-semibold transition flex items-center justify-center gap-2"
            >
              <Code className="w-4 h-4 text-indigo-400" />
              <span>Export React R3F Code</span>
            </button>

            {/* Snapshot HD */}
            <button
              onClick={onTakeSnapshot}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold transition flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4 text-slate-400" />
              <span>Download HD PNG Snapshot</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
