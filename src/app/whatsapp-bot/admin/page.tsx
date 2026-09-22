"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WhatsAppAdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/whatsapp-bot/dashboard");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white font-sans">
      <div className="text-center space-y-3">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-400">Redirecting to WhatsApp Production Studio...</p>
      </div>
    </div>
  );
}
