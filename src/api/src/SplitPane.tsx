"use client";

import React, { useState } from 'react';

interface SplitPaneProps {
  leftText?: string;
  rightText?: string;
  leftButtonLabel?: string;
  rightButtonLabel?: string;
}

const SplitPane: React.FC<SplitPaneProps> = ({
  leftText = "LOREM IPSUM DOLOR",
  rightText = "LOREM IPSUM DOLOR",
  leftButtonLabel = "links",
  rightButtonLabel = "rechts"
}) => {
  // Is state se hum control karenge ki kaunsa side kitna width lega
  // 0 = Left hide, 1 = Right hide, 0.5 = Dono aadhe
  const [ratio, setRatio] = useState<number>(0.5);

  return (
    <div className="flex h-screen w-full relative overflow-hidden font-sans">
      
      {/* Left Pane */}
      <div 
        className="bg-black text-white text-center relative transition-all duration-1000 ease-in-out flex items-center justify-center overflow-hidden"
        style={{ width: `${ratio * 50}%` }}
      >
        <div className="absolute flex items-center h-screen right-0 w-48 z-10">
          <button
            onClick={() => setRatio(0)} // Left ko zero kar do
            className="w-full h-48 flex items-center justify-center cursor-pointer transition duration-500 hover:bg-gray-300 bg-orange-50 text-black font-bold outline-none"
          >
            {leftButtonLabel}
          </button>
        </div>
        <div className="p-10 whitespace-nowrap lg:whitespace-normal">
          {leftText}
        </div>
      </div>

      {/* Right Pane */}
      <div 
        className="bg-orange-50 text-black text-center relative transition-all duration-1000 ease-in-out flex items-center justify-center overflow-hidden"
        style={{ width: `${(1 - ratio) * 100}%` }}
      >
        <div className="absolute flex items-center h-screen left-0 w-48 z-10">
          <button
            onClick={() => setRatio(1)} // Left ko full (100%) kar do, yani right zero ho jayega
            className="w-full h-48 flex items-center justify-center cursor-pointer transition duration-500 hover:bg-gray-700 bg-black text-white font-bold outline-none"
          >
            {rightButtonLabel}
          </button>
        </div>
        <div className="p-10 whitespace-nowrap lg:whitespace-normal">
          {rightText}
        </div>
      </div>

    </div>
  );
};

export default SplitPane;