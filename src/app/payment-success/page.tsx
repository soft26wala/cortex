"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] flex items-center justify-center p-5">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-500/10 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon icon="solar:check-circle-bold" className="text-5xl" />
        </div>
        <h1 className="text-3xl font-bold dark:text-white mb-2">Payment Successful!</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Mubarak ho! Aapne course mein successfully enroll kar liya hai.
        </p>
        <Link 
          href="/dashboard" 
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold transition-all inline-block"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;