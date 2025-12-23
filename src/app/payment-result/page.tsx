"use client";
import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Icon } from "@iconify/react";
import Link from "next/link";

const PaymentDetails = () => {
  const searchParams = useSearchParams();
  const status = searchParams.get("status"); 
  const tid = searchParams.get("tid");

  return (
    <div className="max-w-md w-full bg-gray-50 dark:bg-[#111] p-10 rounded-[2rem] border border-gray-200 dark:border-white/5 shadow-2xl text-center mt-16">
      {status === "SUCCESS" && (
        <>
          <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon icon="solar:check-circle-bold" className="text-5xl" />
          </div>
          <h1 className="text-3xl font-black dark:text-white mb-3 tracking-tight">Success!</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Paise mil gaye hain. Course ab aapke dashboard mein hai.
          </p>
        </>
      )}

      {status === "PENDING" && (
        <>
          <div className="w-20 h-20 bg-orange-500/10 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Icon icon="solar:clock-circle-bold" className="text-5xl" />
          </div>
          <h1 className="text-3xl font-black dark:text-white mb-3 tracking-tight">Processing...</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8 leading-relaxed">
            Bank se confirmation ka intezar hai.
          </p>
        </>
      )}

      <div className="bg-white dark:bg-white/5 rounded-2xl p-4 mb-8 text-left border dark:border-white/5">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-400">Transaction ID</span>
          <span className="dark:text-white font-mono">{tid || "N/A"}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Link href="/dashboard" className="bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-2xl font-bold transition-all">
          Go to Dashboard
        </Link>
        <Link href="/" className="text-gray-500 dark:text-gray-400 font-semibold hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default function PaymentResultClient() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center p-6">
      <Suspense fallback={<div className="text-white">Loading Payment Status...</div>}>
        <PaymentDetails />
      </Suspense>
    </div>
  );
}