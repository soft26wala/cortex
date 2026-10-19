"use client";

import React, { useState } from "react";
import Logo from "@/components/Layout/Header/Logo";
import { Crown, Lock, Mail, ShieldCheck, ShieldAlert, Sparkles, X, Loader2, ArrowRight, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

interface JeenuAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { id: string; name: string; email: string; role: string }, token: string) => void;
}

const BACKEND_API = process.env.NEXT_PUBLIC_API || "http://localhost:4000/";

export default function JeenuAuthModal({ isOpen, onClose, onLoginSuccess }: JeenuAuthModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const emailTrimmed = formData.email.trim();
    const passwordTrimmed = formData.password;

    if (!emailTrimmed || !passwordTrimmed) {
      setError("Please enter your email and password");
      setLoading(false);
      return;
    }

    try {
      let resultUser: any = null;
      let resultToken: string = "";

      // 1. Primary: Use the / page login system (backend user/login API)
      let response = await fetch(`${BACKEND_API}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailTrimmed, password: passwordTrimmed }),
      }).catch(() => null);

      if (!response || !response.ok) {
        response = await fetch(`https://cortex-api-htc8.onrender.com/user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailTrimmed, password: passwordTrimmed }),
        }).catch(() => null);
      }

      if (response && response.ok) {
        const json = await response.json();
        resultUser = json.user;
        resultToken = json.token || "cortex_token_" + Date.now();
      } else {
        // Fallback: If external API gave error or invalid credentials, try internal route
        const localAuthRes = await fetch("/api/vlog/jeenusoni/auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: emailTrimmed, username: emailTrimmed, password: passwordTrimmed }),
        }).catch(() => null);

        if (localAuthRes && localAuthRes.ok) {
          const localJson = await localAuthRes.json();
          resultUser = localJson.user;
          resultToken = localJson.token;
        } else {
          const errData = response ? await response.json().catch(() => ({})) : {};
          throw new Error(errData.message || "Invalid email or password");
        }
      }

      if (!resultUser) {
        throw new Error("Login failed. No user details received.");
      }

      const roleUpper = (resultUser.role || "USER").toString().trim().toUpperCase();
      const isAuthorizedRole = ["ADMIN", "SONI", "SUPER ADMIN", "SUPERADMIN"].includes(roleUpper);

      // Save credentials in the EXACT same localStorage keys used by the / page
      if (typeof window !== "undefined") {
        localStorage.setItem("token", resultToken);
        localStorage.setItem("user", JSON.stringify(resultUser));
        localStorage.setItem("jeenu_token", resultToken);
        localStorage.setItem("jeenu_user", JSON.stringify(resultUser));
        document.cookie = `cortex_role=${roleUpper}; path=/; max-age=2592000`;
      }

      // Also ensure internal signed session cookie is created
      await fetch("/api/vlog/jeenusoni/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: roleUpper,
          email: resultUser.email,
          username: resultUser.name,
        }),
      }).catch(() => null);

      if (isAuthorizedRole) {
        toast.success(`Welcome back, ${resultUser.name || "Authorized User"}! (${roleUpper} Access Enabled)`);
        onLoginSuccess(
          {
            id: resultUser.id || resultUser._id || "usr_cortex",
            name: resultUser.name || "Authorized User",
            email: resultUser.email,
            role: roleUpper,
          },
          resultToken
        );
        onClose();
      } else {
        setError(
          `Logged in as ${resultUser.email}, but your role is '${resultUser.role || "USER"}'. Only ADMIN and SONI roles have access to upload pictures or edit this vlog.`
        );
        toast.error(`Role '${resultUser.role || "USER"}' does not have upload permissions. Must be ADMIN or SONI.`);
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#0B0B12] border border-rose-500/30 rounded-3xl max-w-md w-full overflow-hidden shadow-[0_0_60px_rgba(225,48,108,0.35)] text-white">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-950 via-[#8B0032] to-[#E8C39E] flex items-center justify-center text-white shadow-lg border border-rose-500/20">
              <Crown size={20} className="text-[#FCE7D4]" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">Cortex Account Sign In</h3>
              <p className="text-[11px] text-zinc-400">Strictly Restricted: ADMIN & SONI Roles Only</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-1.5 rounded-xl hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5">
          {/* Cortex Logo & Subtitle */}
          <div className="text-center pb-1">
            <div className="inline-block max-w-[140px]">
              <Logo />
            </div>
            <p className="text-[11px] text-zinc-400 mt-1">
              Sign in with your standard Cortex credentials used across the site
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-2xl bg-rose-950/70 border border-rose-500/40 text-xs text-rose-300 flex items-start gap-2.5">
              <ShieldAlert size={16} className="text-rose-400 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Standard Email & Password Form */}
          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#141422] border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-rose-400 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-zinc-300 block mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#141422] border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:border-rose-400 text-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-zinc-400 space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                <ShieldCheck size={13} className="text-[#E8C39E]" />
                <span>Authorized Roles Policy:</span>
              </div>
              <p>
                Only users registered in the DB with role <strong className="text-white">admin</strong> or{" "}
                <strong className="text-[#E8C39E]">soni</strong> can upload profile and gallery pictures.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-900 via-[#8B0032] to-rose-950 hover:from-rose-800 hover:to-rose-900 text-[#FCE7D4] font-serif font-bold text-xs border border-rose-500/40 shadow-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={15} className="animate-spin text-[#E8C39E]" />
                  <span>Signing in with Cortex credentials...</span>
                </>
              ) : (
                <>
                  <Lock size={14} className="text-[#E8C39E]" />
                  <span>Sign In to Account</span>
                  <ArrowRight size={14} className="text-[#E8C39E]" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
