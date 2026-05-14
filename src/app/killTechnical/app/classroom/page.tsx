"use client"

import { motion } from "framer-motion"
import { Play, Activity, Zap, TrendingUp, BarChart3, ArrowUpRight } from "lucide-react"
import { useEffect, useRef } from "react"
import { initCandleCanvas } from "../../lib/candleCanvas" // Import the canvas function

export default function Classroom() {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize the canvas when the component mounts
    const cleanupCanvas = initCandleCanvas('candleCanvas');
    return () => {
      // Clean up the canvas when the component unmounts
      cleanupCanvas();
    };
  }, []);

  const purchasedCourses = [
    {
      id: 1,
      title: "FOREX OPERATOR MINDSET",
      progress: 75,
      color: "#22c55e", // Bullish Green
      status: "MARKET ACTIVE",
      price_action: "+2.45%"
    },
    {
      id: 2,
      title: "INDIAN MARKET MASTERY",
      progress: 40,
      color: "#ef4444", // Bearish Red
      status: "VOLATILE",
      price_action: "-1.12%"
    },
  ]

  return (
    <section className="min-h-screen bg-[#000] py-20 relative overflow-hidden text-white font-sans">
      
      {/* --- DYNAMIC CANDLE CANVAS BACKGROUND --- */}
      <canvas id="candleCanvas" ref={canvasRef} className="absolute inset-0 z-0 opacity-10"></canvas>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* --- TERMINAL HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3 text-blue-500 mb-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              <span className="text-[10px] font-black tracking-[0.5em] uppercase">SYSTEM LIVE: SIGMA TARDERs</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter italic">
              CLASS<span className="text-white/10 not-italic">ROOM</span>
            </h1>
          </motion.div>
          
          <div className="p-4 bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="flex gap-8">
              <div>
                <p className="text-[8px] text-white/40 tracking-widest uppercase mb-1">Total Assets</p>
                <p className="text-xl font-bold font-mono">02 COURSES</p>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div>
                <p className="text-[8px] text-white/40 tracking-widest uppercase mb-1">Avg. Progress</p>
                <p className="text-xl font-bold font-mono text-green-500">60%</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- CARDS GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {purchasedCourses.map((course) => (
            <div key={course.id} className="relative bg-[#050505] border border-white/10 group overflow-hidden">
              
              {/* Top Moving Energy Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] overflow-hidden">
                <motion.div 
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_#3b82f6]"
                />
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-10">
                  <h3 className="text-3xl font-black tracking-tighter group-hover:text-blue-400 transition-colors">{course.title}</h3>
                  <BarChart3 className="text-white/10" />
                </div>

                {/* --- PROGRESS WITH GLOWING BARS --- */}
                <div className="mb-10">
                  <div className="flex justify-between text-[10px] font-black tracking-widest text-white/40 mb-3">
                    <span>DATA STREAM</span>
                    <span style={{ color: course.color }}>{course.progress}%</span>
                  </div>
                  
                  {/* Progress Bar with Blinking Segments */}
                  <div className="h-12 w-full bg-black border border-white/5 flex items-center px-1 overflow-hidden relative">
                    {Array.from({ length: 40 }).map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0.2 }}
                        animate={{ opacity: [0.2, 0.8, 0.2] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1, repeatDelay: 1 }}
                        className="w-[4px] h-full bg-white/10 rounded-sm mx-[1px]"
                      />
                    ))}
                    
                    {/* Active Progress Overlay */}
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${course.progress}%` }}
                      transition={{ duration: 2 }}
                      className="absolute inset-y-0 left-0 flex items-center px-1 overflow-hidden"
                    >
                      {Array.from({ length: 40 }).map((_, i) => (
                        <motion.div 
                          key={i}
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.05 }}
                          className="w-[4px] h-full shadow-[0_0_10px] rounded-sm mx-[1px]"
                          style={{ backgroundColor: course.color, boxShadow: `0 0 10px ${course.color}` }} 
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>

                {/* --- EXECUTE BUTTON --- */}
                <button className="w-full relative py-5 bg-transparent border-2 border-white group/btn transition-all duration-500 hover:bg-white overflow-hidden">
                  {/* Bulb Glow inside button */}
                  <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover/btn:opacity-20 blur-xl transition-opacity" />
                  
                  <span className="relative z-10 text-white group-hover/btn:text-black font-black text-xs tracking-[0.4em] flex items-center justify-center gap-3">
                    <Play className="w-4 h-4 fill-current" /> ACCESS COURSE TERMINAL
                  </span>
                </button>
              </div>

              {/* Background "Bulb" for the card */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 blur-[80px] opacity-10 rounded-full" style={{ backgroundColor: course.color }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}