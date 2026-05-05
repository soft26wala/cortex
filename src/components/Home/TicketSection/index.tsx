"use client";
import React, { useEffect, useState } from "react";

const BotChat = () => {
  const messages = [
    "I want website 💻",
    "I want AI Bot 🤖",
    "I want Meta Ads 📈",
  ];

  const [step, setStep] = useState(0);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    let currentText = messages[step];
    let index = 0;

    const typing = setInterval(() => {
      setTypedText(currentText.slice(0, index + 1));
      index++;

      if (index === currentText.length) {
        clearInterval(typing);

        // next message after delay
        setTimeout(() => {
          setStep((prev) => (prev + 1) % messages.length);
          setTypedText("");
        }, 1500);
      }
    }, 50);

    return () => clearInterval(typing);
  }, [step]);

  return (
    <div className="mt-16 max-w-md mx-auto bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-lg">

      <div className="text-green-400 text-sm mb-2">AI BOT</div>

      <div className="space-y-3">

        {/* BOT MESSAGE */}
        <div className="bg-white/10 p-3 rounded-lg w-fit">
          Hi 👋 How can I help?
        </div>

        {/* USER TYPING */}
        <div className="bg-blue-500 p-3 rounded-lg w-fit ml-auto min-w-[120px]">
          {typedText}
          <span className="animate-pulse">|</span>
        </div>

        {/* BOT REPLY */}
        {typedText.length === messages[step]?.length && (
          <div className="bg-white/10 p-3 rounded-lg w-fit animate-fadeIn">
            Great! Let’s grow your business 🚀
          </div>
        )}

      </div>
    </div>
  );
};

export default BotChat;