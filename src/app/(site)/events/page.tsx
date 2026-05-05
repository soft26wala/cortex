import BoxSlider from "@/components/SharedComponent/BoxSlider";
import HeroSub from "@/components/SharedComponent/HeroSub";
import React from "react";
import '@/Style/style.css'
import Schedules from "@/components/Home/Schedules";
import TicketSection from "@/components/Home/TicketSection";
import Testimonials from "@/components/Home/Testimonials";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Events | Cortex Web Solutions",
  description: "Upcoming events, schedules and meetups hosted by Cortex Web Solutions.",
};

const page = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/events", text: "Events" },
  ];
  return (
    <>
      <HeroSub
        title="Business Growth System 🚀"
        description="See how we generate leads, automate customers, and grow your business using smart digital solutions."
        breadcrumbLinks={breadcrumbLinks}
      />
      <section className="dark:bg-darkmode bg-orange-50 ">
        <div className="container upcoming">
          <BoxSlider />
          <Schedules />
        </div>
        
      </section>
      <div>
        
        <Testimonials />
        <TicketSection />
      </div>
    </>
  );
};

export default page;
