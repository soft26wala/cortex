"use client";

import React, { useState } from "react";
import { SceneObject } from "./types";
import {
  Layers,
  Search,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Copy,
  Trash2,
  Plus,
  Box,
  Circle,
  Cylinder as CylinderIcon,
} from "lucide-react";

interface UnrealOutlinerProps {
  sceneObjects: SceneObject[];
  selectedObjectId: string | null;
  onSelectObject: (id: string) => void;
  onAddObject: (type: SceneObject["type"]) => void;
  onDuplicateObject: (id: string) => void;
  onDeleteObject: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onToggleLock: (id: string) => void;
}

export default function UnrealOutliner({
  sceneObjects,
  selectedObjectId,
  onSelectObject,
  onAddObject,
  onDuplicateObject,
  onDeleteObject,
  onToggleVisibility,
  onToggleLock,
}: UnrealOutlinerProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredObjects = sceneObjects.filter((o) =>
    o.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#0f1420]/90 rounded-xl border border-slate-800/90 p-3 space-y-2 text-xs select-none">
      {/* Header & Add Actor Button */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          <h3 className="font-bold text-slate-200 uppercase text-[11px] tracking-wider">
            World Outliner
          </h3>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
            {sceneObjects.length}
          </span>
        </div>

        {/* Add Actor Dropdown */}
        <div className="relative group">
          <button className="px-2 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded text-[10px] flex items-center gap-1 shadow transition">
            <Plus className="w-3 h-3" />
            <span>+ Actor</span>
          </button>
          <div className="absolute right-0 top-full mt-1 hidden group-hover:block z-50 w-44 bg-[#0a0d14] border border-slate-800 rounded-lg shadow-2xl p-1 text-xs">
            {[
              { type: "box", label: "📦 Cube Mesh" },
              { type: "sphere", label: "🔮 Sphere Mesh" },
              { type: "cylinder", label: "🛢️ Cylinder Mesh" },
              { type: "cone", label: "📐 Cone Mesh" },
              { type: "torus", label: "🍩 Torus Mesh" },
              { type: "plane", label: "📄 Plane Mesh" },
            ].map((item) => (
              <button
                key={item.type}
                onClick={() => onAddObject(item.type as any)}
                className="w-full text-left px-3 py-1.5 rounded hover:bg-slate-800 text-slate-300 hover:text-white transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search Actors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-3 py-1 rounded bg-[#080a0f] border border-slate-800/80 text-slate-200 text-[11px] outline-none focus:border-cyan-500 font-mono"
        />
      </div>

      {/* Actors List */}
      <div className="space-y-1 max-h-40 overflow-y-auto custom-scrollbar">
        {filteredObjects.map((obj) => {
          const isSelected = selectedObjectId === obj.id;
          return (
            <div
              key={obj.id}
              onClick={() => onSelectObject(obj.id)}
              className={`flex items-center justify-between px-2.5 py-1.5 rounded cursor-pointer transition text-[11px] ${
                isSelected
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 font-bold"
                  : "bg-slate-950/60 hover:bg-slate-800/60 text-slate-300 border border-slate-800/50"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-slate-700 shrink-0"
                  style={{ backgroundColor: obj.color }}
                />
                <span className="truncate font-mono">{obj.name}</span>
              </div>

              <div className="flex items-center gap-1">
                {/* Visibility Toggle */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleVisibility(obj.id);
                  }}
                  className="p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                >
                  {obj.visible !== false ? (
                    <Eye className="w-3 h-3 text-cyan-400" />
                  ) : (
                    <EyeOff className="w-3 h-3 text-slate-600" />
                  )}
                </button>

                {/* Duplicate */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDuplicateObject(obj.id);
                  }}
                  className="p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
                >
                  <Copy className="w-3 h-3" />
                </button>

                {/* Delete */}
                {sceneObjects.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteObject(obj.id);
                    }}
                    className="p-0.5 hover:bg-red-500/20 rounded text-red-400 hover:text-red-300"
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
