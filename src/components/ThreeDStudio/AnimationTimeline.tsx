"use client";

import React from "react";
import { TimelineState, SceneObject, Keyframe } from "./types";
import {
  Play,
  Pause,
  RotateCcw,
  Key,
  Trash2,
  Clock,
  Sparkles,
  ChevronRight,
  Repeat,
} from "lucide-react";

interface AnimationTimelineProps {
  timeline: TimelineState;
  setTimeline: React.Dispatch<React.SetStateAction<TimelineState>>;
  selectedObject: SceneObject | null;
  onAddKeyframe: () => void;
  onDeleteKeyframe: (keyframeId: string) => void;
}

export default function AnimationTimeline({
  timeline,
  setTimeline,
  selectedObject,
  onAddKeyframe,
  onDeleteKeyframe,
}: AnimationTimelineProps) {
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
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/90 px-4 py-2.5 flex flex-col md:flex-row items-center justify-between gap-3 text-slate-200 select-none shadow-2xl">
      {/* Controls Group */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        {/* Play/Pause & Reset */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={handleReset}
            title="Reset to 0s"
            className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={togglePlay}
            title={timeline.isPlaying ? "Pause Timeline" : "Play Timeline"}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition"
          >
            {timeline.isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Play</span>
              </>
            )}
          </button>
        </div>

        {/* Selected Object Keyframe Recorder Action */}
        <div className="flex items-center gap-2">
          {selectedObject ? (
            <button
              onClick={onAddKeyframe}
              title={`Record Keyframe for ${selectedObject.name} at ${timeline.currentTime.toFixed(
                2
              )}s`}
              className="px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow"
            >
              <Key className="w-3.5 h-3.5 text-amber-400" />
              <span>+ Keyframe ({timeline.currentTime.toFixed(1)}s)</span>
            </button>
          ) : (
            <span className="text-[11px] text-slate-500 italic">Select object to add keyframe</span>
          )}
        </div>
      </div>

      {/* Timeline Scrub Bar with Markers */}
      <div className="flex-1 w-full max-w-2xl flex items-center gap-3 px-2">
        <span className="text-xs font-mono text-indigo-400 font-bold min-w-[65px]">
          {timeline.currentTime.toFixed(2)}s / {timeline.maxDuration.toFixed(1)}s
        </span>

        <div className="relative flex-1 flex items-center py-2">
          {/* Track Line */}
          <input
            type="range"
            min="0"
            max={timeline.maxDuration}
            step="0.05"
            value={timeline.currentTime}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer z-10"
          />

          {/* Keyframe Diamond Markers on Timeline Track */}
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
                      : "bg-indigo-400 border-indigo-200 opacity-80"
                  }`}
                  style={{ left: `${leftPercent}%` }}
                  title={`Keyframe at ${kf.time.toFixed(2)}s`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline Options */}
      <div className="hidden lg:flex items-center gap-3 text-xs text-slate-400">
        <label className="flex items-center gap-1.5 cursor-pointer">
          <input
            type="checkbox"
            checked={timeline.loop}
            onChange={(e) => setTimeline((prev) => ({ ...prev, loop: e.target.checked }))}
            className="rounded bg-slate-900 border-slate-700 text-indigo-500"
          />
          <Repeat className="w-3.5 h-3.5 text-indigo-400" />
          <span>Loop</span>
        </label>
        <span className="text-slate-600">|</span>
        <span className="font-mono text-[11px] text-slate-500">
          Keyframes: {keyframes.length}
        </span>
      </div>
    </div>
  );
}
