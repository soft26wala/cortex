"use client";

import React, { useState } from "react";
import { Crown, Lock, ShieldCheck, ShieldAlert, Sparkles, X, Loader2, ArrowRight } from "lucide-react";

interface JeenuAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { id: string; name: string; email: string; role: string }, token: string) => void;
}

export default function JeenuAuthModal({ isOpen, onClose, onLoginSuccess }: JeenuAuthModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = async (e?: React.FormEvent, quickRole?: "SONI" | "ADMIN") => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload: any = {};
      if (quickRole) {
        payload.quickRole = quickRole;
      } else {
        if (!username.trim()) {
          setError("Please enter your username or email");
          setLoading(false);
          return;
        }
        payload.username = username.trim();
        payload.password = password;
      }

      const res = await fetch("/api/vlog/jeenusoni/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!json.success || !json.user) {
        throw new Error(json.error || "Authentication failed");
      }

      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("jeenu_token", json.token);
        localStorage.setItem("jeenu_user", JSON.stringify(json.user));
      }

      onLoginSuccess(json.user, json.token);
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#12070E] border border-rose-500/30 rounded-3xl max-w-md w-full overflow-hidden shadow-[0_0_60px_rgba(139,0,50,0.35)] text-white">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-950 via-[#8B0032] to-[#E8C39E] flex items-center justify-center text-white shadow-lg border border-rose-500/20">
              <Crown size={20} className="text-[#FCE7D4]" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">Jeenu Soni Control Console</h3>
              <p className="text-[11px] text-zinc-400">Strictly Restricted: ADMIN & SONI Roles Only</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-950/60 border border-rose-500/40 text-xs text-rose-300 flex items-center gap-2">
              <ShieldAlert size={16} className="text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick 1-Click Authorized Sign In Buttons */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider text-center">
              Quick Authorized Access
            </div>

            <button
              type="button"
              onClick={() => handleLogin(undefined, "SONI")}
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-950 via-[#8B0032] to-rose-900 hover:from-rose-900 hover:to-rose-800 text-[#FCE7D4] font-serif font-bold text-xs border border-rose-500/40 shadow-xl flex items-center justify-between group transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Crown size={16} className="text-[#E8C39E]" />
                <div className="text-left">
                  <div className="text-white text-xs font-bold">Sign In as Jeenu Soni</div>
                  <div className="text-[10px] text-rose-300 font-mono">Role: SONI (Full Vlog & Lookbook Access)</div>
                </div>
              </div>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-[#E8C39E]" />
            </button>

            <button
              type="button"
              onClick={() => handleLogin(undefined, "ADMIN")}
              disabled={loading}
              className="w-full py-3 px-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-serif font-semibold text-xs border border-white/15 flex items-center justify-between group transition-all cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={16} className="text-emerald-400" />
                <div className="text-left">
                  <div className="text-white text-xs font-bold">Sign In as Administrator</div>
                  <div className="text-[10px] text-zinc-400 font-mono">Role: ADMIN (Master System Admin)</div>
                </div>
              </div>
              <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform text-zinc-400" />
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="w-full border-t border-white/10" />
            <span className="bg-[#12070E] px-3 text-[11px] font-mono text-zinc-500 uppercase">
              Or Use Credentials
            </span>
          </div>

          {/* Standard Form */}
          <form onSubmit={(e) => handleLogin(e)} className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-zinc-300 block mb-1">Username or Email</label>
              <input
                type="text"
                placeholder="e.g. jeenusoni or admin@cortex.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-rose-400"
              />
            </div>

            <div>
              <label className="font-bold text-zinc-300 block mb-1">Password / PIN</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-black border border-white/10 text-white focus:outline-none focus:border-rose-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-rose-900 to-rose-950 hover:from-rose-800 hover:to-rose-900 text-[#FCE7D4] font-serif font-bold text-xs border border-rose-500/30 shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin text-[#E8C39E]" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <Lock size={14} className="text-[#E8C39E]" />
                  <span>Authenticate & Enter Console</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
