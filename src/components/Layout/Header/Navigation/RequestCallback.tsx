"use client";

import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import { Icon } from "@iconify/react";
import Callback from "@/components/Auth/Callback";

interface RequestCallbackProps {
  // यह Header.tsx से मोडल को नियंत्रित करने के लिए है
  setIsCbUpOpen: Dispatch<SetStateAction<boolean>>;
}

function RequestCallback({ setIsCbUpOpen }: RequestCallbackProps) {
  // मोबाइल के अंदर का अपना मोडल स्टेट
  const [isInternalOpen, setIsInternalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // मोडल के बाहर क्लिक करने पर बंद करना
  const handleOutsideClick = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsInternalOpen(false);
    }
  };

  useEffect(() => {
    if (isInternalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isInternalOpen]);

  return (
    <div className="lg:hidden w-full"> {/* lg:hidden सुनिश्चित करता है कि यह PC पर न दिखे */}
      
      {/* मोबाइल बटन जो मेनू के अंदर दिखेगा */}
      <button
        onClick={() => setIsInternalOpen(true)}
        className="flex w-full items-center justify-between py-2 text-black dark:text-white focus:outline-none"
      >
        Request Callback
        <Icon icon="solar:phone-calling-linear" className="text-xl text-primary" />
      </button>

      {/* मोबाइल स्पेसिफिक पॉपअप */}
      {isInternalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[999] flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="relative w-full max-w-sm bg-white dark:bg-darklight p-6 rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-300"
          >
            {/* क्लोज बटन */}
            <button
              onClick={() => setIsInternalOpen(false)}
              className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200"
            >
              <Icon icon="ic:round-close" className="text-xl dark:text-white" />
            </button>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-dark dark:text-white">Request a Callback</h3>
              <p className="text-sm text-body-color mt-1">Fill the form below and we will call you back.</p>
            </div>

            {/* --- Form & API Logic --- */}
            {/* यहां Callback कंपोनेंट आपकी API और Form को हैंडल करता है। 
              signUpOpen प्रॉप में हम अपना स्टेट भेज रहे हैं ताकि 
              सक्सेसफुल सबमिशन के बाद फॉर्म अपने आप बंद हो जाए।
            */}
            <Callback 
              signUpOpen={(value: boolean) => {
                setIsInternalOpen(value); // API सक्सेस होने पर फॉर्म बंद कर देगा
                setIsCbUpOpen(value);     // Header के स्टेट को भी सिंक करेगा
              }}  
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default RequestCallback;