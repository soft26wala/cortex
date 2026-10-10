"use client";

import React from "react";
import { GizmoMode, SceneObject, CameraPreset } from "./types";
import {
  Move,
  RotateCw,
  Maximize2,
  Eye,
  Box,
  Circle,
  Cylinder as CylinderIcon,
  Sun,
  Grid,
  Camera,
  Plus,
  Compass,
} from "lucide-react";

interface UnrealToolbarProps {
  gizmoMode: GizmoMode;
  setGizmoMode: (mode: GizmoMode) => void;
  onAddObject: (type: SceneObject["type"]) => void;
  gridSnap: boolean;
  setGridSnap: (snap: boolean) => void;
  onSelectCameraPreset: (preset: CameraPreset) => void;
}

export default function UnrealToolbar({
  gizmoMode,
  setGizmoMode,
  onAddObject,
  gridSnap,
  setGridSnap,
  onSelectCameraPreset,
}: UnrealToolbarProps) {
  return (
    <div className="fixed top-16 left-3 z-30 flex flex-col gap-2 p-1.5 bg-[#0b0d14]/90 backdrop-blur-xl border border-slate-800/90 rounded-xl shadow-2xl select-none text-slate-200">
      {/* Transform Gizmo Modes (W, E, R, Q) */}
      <div className="flex flex-col gap-1 pb-2 border-b border-slate-800/80">
        {[
          { id: "translate", label: "Select & Move [W]", icon: Move },
          { id: "rotate", label: "Rotate [E]", icon: RotateCw },
          { id: "scale", label: "Scale / Resize [R]", icon: Maximize2 },
          { id: "none", label: "Select Only [Q]", icon: Eye },
        ].map((tool) => {
          const Icon = tool.icon;
          const active = gizmoMode === tool.id;
          return (
            <button
              key={tool.id}
              onClick={() => setGizmoMode(tool.id as GizmoMode)}
              title={tool.label}
              className={`p-2 rounded-lg transition text-xs flex items-center justify-center ${
                active
                  ? "bg-cyan-500 text-slate-950 shadow-md font-bold"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>

      {/* Grid Snap Toggle */}
      <div className="pb-2 border-b border-slate-800/80">
        <button
          onClick={() => setGridSnap(!gridSnap)}
          title={`Grid Snap (${gridSnap ? "ON" : "OFF"})`}
          className={`w-full p-2 rounded-lg transition text-xs flex items-center justify-center ${
            gridSnap
              ? "bg-indigo-600/40 text-cyan-300 border border-indigo-500/50"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Grid className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Add Primitive Actors */}
      <div className="flex flex-col gap-1 pb-2 border-b border-slate-800/80">
        <div className="text-[9px] uppercase font-mono font-bold text-slate-500 text-center py-0.5">
          Actors
        </div>
        <button
          onClick={() => onAddObject("box")}
          title="Add Cube Actor"
          className="p-2 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-lg transition flex justify-center"
        >
          <Box className="w-4 h-4" />
        </button>
        <button
          onClick={() => onAddObject("sphere")}
          title="Add Sphere Actor"
          className="p-2 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-lg transition flex justify-center"
        >
          <Circle className="w-4 h-4" />
        </button>
        <button
          onClick={() => onAddObject("cylinder")}
          title="Add Cylinder Actor"
          className="p-2 hover:bg-slate-800 text-slate-300 hover:text-cyan-400 rounded-lg transition flex justify-center"
        >
          <CylinderIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Camera Presets */}
      <div className="flex flex-col gap-1">
        <button
          onClick={() => onSelectCameraPreset("front")}
          title="Front View Camera"
          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition text-[10px] font-mono text-center"
        >
          FRONT
        </button>
        <button
          onClick={() => onSelectCameraPreset("top")}
          title="Top View Camera"
          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition text-[10px] font-mono text-center"
        >
          TOP
        </button>
        <button
          onClick={() => onSelectCameraPreset("isometric")}
          title="Isometric 3D Camera"
          className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition text-[10px] font-mono text-center"
        >
          3D
        </button>
      </div>
    </div>
  );
}
