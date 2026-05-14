"use client";
import { memo, ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../lib/utils";

interface Props {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  speed?: number;
  initialDelay?: number;
  direction?: "left" | "right" | "bottom" | "top"; // Added "top"
}

export const TextGenerateEffect = memo(function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.4,
  speed = 0.03,
  initialDelay = 0,
  direction = "bottom",
}: Props) {
  const wordsArray = words.split(" ");
  const ref = useRef(null);
  
  // margin: "-10% 0px" ka matlab hai ki animation thoda pehle hi trigger ho jayega
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  // Movement Logic
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -30 : direction === "right" ? 30 : 0,
      y: direction === "bottom" ? 30 : direction === "top" ? -30 : 0,
      filter: filter ? "blur(10px)" : "none",
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: initialDelay + i * speed,
        duration: duration,
        ease: [0.21, 0.47, 0.32, 0.98], // Professional cubic-bezier for smooth entry
      },
    }),
  };

  return (
    <div className={cn("font-bold", className)} ref={ref}>
      <div className="mt-4">
        <div className="dark:text-white text-black">
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              custom={idx}
              variants={variants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="inline-block mr-[0.25em]"
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
});

// Content Wrapper for Sections
export const ContentGenerateEffect = memo(function ContentGenerateEffect({
  children,
  className,
  initialDelay = 0,
  direction = "bottom",
}: {
  children: ReactNode;
  className?: string;
  initialDelay?: number;
  direction?: "left" | "right" | "bottom" | "top";
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
      y: direction === "bottom" ? 40 : direction === "top" ? -40 : 0,
      scale: 0.95,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        delay: initialDelay,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
});