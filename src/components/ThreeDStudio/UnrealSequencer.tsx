"use client";

import React from "react";
import { TimelineState, SceneObject } from "./types";
import {
  Play,
  Pause,
  RotateCcw,
  Key,
  Repeat,
  Clapperboard,
  ChevronRight,
  Sparkles,
} from "lucide-react";

interface UnrealSequencerProps {
  timeline: TimelineState;
  setTimeline: React.Dispatch<React.SetStateAction<TimelineState>>;
  selectedObject: SceneObject | null;
  onAddKeyframe: () => void;
  onDeleteKeyframe: (keyframeId: string) => void;
}

export default function UnrealSequencer({
  timeline,
  setTimeline,
  selectedObject,
  onAddKeyframe,
  onDeleteKeyframe,
}: UnrealSequencerProps) {
  const togglePlay = () => {
    setTimeline((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const handleSeek = (time: number) => {
    setTimeline((prev) => ({ ...prev, currentTime: time }));
  };

  const handleReset = () => {
    setTimeline((prev) => ({ ...prev, isPlaying: false, currentTime: 0 }));
  };

  const keyframes = selectedObject?.keyframes || [];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#0a0d14]/95 backdrop-blur-xl border-t border-slate-800/90 px-3 py-2 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-200 select-none shadow-2xl font-sans text-xs">
      {/* Sequencer Badge & Playback */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#0f1420] border border-slate-800">
          <Clapperboard className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-bold text-[10px] uppercase font-mono tracking-wider text-slate-300">
            UE5 SEQUENCER
          </span>
        </div>

        {/* Play / Reset Controls */}
        <div className="flex items-center gap-1 bg-[#0f1420] p-0.5 rounded border border-slate-800">
          <button
            onClick={handleReset}
            title="Reset to Frame 0"
            className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={togglePlay}
            title={timeline.isPlaying ? "Pause Simulation" : "Play Simulation"}
            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 rounded font-bold text-[11px] flex items-center gap-1 shadow transition"
          >
            {timeline.isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>PLAY</span>
              </>
            )}
          </button>
        </div>

        {/* Keyframe Recorder Button */}
        {selectedObject && (
          <button
            onClick={onAddKeyframe}
            title={`Add Keyframe for ${selectedObject.name} at ${timeline.currentTime.toFixed(
              2
            )}s`}
            className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded text-[11px] font-bold flex items-center gap-1 transition shadow"
          >
            <Key className="w-3 h-3 text-amber-400" />
            <span>+ KEYFRAME ({timeline.currentTime.toFixed(1)}s)</span>
          </button>
        )}
      </div>

      {/* Scrub Track with Markers */}
      <div className="flex-1 w-full max-w-2xl flex items-center gap-3 px-2">
        <span className="text-[11px] font-mono text-cyan-400 font-bold min-w-[70px]">
          {timeline.currentTime.toFixed(2)}s / {timeline.maxDuration.toFixed(1)}s
        </span>

        <div className="relative flex-1 flex items-center py-2">
          <input
            type="range"
            min="0"
            max={timeline.maxDuration}
            step="0.05"
            value={timeline.currentTime}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer z-10"
          />

          {/* Keyframe Markers */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none px-1">
            {keyframes.map((kf) => {
              const leftPercent = (kf.time / timeline.maxDuration) * 100;
              const isCurrent = Math.abs(kf.time - timeline.currentTime) < 0.1;
              return (
                <div
                  key={kf.id}
                  className={`absolute w-3 h-3 -translate-x-1.2 -translate-y-1.5 rotate-45 border shadow-md transition-all ${
                    isCurrent
                      ? "bg-amber-400 border-white scale-125 z-20"
                      : "bg-cyan-400 border-cyan-200 opacity-80"
                  }`}
                  style={{ left: `${leftPercent}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Loop Toggle */}
      <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400 font-mono">
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="checkbox"
            checked={timeline.loop}
            onChange={(e) => setTimeline((prev) => ({ ...prev, loop: e.target.checked }))}
            className="rounded bg-[#080a0f] border-slate-700 text-cyan-500"
          />
          <Repeat className="w-3.5 h-3.5 text-cyan-400" />
          <span>LOOP</span>
        </label>
      </div>
    </div>
  );
}
