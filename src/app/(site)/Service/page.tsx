import React from "react";
import '@/Style/style.css'
import TicketSection from "@/components/Home/TicketSection";
import Testimonials from "@/components/Home/Testimonials";
import { Metadata } from "next";
import ServiceText from "@/components/Home/ServiceText";


export const metadata: Metadata = {
  title: "Service | Cortex Web Solutions",
  description: "Cortex Web Solutions — our services include web development, training, and digital transformation for businesses.",
};

const page = () => {
  
  return (
    <>
      
      <section className="dark:bg-darkmode">  
        <div className="container upcoming">
          <ServiceText />        
        </div>
      </section>      
      <div>
        <Testimonials />
        <TicketSection/>
      </div>
    </>
  );
};

export default page;
