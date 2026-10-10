"use client";

import React, { useState } from "react";
import UnrealOutliner from "./UnrealOutliner";
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
  ChevronDown,
  Plus,
  FileJson,
  Upload,
  Copy,
  Trash2,
  Zap,
} from "lucide-react";

interface UnrealDetailsPanelProps {
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

export default function UnrealDetailsPanel({
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
}: UnrealDetailsPanelProps) {
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({
    outliner: true,
    transform: true,
    material: true,
    lights: false,
    camera: false,
  });

  const selectedObject =
    sceneObjects.find((o) => o.id === selectedObjectId) || sceneObjects[0] || null;

  const toggleAccordion = (key: string) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

  if (isCollapsed) {
    return (
      <button
        onClick={() => setIsCollapsed(false)}
        className="fixed top-16 right-3 z-40 p-2.5 bg-[#0b0d14]/90 backdrop-blur-md text-cyan-400 rounded-xl border border-slate-800 shadow-2xl hover:bg-slate-900 transition flex items-center gap-2 group text-xs"
      >
        <Sliders className="w-4 h-4 text-cyan-400 group-hover:rotate-45 transition-transform" />
        <span className="font-bold tracking-wide">UE5 Details</span>
      </button>
    );
  }

  return (
    <div className="fixed top-16 right-3 bottom-14 z-40 w-80 md:w-96 bg-[#0a0d14]/95 backdrop-blur-xl border border-slate-800/90 rounded-2xl shadow-2xl flex flex-col text-slate-200 overflow-hidden select-none animate-fade-in text-xs font-sans">
      {/* Header */}
      <div className="p-3 border-b border-slate-800/90 flex items-center justify-between bg-[#0f1420]">
        <div className="flex items-center gap-2">
          <div className="p-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 font-mono text-[10px] font-bold">
            DETAILS
          </div>
          <div>
            <h2 className="text-xs font-bold text-white tracking-wide uppercase">
              {selectedObject ? selectedObject.name : "Actor Details"}
            </h2>
            <p className="text-[10px] text-slate-400 font-mono">
              Class: StaticMeshActor ({selectedObject?.type})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onResetScene}
            title="Reset Scene"
            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsCollapsed(true)}
            title="Collapse Details Panel"
            className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Accordions Body */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {/* ================= ACCORDION 1: WORLD OUTLINER ================= */}
        <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-[#0d111a]">
          <button
            onClick={() => toggleAccordion("outliner")}
            className="w-full px-3 py-2 bg-[#0f1420] hover:bg-slate-800/80 font-bold text-[11px] uppercase tracking-wider text-slate-300 flex items-center justify-between transition border-b border-slate-800/80"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>World Outliner Tree</span>
            </div>
            {openAccordions.outliner ? (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openAccordions.outliner && (
            <div className="p-2">
              <UnrealOutliner
                sceneObjects={sceneObjects}
                selectedObjectId={selectedObjectId}
                onSelectObject={onSelectObject}
                onAddObject={onAddObject}
                onDuplicateObject={onDuplicateObject}
                onDeleteObject={onDeleteObject}
                onToggleVisibility={(id) => {
                  const target = sceneObjects.find((o) => o.id === id);
                  if (target) onUpdateSelectedObject({ visible: !target.visible });
                }}
                onToggleLock={(id) => {
                  const target = sceneObjects.find((o) => o.id === id);
                  if (target) onUpdateSelectedObject({ locked: !target.locked });
                }}
              />
            </div>
          )}
        </div>

        {/* ================= ACCORDION 2: TRANSFORM ================= */}
        {selectedObject && (
          <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-[#0d111a]">
            <button
              onClick={() => toggleAccordion("transform")}
              className="w-full px-3 py-2 bg-[#0f1420] hover:bg-slate-800/80 font-bold text-[11px] uppercase tracking-wider text-slate-300 flex items-center justify-between transition border-b border-slate-800/80"
            >
              <div className="flex items-center gap-2">
                <Move className="w-3.5 h-3.5 text-cyan-400" />
                <span>Transform (Location, Rotation, Scale)</span>
              </div>
              {openAccordions.transform ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openAccordions.transform && (
              <div className="p-3 space-y-3">
                {/* Location */}
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-mono block mb-1">
                    Location X, Y, Z
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["0", "1", "2"] as const).map((idx, i) => (
                      <div key={i} className="flex items-center gap-1 bg-[#06080d] px-2 py-1 rounded border border-slate-800">
                        <span className="text-[10px] font-bold text-red-400 font-mono">
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
                          className="w-full bg-transparent text-right font-mono outline-none text-slate-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Scale */}
                <div>
                  <label className="text-slate-400 text-[10px] uppercase font-mono block mb-1">
                    Scale X, Y, Z
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(["0", "1", "2"] as const).map((idx, i) => (
                      <div key={i} className="flex items-center gap-1 bg-[#06080d] px-2 py-1 rounded border border-slate-800">
                        <span className="text-[10px] font-bold text-cyan-400 font-mono">
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
                          className="w-full bg-transparent text-right font-mono outline-none text-slate-200"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= ACCORDION 3: MATERIAL & SHADERS ================= */}
        {selectedObject && (
          <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-[#0d111a]">
            <button
              onClick={() => toggleAccordion("material")}
              className="w-full px-3 py-2 bg-[#0f1420] hover:bg-slate-800/80 font-bold text-[11px] uppercase tracking-wider text-slate-300 flex items-center justify-between transition border-b border-slate-800/80"
            >
              <div className="flex items-center gap-2">
                <Box className="w-3.5 h-3.5 text-cyan-400" />
                <span>Materials & PBR Shaders</span>
              </div>
              {openAccordions.material ? (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {openAccordions.material && (
              <div className="p-3 space-y-3">
                {/* Base Color */}
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                    Base Color
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={selectedObject.color}
                      onChange={(e) => onUpdateSelectedObject({ color: e.target.value })}
                      className="w-8 h-8 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedObject.color}
                      onChange={(e) => onUpdateSelectedObject({ color: e.target.value })}
                      className="flex-1 px-3 py-1 rounded bg-[#06080d] border border-slate-800 text-slate-200 font-mono text-xs uppercase"
                    />
                  </div>
                </div>

                {/* Shader Type */}
                <div>
                  <label className="text-[10px] text-slate-400 uppercase font-mono block mb-1">
                    Shader Model
                  </label>
                  <select
                    value={selectedObject.materialType}
                    onChange={(e) =>
                      onUpdateSelectedObject({ materialType: e.target.value as MaterialType })
                    }
                    className="w-full px-3 py-1.5 rounded bg-[#06080d] border border-slate-800 text-slate-200 font-mono text-xs outline-none focus:border-cyan-500"
                  >
                    <option value="standard">Standard PBR Shader</option>
                    <option value="physical">Physical Subsurface Glass</option>
                    <option value="phong">Phong Shiny Reflection</option>
                    <option value="normal">Normal Visualizer</option>
                  </select>
                </div>

                {/* Metallic & Roughness */}
                <div className="space-y-2 bg-[#06080d] p-2.5 rounded border border-slate-800">
                  <div>
                    <div className="flex justify-between text-slate-400 text-[10px] mb-1 font-mono">
                      <span>ROUGHNESS</span>
                      <span>{selectedObject.roughness.toFixed(2)}</span>
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
                      className="w-full accent-cyan-400"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-400 text-[10px] mb-1 font-mono">
                      <span>METALLIC</span>
                      <span>{selectedObject.metalness.toFixed(2)}</span>
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
                      className="w-full accent-cyan-400"
                    />
                  </div>
                </div>

                {/* Emissive Glowing Light */}
                <div className="p-2.5 bg-[#06080d] rounded border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300">
                    <span className="flex items-center gap-1 font-bold">
                      <Zap className="w-3 h-3 text-cyan-400" /> EMISSIVE GLOW
                    </span>
                    <input
                      type="color"
                      value={selectedObject.emissiveColor}
                      onChange={(e) => onUpdateSelectedObject({ emissiveColor: e.target.value })}
                      className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 text-[10px] mb-1 font-mono">
                      <span>Glow Intensity</span>
                      <span>{selectedObject.emissiveIntensity.toFixed(1)}</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="3"
                      step="0.1"
                      value={selectedObject.emissiveIntensity}
                      onChange={(e) =>
                        onUpdateSelectedObject({ emissiveIntensity: parseFloat(e.target.value) })
                      }
                      className="w-full accent-cyan-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= ACCORDION 4: LIGHTING ACTORS ================= */}
        <div className="border border-slate-800/80 rounded-xl overflow-hidden bg-[#0d111a]">
          <button
            onClick={() => toggleAccordion("lights")}
            className="w-full px-3 py-2 bg-[#0f1420] hover:bg-slate-800/80 font-bold text-[11px] uppercase tracking-wider text-slate-300 flex items-center justify-between transition border-b border-slate-800/80"
          >
            <div className="flex items-center gap-2">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Directional Sun & Point Light</span>
            </div>
            {openAccordions.lights ? (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {openAccordions.lights && (
            <div className="p-3 space-y-3">
              <div className="flex items-center justify-between">
                <span>Directional Sunlight</span>
                <input
                  type="color"
                  value={directionalLight.color}
                  onChange={(e) => updateDirLight({ color: e.target.value })}
                  className="w-6 h-6 rounded border border-slate-700 bg-transparent cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between text-slate-400 text-[10px] mb-1 font-mono">
                  <span>Intensity</span>
                  <span>{directionalLight.intensity.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="8"
                  step="0.2"
                  value={directionalLight.intensity}
                  onChange={(e) => updateDirLight({ intensity: parseFloat(e.target.value) })}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          )}
        </div>

        {/* ================= EXPORT ACTIONS ================= */}
        <div className="pt-2 space-y-2">
          <button
            onClick={onExportGLB}
            className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold transition flex items-center justify-center gap-2 shadow"
          >
            <Download className="w-4 h-4" />
            <span>Export 3D Model (.GLB)</span>
          </button>

          <button
            onClick={onOpenCodeModal}
            className="w-full py-2 px-3 rounded-xl bg-[#0f1420] hover:bg-slate-800 border border-slate-800 text-slate-300 font-semibold transition flex items-center justify-center gap-2"
          >
            <Code className="w-4 h-4 text-indigo-400" />
            <span>Export React Code</span>
          </button>
        </div>
      </div>
    </div>
  );
}
