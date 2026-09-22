import InteractiveAcademyStudio from "@/components/Academy/InteractiveAcademyStudio";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Interactive Coding Academy | 0 to Advanced Tutorials & Sandbox",
  description: "Learn HTML, CSS, JavaScript, React, Next.js, Python, C++, Node.js & SQL from 0 to Advanced with interactive code editor and Hindi/English/Hinglish explanation options.",
};

const page = () => {
  return (
    <>
      <InteractiveAcademyStudio />
    </>
  );
};

export default page;

