"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const PaymentFailed = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center p-5">
      <div className="text-center">
        <div className="w-20 h-20 bg-red-100 dark:bg-red-500/10 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon icon="solar:close-circle-bold" className="text-5xl" />
        </div>
        <h1 className="text-3xl font-bold dark:text-white mb-2">Payment Failed</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Oops! Payment poori nahi ho saki. Kripya dobara koshish karein.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/" 
            className="border border-gray-300 dark:border-white/10 dark:text-white px-8 py-3 rounded-xl font-bold"
          >
            Go Home
          </Link>
          <Link 
            href="/courses" 
            className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            Try Again
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;