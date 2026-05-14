"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { TextGenerateEffect } from "./TextGenerateEffect";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shapeRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 10;
      const yPos = (clientY / innerHeight - 0.5) * 10;
      const rotateX = -yPos * 0.5;
      const rotateY = xPos * 0.5;

      shapeRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${
        xPos * 0.3
      }px, ${yPos * 0.3}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const shapeAnimationDelay = 0.6;

  return (
    <section className="relative flex items-center px-10 py-[100px] sm:py-[110px] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#222_0%,_#000_100%)]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <div className="inline-block border border-neutral-800 px-3 py-1 text-xs uppercase tracking-widest text-neutral-400">
                Premium Course
              </div>
            </motion.div>
            <h1>
              <TextGenerateEffect
                words="PRACTICAL"
                className="text-5xl md:text-7xl lg:text-8xl font-bold m-0 leading-tight tracking-tighter"
                duration={0.5}
                speed={0.2}
                initialDelay={0.2}
                direction="top"
              />
              <TextGenerateEffect
                words="TRADING"
                className="text-5xl md:text-7xl lg:text-8xl font-bold m-0 leading-tight tracking-tighter text-neutral-400"
                duration={0.5}
                speed={0.2}
                initialDelay={0.4}
                direction="top"
              />
              <TextGenerateEffect
                words="HUB"
                className="text-5xl md:text-7xl lg:text-8xl font-bold m-2 leading-tight tracking-tighter"
                duration={0.5}
                speed={0.2}
                initialDelay={0.6}
                direction="top"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-neutral-400 mb-8 max-w-md text-lg"
            >
              Learn trading with Gurvinder Singh & Jaskeert Singh the founder of sigma trading company who has over 7 years of experience in forex market expecially and having a forex stragedy based on retaillers psychology
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
             <Link href="/classroom">

              <button className="border border-white px-8 py-3 text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center">
                CLASSROOM
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              </Link>
             <Link href="/about-us">
              <button className="border border-neutral-800 px-8 py-3 text-sm uppercase tracking-widest text-neutral-400 hover:border-neutral-600 hover:text-white transition-colors">
                About Us
              </button></Link>
            </motion.div>
          </div>

          <div className="relative">
            <motion.div
              ref={shapeRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: shapeAnimationDelay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative transition-transform duration-200 ease-out"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                className="absolute -bottom-10 -right-10 w-2/3 h-2/3 border border-neutral-800 bg-neutral-950 z-[-1]"
                initial={{ opacity: 0, x: 10, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: shapeAnimationDelay,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                style={{ transform: "translateZ(-20px)" }}
              ></motion.div>

              <motion.div
                className="aspect-square relative overflow-hidden border border-neutral-800"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.9,
                  delay: shapeAnimationDelay + 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: shapeAnimationDelay + 0.2 }}
                ></motion.div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-3/4 h-3/4 relative"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: shapeAnimationDelay + 0.3 }}
                  >
                    {/* --- LIGHT ANIMATION ON ORIGINAL LINES --- */}
                    
                    {/* Top Line (Green Light) */}
                    <motion.div
                      className="absolute top-0 left-0 w-full h-1 bg-white overflow-hidden"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.4 }}
                    >
                      <motion.div 
                        animate={{ left: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 w-1/3 h-full bg-green-400 blur-sm"
                      />
                    </motion.div>

                    {/* Bottom Line (Red Light) */}
                    <motion.div
                      className="absolute bottom-0 right-0 w-full h-1 bg-white overflow-hidden"
                      initial={{ scaleX: 0, originX: 1 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.5 }}
                    >
                      <motion.div 
                        animate={{ right: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        className="absolute top-0 w-1/3 h-full bg-red-500 blur-sm"
                      />
                    </motion.div>

                    {/* Right Line (Blue Light) */}
                    <motion.div
                      className="absolute top-0 right-0 h-full w-1 bg-white overflow-hidden"
                      initial={{ scaleY: 0, originY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.6 }}
                    >
                      <motion.div 
                        animate={{ top: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                        className="absolute left-0 w-full h-1/3 bg-blue-500 blur-sm"
                      />
                    </motion.div>

                    {/* Left Line (Pink Light) */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-full w-1 bg-white overflow-hidden"
                      initial={{ scaleY: 0, originY: 1 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.7 }}
                    >
                      <motion.div 
                        animate={{ bottom: ["-100%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1.5 }}
                        className="absolute left-0 w-full h-1/3 bg-pink-500 blur-sm"
                      />
                    </motion.div>

                    {/* Original Center Content remains untouched */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-neutral-300 flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: shapeAnimationDelay + 0.8,
                        type: "spring",
                        stiffness: 100,
                        damping: 15,
                      }}
                    >
                      <motion.div
                        className="w-3/4 h-3/4 bg-neutral-500 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: shapeAnimationDelay + 0.9 }}
                      >
                        <motion.div
                          className="w-1/2 h-1/2 bg-white"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: shapeAnimationDelay + 1.0,
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                          }}
                        > 
                          <Image src="/favicon.ico" alt="Logo" width={100} height={100} /> 
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll/Discover section remains untouched */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <div className="flex items-center gap-8 border border-neutral-800 px-8 py-4">
            <div className="text-xs uppercase tracking-widest text-neutral-400">
              Scroll
            </div>
            <div className="h-px w-10 bg-neutral-800"></div>
            <div className="text-xs uppercase tracking-widest text-neutral-400">
              Discover
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}