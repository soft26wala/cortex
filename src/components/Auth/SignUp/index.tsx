"use client";

import React, { useState, useRef, useContext } from "react";
import Link from "next/link";
import SocialSignUp from "../SocialSignUp";
import Logo from "@/components/Layout/Header/Logo";
import Loader from "@/components/Common/Loader";
import toast from "react-hot-toast";
import AuthDialogContext from "@/app/context/AuthDialogContext";
import { Camera, Sparkles, User, Mail, Lock } from "lucide-react";

const BACKEND_API = process.env.NEXT_PUBLIC_API || "http://localhost:4000/";

const SignUp = ({ signUpOpen }: { signUpOpen?: any }) => {
  const [loading, setLoading] = useState(false);
  const authDialog = useContext(AuthDialogContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    Confirm_password: "",
  });

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.Confirm_password) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      if (avatarFile) {
        data.append("photo", avatarFile);
      }

      const response = await fetch(`${BACKEND_API}user/signup-manual`, {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Account Created Successfully!");
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        authDialog?.setIsUserRegistered(true);
        if (signUpOpen) signUpOpen(false);

        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        toast.error(result.message || "Signup failed");
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
        <p className="text-xs text-zinc-400 mt-1">Create your Cortex account</p>
      </div>

      {/* Social Sign Up */}
      <SocialSignUp />

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
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="text-[11px] font-bold text-zinc-300 block mb-1">Full Name</label>
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="e.g. Anmol Singh"
              name="name"
              onChange={handleChange}
              value={formData.name}
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#14141F] border border-white/[0.08] text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#6C63FF]"
            />
          </div>
        </div>

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
              required
              autoComplete="new-password"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#14141F] border border-white/[0.08] text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#6C63FF]"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-bold text-zinc-300 block mb-1">Confirm Password</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="password"
              placeholder="••••••••"
              name="Confirm_password"
              value={formData.Confirm_password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#14141F] border border-white/[0.08] text-white text-xs placeholder:text-zinc-500 focus:outline-none focus:border-[#6C63FF]"
            />
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="pt-2 flex items-center gap-4">
          <div
            className="relative w-14 h-14 rounded-2xl bg-[#14141F] border border-dashed border-white/20 flex items-center justify-center cursor-pointer group overflow-hidden flex-shrink-0"
            onClick={() => fileInputRef.current?.click()}
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <Camera size={20} className="text-zinc-400 group-hover:text-[#00D4FF] transition-colors" />
            )}
          </div>
          <div>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-bold text-white hover:text-[#00D4FF] cursor-pointer"
            >
              {avatarPreview ? "Change Profile Photo" : "Upload Profile Photo (Optional)"}
            </div>
            <div className="text-[10px] text-zinc-500">JPG, PNG up to 5MB</div>
          </div>
          <input
            type="file"
            name="avatar"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(108,99,255,0.3)] hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all disabled:opacity-50 mt-4"
        >
          {loading ? <Loader /> : "Create Free Account"}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
