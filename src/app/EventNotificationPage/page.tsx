"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Video, Users, Bell, ExternalLink } from "lucide-react";
import Callback from "@/components/Auth/Callback";
import { Icon } from "@iconify/react";
// Demo Data Structure
interface CompanyEvent {
  id: number;
  type: "Interview" | "Meeting" | "Event";
  title: string;

  location?: string;
  time: string;
  date: string;
  link: string;
}

const EventNotificationPage = () => {
  // Abhi ke liye 1 demo notification, baad mein ise DB se connect kar sakte hain
   const [iscbUpOpen, setIsCbUpOpen] = useState(false);
    const callbackRef = useRef<HTMLDivElement>(null);

  const [events, setEvents] = useState<CompanyEvent[]>([
    {
      id: 1,
      type: "Interview",
      title: "Back-End Developer Interview",
      location: "walk in interview at Office",
      date: "1 Jan 2026",
      time: "11:30 AM",
      link: "/interview/gurvinder-123",
    },
    {
      id: 2,
      type: "Interview",
      title: "Front-End Developer Interview",
      location: "walk in interview at Office",
      date: "1 Jan 2026",
      time: "11:30 AM",
      link: "/interview/gurvinder-123",
    },
    {
      id: 3,
      type: "Interview",
      title: "MERN Stack Interview",
      location: "walk in interview at Office",
      date: "1 Jan 2026",
      time: "11:30 AM",
      link: "/interview/gurvinder-123",
    }
  ]);


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
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-10 font-sans">

      {/* --- Header with 3D Glow (SEO Friendly) --- */}
      <header className="mb-10 text-center mt-20">
        <div className="relative inline-block preserve-3d">
          <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight animate-glow-soft">
            Company Events
          </h1>
        </div>
        <p className="text-gray-500 mt-2">Manage your interviews and upcoming meetings.</p>
      </header>

      {/* --- Notification List Container --- */}
      <div className="max-w-4xl space-y-4 container">
        <AnimatePresence>
          {events.length > 0 ? (
            events.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="relative overflow-hidden group bg-gradient-to-r from-white/[0.05] to-transparent border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-orange-500/30 shadow-xl"
              >
                {/* Left Side: Icon & Info */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-orange-600/20 text-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.2)]">
                    {event.type === "Interview" ? <Users size={24} /> : <Calendar size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] bg-orange-600 px-2 py-0.5 rounded-full font-bold tracking-widest uppercase">
                        {event.type}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Video size={12} /> Remote
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                      {event.title}
                    </h2>
                    <p className="text-gray-400 text-sm">
                      Location: <span className="text-gray-200 font-medium">{event.location}</span>
                    </p>
                  </div>
                </div>

                {/* Middle: Time & Date */}
                <div className="flex flex-col text-left md:text-right border-l border-white/10 md:pl-6">
                  <span className="text-sm font-bold text-white">{event.date}</span>
                  <span className="text-xs text-gray-500">{event.time}</span>
                </div>

                {/* Right Side: Action Button */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setIsCbUpOpen(true); // Open the callback modal
                    }}
                    className="flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded-xl transition-all shadow-lg active:scale-95"
                  >
                    Join Now <ExternalLink size={16} />
                  </button>


                </div>

                {/* Subtle side glow decoration */}
                <div className="absolute left-0 top-0 h-full w-1 bg-orange-600 shadow-[0_0_10px_orange]"></div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
              <Bell className="mx-auto text-gray-700 mb-4" size={48} />
              <p className="text-gray-500 font-medium">No pending interviews or events.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes glow-soft {
          0%, 100% { text-shadow: 0 0 10px rgba(255,255,255,0.2); color: #fff; }
          50% { text-shadow: 0 0 15px rgba(249,115,22,0.5); color: #f97316; }
        }
        .animate-glow-soft {
          animation: glow-soft 4s ease-in-out infinite;
        }
        .preserve-3d {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>


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



    </div>



  );
};

export default EventNotificationPage;