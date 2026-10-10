"use client";

import React from "react";
import { SceneObject, DirectionalLightConfig, PointLightConfig, SpotLightConfig } from "./types";
import {
  Box,
  Circle,
  Cylinder as CylinderIcon,
  Sun,
  Lightbulb,
  Eye,
  Trash2,
  Copy,
  Plus,
  Layers,
  ChevronRight,
} from "lucide-react";

interface OutlinerProps {
  sceneObjects: SceneObject[];
  selectedObjectId: string | null;
  onSelectObject: (id: string) => void;
  onAddObject: (type: SceneObject["type"]) => void;
  onDuplicateObject: (id: string) => void;
  onDeleteObject: (id: string) => void;
  directionalLight: DirectionalLightConfig;
  pointLight: PointLightConfig;
  spotLight: SpotLightConfig;
}

export default function Outliner({
  sceneObjects,
  selectedObjectId,
  onSelectObject,
  onAddObject,
  onDuplicateObject,
  onDeleteObject,
  directionalLight,
  pointLight,
  spotLight,
}: OutlinerProps) {
  const getIconForType = (type: SceneObject["type"]) => {
    switch (type) {
      case "sphere":
        return Circle;
      case "cylinder":
      case "cone":
        return CylinderIcon;
      case "box":
      default:
        return Box;
    }
  };

  return (
    <div className="bg-slate-900/80 rounded-xl border border-slate-800/80 p-3 space-y-3">
      {/* Header & Add Button */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-slate-200 text-xs tracking-wide">Scene Outliner</h3>
        </div>

        {/* Add Object Dropdown */}
        <div className="relative group">
          <button className="px-2.5 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-[11px] font-semibold flex items-center gap-1 shadow transition">
            <Plus className="w-3.5 h-3.5" />
            <span>Add 3D Mesh</span>
          </button>

          {/* Add Dropdown Menu */}
          <div className="absolute right-0 top-full mt-1 hidden group-hover:block z-50 w-44 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl p-1 text-xs">
            {[
              { type: "box", label: "📦 Cube / Box" },
              { type: "sphere", label: "🔮 Sphere" },
              { type: "cylinder", label: "🛢️ Cylinder" },
              { type: "cone", label: "📐 Cone" },
              { type: "torus", label: "🍩 Torus Ring" },
              { type: "plane", label: "📄 Flat Plane" },
              { type: "dodecahedron", label: "💎 Dodecahedron" },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => onAddObject(item.type as any)}
                className="w-full text-left px-3 py-1.5 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hierarchy Object List */}
      <div className="space-y-1 max-h-48 overflow-y-auto custom-scrollbar">
        {sceneObjects.map((obj) => {
          const Icon = getIconForType(obj.type);
          const isSelected = selectedObjectId === obj.id;
          return (
            <div
              key={obj.id}
              onClick={() => onSelectObject(obj.id)}
              className={`flex items-center justify-between px-2.5 py-2 rounded-lg cursor-pointer transition text-xs ${
                isSelected
                  ? "bg-indigo-600/90 text-white font-semibold shadow"
                  : "bg-slate-950/60 hover:bg-slate-800/80 text-slate-300 border border-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-3 h-3 rounded-full border border-slate-700 shrink-0"
                  style={{ backgroundColor: obj.color }}
                />
                <Icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{obj.name}</span>
              </div>

              <div className="flex items-center gap-1 opacity-80 hover:opacity-100">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateObject(obj.id);
                  }}
                  title="Duplicate Mesh"
                  className="p-1 hover:bg-slate-800/80 rounded text-slate-400 hover:text-white transition"
                >
                  <Copy className="w-3 h-3" />
                </button>
                {sceneObjects.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteObject(obj.id);
                    }}
                    title="Delete Mesh"
                    className="p-1 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
