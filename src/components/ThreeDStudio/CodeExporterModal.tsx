"use client";

import React, { useState } from "react";
import {
  SceneObject,
  DirectionalLightConfig,
  PointLightConfig,
  SpotLightConfig,
  AmbientLightConfig,
  CameraConfig,
  StageConfig,
} from "./types";
import { X, Copy, Check, Download, Code2, FileJson } from "lucide-react";

interface CodeExporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  box: SceneObject;
  directionalLight: DirectionalLightConfig;
  pointLight: PointLightConfig;
  spotLight: SpotLightConfig;
  ambientLight: AmbientLightConfig;
  cameraConfig: CameraConfig;
  stage: StageConfig;
}

export default function CodeExporterModal({
  isOpen,
  onClose,
  box,
  directionalLight,
  pointLight,
  spotLight,
  ambientLight,
  cameraConfig,
  stage,
}: CodeExporterModalProps) {
  const [copied, setCopied] = useState(false);
  const [activeFormat, setActiveFormat] = useState<"r3f" | "json">("r3f");

  if (!isOpen) return null;

  // Generate React Three Fiber Code snippet
  const generateR3FCode = () => {
    return `'use client';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export default function MyThreeScene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '${stage.bgColor}' }}>
      <Canvas shadows camera={{ position: [${cameraConfig.position.join(", ")}], fov: ${cameraConfig.fov} }}>
        {/* Ambient Light */}
        ${
          ambientLight.enabled
            ? `<ambientLight color="${ambientLight.color}" intensity={${ambientLight.intensity}} />`
            : "/* Ambient light disabled */"
        }

        {/* Directional Sunlight */}
        ${
          directionalLight.enabled
            ? `<directionalLight
          position={[${directionalLight.position.join(", ")}]}
          color="${directionalLight.color}"
          intensity={${directionalLight.intensity}}
          castShadow={${directionalLight.castShadow}}
        />`
            : "/* Directional light disabled */"
        }

        {/* Point Light */}
        ${
          pointLight.enabled
            ? `<pointLight
          position={[${pointLight.position.join(", ")}]}
          color="${pointLight.color}"
          intensity={${pointLight.intensity * 10}}
        />`
            : ""
        }

        {/* 3D Mesh Object */}
        <mesh
          position={[${box.position.join(", ")}]}
          scale={[${box.scale.join(", ")}]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="${box.color}"
            roughness={${box.roughness}}
            metalness={${box.metalness}}
            wireframe={${box.wireframe}}
          />
        </mesh>

        {/* Ground Plane */}
        ${
          stage.showFloor
            ? `<mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="${stage.floorColor}" />
        </mesh>`
            : ""
        }

        {/* Orbit Controls */}
        <OrbitControls makeDefault />
      </Canvas>
    </div>
  );
}`;
  };

  // Generate JSON config string
  const generateJSONConfig = () => {
    return JSON.stringify(
      {
        selectedObject: box,
        directionalLight,
        pointLight,
        spotLight,
        ambientLight,
        camera: cameraConfig,
        stage,
      },
      null,
      2
    );
  };

  const codeContent = activeFormat === "r3f" ? generateR3FCode() : generateJSONConfig();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([generateJSONConfig()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "3d-scene-config.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Export 3D Scene Code & Config</h3>
              <p className="text-xs text-slate-400">Copy React Three Fiber component or download JSON</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Options Bar */}
        <div className="p-3 bg-slate-900/40 border-b border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFormat("r3f")}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeFormat === "r3f"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              React Three Fiber (JSX)
            </button>
            <button
              onClick={() => setActiveFormat("json")}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                activeFormat === "json"
                  ? "bg-indigo-600 text-white"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200"
              }`}
            >
              Scene Config (JSON)
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeFormat === "json" && (
              <button
                onClick={handleDownloadJSON}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition flex items-center gap-1.5 border border-slate-700"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Save JSON</span>
              </button>
            )}

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition flex items-center gap-1.5 shadow"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-950 font-mono text-xs text-slate-300 leading-relaxed custom-scrollbar">
          <pre className="whitespace-pre-wrap select-all">{codeContent}</pre>
        </div>
      </div>
    </div>
  );
}
