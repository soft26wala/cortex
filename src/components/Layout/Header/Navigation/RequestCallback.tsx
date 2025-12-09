"use client";

import { useState, useEffect, useRef, useContext } from "react";
import { Icon } from "@iconify/react";
import Callback from "@/components/Auth/Callback";



function RequestCallback() {
   const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const signUpRef = useRef<HTMLDivElement>(null);


  // close popup on outside click
  const handleOutsideClick = (e: MouseEvent) => {
    if (signUpRef.current && !signUpRef.current.contains(e.target as Node)) {
      setIsSignUpOpen(false);
    }
  };

  useEffect(() => {
    if (isSignUpOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isSignUpOpen]);

  return (
    <>
      {/* HEADER */}

        <button
          onClick={() => setIsSignUpOpen(true)}
          className="px-4 py-2 rounded-lg"
        >
          RequestCallback
        </button>
     

      {/* Callback POPUP */}
      {isSignUpOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            ref={signUpRef}
            className="relative mx-auto w-full max-w-md bg-white dark:bg-darklight p-10 rounded-lg shadow-lg"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSignUpOpen(false)}
              className="absolute -top-0 -right-0  p-2 rounded-full shadow hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              <Icon icon="ic:round-close" className="text-2xl dark:text-white" />
            </button>

            {/* Your Callback Component */}
            <Callback signUpOpen={(value: boolean) => setIsSignUpOpen(value)} />
          </div>
        </div>
      )}
    </>
  );
};


export default RequestCallback
