"use client";
import React, { useEffect, useRef, useState } from 'react';
import { AlertTriangle, RefreshCcw, ShieldAlert, Mail } from 'lucide-react';
import Link from 'next/link';
import { Icon } from "@iconify/react";
import Callback from '@/components/Auth/Callback';

const RefundPolicy = () => {
  const [iscbUpOpen, setIsCbUpOpen] = useState(false);
    const callbackRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {


        // Close Callback Modal
        if (
            callbackRef.current &&
            !callbackRef.current.contains(event.target as Node)
        ) {
            setIsCbUpOpen(false);
        }

    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [iscbUpOpen]);

    // close popup on outside click
    const handleOutsideClick = (e: MouseEvent) => {
        if (callbackRef.current && !callbackRef.current.contains(e.target as Node)) {
            setIsCbUpOpen(false);
        }
    };

    useEffect(() => {
        if (iscbUpOpen) {
            document.addEventListener("mousedown", handleOutsideClick);
        }
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [iscbUpOpen]);


  return (
        <>

    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-40 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight">
            Cancellation & Refund Policy
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Last Updated: December 24, 2025</p>
          <div className="mt-4 flex justify-center">
            <div className="h-1.5 w-24 bg-red-500 rounded-full"></div>
          </div>
        </div>

        {/* Strict No-Refund Banner */}
        <div className="bg-red-50 dark:bg-red-900/10 border-2 border-red-200 dark:border-red-900/30 p-8 rounded-2xl mb-10 text-center shadow-sm">
          <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
            <ShieldAlert className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 mb-2">Strict No-Refund Policy</h2>
          <p className="text-red-700 dark:text-red-300 max-w-lg mx-auto leading-relaxed">
            Please read this policy carefully. By purchasing our services, you acknowledge that you have read and agreed to our <b>No Refund</b> terms.
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden transition-all">
          <div className="p-8 md:p-12 space-y-10">
            
            {/* Section 1: Policy Overview */}
            <section>
              <div className="flex items-center mb-4">
                <RefreshCcw className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Policy Overview</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed italic">
                &quot;We do not offer any refunds for the services or products once they are purchased or subscribed to. All sales are final.&quot;
              </p>
            </section>

            {/* Section 2: Detailed Terms */}
            <section className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Digital Services</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Since our services are digital/consultancy-based, once the service is initiated or access is granted, we cannot provide a refund.
                  </p>
                </div>

                <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cancellations</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    You may choose to stop using our services at any time, but no payments already made will be returned.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3: Legal Warning */}
            <section className="flex items-start bg-amber-50 dark:bg-amber-900/10 p-5 rounded-xl border-l-4 border-amber-500">
              <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-1" />
              <div className="ml-4">
                <h4 className="text-amber-800 dark:text-amber-400 font-bold">Important Notice</h4>
                <p className="text-sm text-amber-700 dark:text-amber-300 mt-1 leading-relaxed">
                  We encourage all users to check our demo, portfolio, or service details thoroughly before making a payment. If you have any doubts, please contact us <b>before</b> the transaction.
                </p>
              </div>
            </section>

            {/* Section 4: Contact */}
            <section className="pt-6 border-t border-gray-100 dark:border-gray-800">
              <div className="text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4 font-medium flex items-center justify-center">
                  <Mail className="h-5 w-5 mr-2 text-blue-500" />
                  Have questions before buying?
                </p>
                <Link 
                  href="#"
                  className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                >
                  <button
              onClick={() => {
                setIsCbUpOpen(true); // Open the callback modal
              }}
            >
                  Contact Support
                  </button>
                </Link>
              </div>
            </section>

          </div>
        </div>

        {/* Footer info */}
        <p className="text-center mt-8 text-sm text-gray-500 dark:text-gray-500">
          © 2025 CorteStack. All Rights Reserved.
        </p>
      </div>
    </div>

    {/* Request Callback Modal Rendering */}
        {iscbUpOpen && (
          <div
            ref={callbackRef}
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 !m-0"
          >
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg bg-white px-8 py-14 text-center dark:bg-darklight">
              <button
                onClick={() => setIsCbUpOpen(false)} 
                className=" hover:bg-gray-200 dark:hover:bg-gray-700 p-1 rounded-full absolute -top-5 -right-3 mr-8 mt-8"
                aria-label="Close Request Callback Modal"
              >
                <Icon icon="ic:round-close" className="text-2xl dark:text-white" />
              </button>
              {/* Assuming RequestCallback can take a prop to handle its closing */}
              
              <Callback signUpOpen={(value: boolean) => setIsCbUpOpen(value)} />
            </div>
          </div>
        )
        }
        </>
  );
};

export default RefundPolicy;