"use client";

import React, { useState } from "react";
import { StageConfig, ShadingMode, TimelineState } from "./types";
import {
  Box,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Minimize,
  Download,
  Code,
  Layers,
  Sparkles,
  Cpu,
  Monitor,
  Eye,
  Sliders,
  Sun,
  Activity,
  ChevronDown,
} from "lucide-react";

interface UnrealHeaderProps {
  stage: StageConfig;
  setStage: React.Dispatch<React.SetStateAction<StageConfig>>;
  timeline: TimelineState;
  setTimeline: React.Dispatch<React.SetStateAction<TimelineState>>;
  onExportGLB: () => void;
  onOpenCodeModal: () => void;
  onTakeSnapshot: () => void;
  onResetScene: () => void;
  toggleFullscreen: () => void;
  isFullscreen: boolean;
}

export default function UnrealHeader({
  stage,
  setStage,
  timeline,
  setTimeline,
  onExportGLB,
  onOpenCodeModal,
  onTakeSnapshot,
  onResetScene,
  toggleFullscreen,
  isFullscreen,
}: UnrealHeaderProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const toggleSimulation = () => {
    setTimeline((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-30 h-12 px-3 bg-[#0a0d14] border-b border-slate-800/90 flex items-center justify-between text-slate-200 select-none text-xs font-sans shadow-xl">
      {/* Left: Unreal Logo & Menu Bar */}
      <div className="flex items-center gap-4">
        {/* Unreal Badge Logo */}
        <div className="flex items-center gap-2 px-2 py-1 rounded bg-slate-900 border border-slate-800">
          <div className="w-5 h-5 rounded bg-gradient-to-br from-cyan-400 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-[10px] shadow">
            U
          </div>
          <span className="font-extrabold text-[11px] tracking-wider text-white">
            UNREAL ENGINE <span className="text-cyan-400 font-mono text-[9px]">5.4</span>
          </span>
        </div>

        {/* Unreal Menu Items (File, Edit, Actor, View, Render) */}
        <div className="hidden md:flex items-center gap-1 text-[11px] text-slate-400">
          {["File", "Edit", "Actors", "Viewport", "Render", "Help"].map((item) => (
            <div key={item} className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === item ? null : item)}
                className="px-2.5 py-1 rounded hover:bg-slate-800/80 hover:text-white transition font-medium"
              >
                {item}
              </button>

              {activeMenu === item && (
                <div className="absolute left-0 top-full mt-1 z-50 w-48 bg-[#0f1420] border border-slate-800 rounded-lg shadow-2xl p-1 text-xs">
                  {item === "File" && (
                    <>
                      <button
                        onClick={() => {
                          onExportGLB();
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-between"
                      >
                        <span>Export .GLB 3D Scene</span>
                        <span className="text-[10px] text-slate-500 font-mono">Ctrl+S</span>
                      </button>
                      <button
                        onClick={() => {
                          onTakeSnapshot();
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-between"
                      >
                        <span>High-Res Snapshot</span>
                      </button>
                      <button
                        onClick={() => {
                          onResetScene();
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded hover:bg-red-500/20 text-red-400 hover:text-red-300"
                      >
                        Reset Scene
                      </button>
                    </>
                  )}
                  {item === "Viewport" && (
                    <>
                      <button
                        onClick={() => {
                          setStage((prev) => ({ ...prev, showGrid: !prev.showGrid }));
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                      >
                        Toggle Floor Grid
                      </button>
                      <button
                        onClick={() => {
                          setStage((prev) => ({ ...prev, showAxes: !prev.showAxes }));
                          setActiveMenu(null);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white"
                      >
                        Toggle Coordinate Axes
                      </button>
                    </>
                  )}
                  {item !== "File" && item !== "Viewport" && (
                    <div className="px-3 py-2 text-[11px] text-slate-500 italic">
                      Unreal {item} menu ready
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Center: Viewport Shading Mode & Simulation Play/Pause */}
      <div className="flex items-center gap-3">
        {/* Shading Mode Selector (LIT, UNLIT, WIREFRAME) */}
        <div className="hidden lg:flex items-center bg-slate-900/90 p-0.5 rounded-lg border border-slate-800 text-[11px]">
          <span className="px-2 text-[10px] font-mono text-slate-500 uppercase font-bold">
            Shading:
          </span>
          {[
            { id: "lit", label: "LIT" },
            { id: "unlit", label: "UNLIT" },
            { id: "wireframe", label: "WIRE" },
            { id: "normal", label: "NORMAL" },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setStage((prev) => ({ ...prev, shadingMode: mode.id as ShadingMode }))}
              className={`px-2.5 py-1 rounded font-mono font-bold transition ${
                stage.shadingMode === mode.id
                  ? "bg-cyan-500 text-slate-950 shadow"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Simulation Play / Pause Button */}
        <button
          onClick={toggleSimulation}
          className={`px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition border ${
            timeline.isPlaying
              ? "bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-lg shadow-amber-500/10"
              : "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-600/20"
          }`}
        >
          {timeline.isPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause Sim</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Play Sim</span>
            </>
          )}
        </button>
      </div>

      {/* Right: Engine Stats & Export Actions */}
      <div className="flex items-center gap-2">
        {/* Real-time FPS & Draw Call Badge */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-800 text-[10px] font-mono text-cyan-400">
          <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
          <span>60 FPS</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">Raytracing: ON</span>
        </div>

        {/* Export GLB */}
        <button
          onClick={onExportGLB}
          title="Export 3D .GLB Model"
          className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-[11px] flex items-center gap-1 transition shadow"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Export GLB</span>
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullscreen}
          title="Toggle Viewport Fullscreen"
          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
