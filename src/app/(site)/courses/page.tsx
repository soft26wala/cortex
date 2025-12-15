import Testimonials from "@/components/Home/Testimonials";
import WorkSpeakers from "@/components/Home/WorkSpeakers";
import HeroSub from "@/components/SharedComponent/HeroSub";
import React from "react";

import { Metadata } from "next";
import AboutTum from "@/components/Home/AboutTum";

export const metadata: Metadata = {
  title: "courses | Cortex Web Solutions",
};

const page = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/courses", text: "Courses" },
      ];
  return (
    <>
      
      <HeroSub
        title="Learn Coding with Industry Experts"
        description="Hands-on courses designed to make you job-ready with real projects and modern technologies."
        breadcrumbLinks={breadcrumbLinks}
      />
      <WorkSpeakers showTitle={true} />
      <Testimonials/>
      <AboutTum />
     
    </>
  );
};

export default page;
