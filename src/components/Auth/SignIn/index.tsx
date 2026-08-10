"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import SocialSignIn from "../SocialSignIn";
import Logo from "@/components/Layout/Header/Logo";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import { Mail, Lock } from "lucide-react";

const BACKEND_API = process.env.NEXT_PUBLIC_API || "http://localhost:4000/";

const Signin = ({ signInOpen }: { signInOpen?: any }) => {
  const [loading, setLoading] = useState(false);
  const authDialog = useContext(AuthDialogContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Try local backend API first, fallback if unavailable
      let response = await fetch(`${BACKEND_API}user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).catch(() => null);

      if (!response || !response.ok) {
        response = await fetch(`https://cortex-api-htc8.onrender.com/user/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }).catch(() => null);
      }

      if (response && response.ok) {
        const result = await response.json();
        toast.success("Login Successful!");
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        authDialog?.setIsSuccessDialogOpen(true);
        if (signInOpen) signInOpen(false);

        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        const errJson = response ? await response.json().catch(() => ({})) : {};
        toast.error(errJson.message || "Invalid email or password");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-left space-y-5 bg-[#0B0B0F] text-white p-1">
      {/* Header Logo */}
      <div className="text-center pb-2">
        <div className="inline-block max-w-[150px]">
          <Logo />
        </div>
        <p className="text-xs text-zinc-400 mt-1">Sign in to your Cortex account</p>
      </div>

      {/* Social Sign In */}
      <SocialSignIn />

      {/* OR Separator */}
      <div className="relative my-4 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/[0.08]" />
        </div>
        <span className="relative px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest text-zinc-400 bg-[#0B0B0F] rounded-full border border-white/[0.08] inline-block">
          Or Continue With Email
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-[11px] font-bold text-zinc-300 block mb-1">Email Address</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="email"
              placeholder="name@company.com"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#14141F] border border-white/[0.08] text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#6C63FF]"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-zinc-300 block mb-1">Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="password"
              placeholder="••••••••"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#14141F] border border-white/[0.08] text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#6C63FF]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(108,99,255,0.3)] hover:shadow-[0_0_35px_rgba(0,212,255,0.5)] transition-all disabled:opacity-50 mt-2"
        >
          {loading ? <Loader /> : "Sign In to Account"}
        </button>
      </form>
    </div>
  );
};

export default Signin;