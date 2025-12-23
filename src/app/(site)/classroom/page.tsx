import Testimonials from "@/components/Home/Testimonials";
import TicketSection from "@/components/Home/TicketSection";
import HeroSub from "@/components/SharedComponent/HeroSub";
import React from "react";
import { Metadata } from "next";
import SplitPane from "@/app/api/SplitPane";
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
        title="Welcome to the Classroom"
        description="Interactive sessions and workshops led by industry experts to enhance your skills."
        breadcrumbLinks={breadcrumbLinks}
      />
      <SplitPane 
        leftText="WELCOME TO THE DARK SIDE"
        rightText="HELLO FROM THE LIGHT SIDE"
        leftButtonLabel="JOIN CLASSROOM"
        rightButtonLabel="EXIT CLASSROOM"
      />
     
    </>
  );
};

export default page;
