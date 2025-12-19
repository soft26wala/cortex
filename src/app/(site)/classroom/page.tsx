import Testimonials from "@/components/Home/Testimonials";
import TicketSection from "@/components/Home/TicketSection";
import WorkSpeakers from "@/components/Home/WorkSpeakers";
import HeroSub from "@/components/SharedComponent/HeroSub";
import React from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Classroom | Cortex Web Solutions",
  description: "Classroom sessions and speaker-led workshops from Cortex Web Solutions to upskill learners and professionals.",
};

const page = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/classroom", text: "classroom" },
      ];
  return (
    <>
      <HeroSub
        title="Our Visionary Speakers"
        description="Discover a wealth of insightful materials meticulously crafted to provide you with a comprehensive."
        breadcrumbLinks={breadcrumbLinks}
      />
      <WorkSpeakers showTitle={false} />
      <Testimonials/>
      <TicketSection/>
    </>
  );
};

export default page;
