"use client";

import dynamic from "next/dynamic";
import React from "react";
import { Loader2, Box } from "lucide-react";

const ThreeDStudio = dynamic(
  () => import("@/components/ThreeDStudio/ThreeDStudio"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center animate-pulse">
            <Box className="w-8 h-8 text-indigo-400 animate-spin" />
          </div>
          <Loader2 className="w-6 h-6 text-cyan-400 animate-spin absolute -bottom-2 -right-2" />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold tracking-wide">Loading 3D WebGL Studio</h2>
          <p className="text-xs text-slate-400">Initializing Three.js Canvas & Shaders...</p>
        </div>
      </div>
    ),
  }
);

export default function ThreeDPageClient() {
  return (
    <main className="w-full min-h-screen bg-slate-950 overflow-hidden">
      <ThreeDStudio />
    </main>
  );
}
