"use client";
import React, { useState, useEffect, useRef } from 'react';

export default function VoiceAIStudio() {
  const [transcript, setTranscript] = useState("");
  const [inputText, setInputText] = useState("");
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(0);
  const [isListening, setIsListening] = useState(false);
  const [speed, setSpeed] = useState(0.9);
  
  const recognitionRef = useRef<any>(null);

  // 1. Load Voices and Find Google Hindi
  useEffect(() => {
    const loadVoices = () => {
      let allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
      
      // Auto-select Google Hindi if available
      const gIndex = allVoices.findIndex(v => v.name.includes("Google हिन्दी") || v.lang === 'hi-IN');
      if (gIndex !== -1) setSelectedVoiceIndex(gIndex);
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();
  }, []);

  // 2. Speech to Text Logic
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return alert("Browser support nahi karta!");

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'hi-IN'; // Hindi recognition

    recognitionRef.current.onresult = (event: any) => {
      let text = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }
      setTranscript(text);
    };

    recognitionRef.current.start();
    setIsListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  // 3. Text to Speech & Download Logic
  const handleVoiceAction = (isDownload: boolean = false) => {
    if (!inputText) return alert("Niche wale box mein text likhein!");
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(inputText);
    utterance.voice = voices[selectedVoiceIndex];
    utterance.rate = speed;

    if (isDownload) {
      const audioCtx = new AudioContext();
      const dest = audioCtx.createMediaStreamDestination();
      const mediaRecorder = new MediaRecorder(dest.stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `voice_audio.mp3`;
        a.click();
      };

      mediaRecorder.start();
      window.speechSynthesis.speak(utterance);
      utterance.onend = () => {
        setTimeout(() => {
          mediaRecorder.stop();
          audioCtx.close();
        }, 500);
      };
    } else {
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto space-y-10">
        
        <header className="text-center">
          <h1 className="text-4xl font-black text-indigo-600 tracking-tight">AI HINDI STUDIO</h1>
          <p className="text-slate-500 mt-2 font-medium">Speech-to-Text & MP3 Voice Generator</p>
        </header>

        {/* BOX 1: SPEECH TO TEXT */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-indigo-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-indigo-700">
            <span className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
            Voice to Script (Bol kar likhein)
          </h2>
          <div className="w-full h-48 bg-slate-50 rounded-2xl p-4 border border-slate-200 overflow-y-auto mb-4 text-lg leading-relaxed">
            {transcript || <span className="text-slate-400 italic">Mic on karein aur bolna shuru karein...</span>}
          </div>
          <div className="flex gap-3">
            {!isListening ? (
              <button onClick={startListening} className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">🎤 Start Mic</button>
            ) : (
              <button onClick={stopListening} className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold animate-pulse">🛑 Stop Mic</button>
            )}
            <button 
              onClick={() => { navigator.clipboard.writeText(transcript); alert("Copied!"); }}
              className="px-8 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-black transition"
            >
              Copy Text
            </button>
          </div>
        </div>

        {/* BOX 2: TEXT TO SPEECH */}
        <div className="bg-white p-6 rounded-3xl shadow-xl border border-emerald-100">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-emerald-700">
            <span className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
            Script to Voice (MP3 Generator)
          </h2>
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Yahan script paste karein..."
            className="w-full h-40 bg-slate-50 rounded-2xl p-4 border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none mb-4 resize-none"
          />
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block">Voice Settings:</label>
              <select 
                value={selectedVoiceIndex}
                onChange={(e) => setSelectedVoiceIndex(parseInt(e.target.value))}
                className="w-full p-3 rounded-xl border bg-slate-50 text-sm outline-none focus:border-emerald-500"
              >
                {voices.map((v, i) => (
                  <option key={i} value={i}>
                    {v.name.includes("Google") ? "⭐ " : ""}{v.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block">Speed: {speed}x</label>
              <input type="range" min="0.5" max="1.5" step="0.1" value={speed} 
                     onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full accent-emerald-600" />
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={() => handleVoiceAction(false)} className="flex-1 bg-emerald-100 text-emerald-700 py-3 rounded-xl font-bold hover:bg-emerald-200 transition">▶️ Preview Voice</button>
            <button onClick={() => handleVoiceAction(true)} className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:shadow-lg transition">📥 Download MP3</button>
          </div>
        </div>

        <footer className="text-center text-slate-400 text-sm">
          Tip: Google Hindi voice ke liye Chrome browser use karein.
        </footer>
      </div>
    </div>
  );
}