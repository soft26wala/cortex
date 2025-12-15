import WorkSpeakers from "@/components/Home/WorkSpeakers";
import React from "react";
import { Metadata } from "next";
import Aboutcom from "@/components/SharedComponent/Aboutcom";
import Aboutimg from "@/components/SharedComponent/Aboutimg";
import AboutTum from "@/components/Home/AboutTum";
import Testimonials from "@/components/Home/Testimonials";

export const metadata: Metadata = {
  title: " About-us | Cortex Web Solutions",
};

const page = () => {
    const breadcrumbLinks = [
        { href: "/", text: "Home" },
        { href: "/about_us", text: "About-us" },
      ];
  return (
    <>
      <Aboutcom
        title="🧠 The Story of Cortex Web Solutions"
        description="
"
        breadcrumbLinks={breadcrumbLinks}
      /> <br />
<div className="container">
        <h3>Every great brand starts with a core idea. For us, that idea is encapsulated in the very name we chose: Cortex.
The human cerebral cortex is the engine of innovation—the place where complex thought, problem-solving, and vision are born. It's the highest level of processing. We didn't choose the name by accident; we chose it as a pledge to our clients.</h3><br />
<p><h2>Our Mission: </h2>Thinking Deeper
In a digital landscape filled with surface-level solutions, our mission is to bring Cortex-level thinking to your business challenges. We don't just build websites or launch campaigns; we analyze the core of your operation, understand your user psychology, and architect a digital structure designed for sustained growth.</p>
We are not merely vendors; we are the digital architects who transform your ideas from concept into functional, scalable, and beautiful reality.
<p><h2>Our Promise:</h2> Innovation, Engineered
We believe that technology should be a multiplier, not a hurdle. Our expertise spans the most critical areas of digital success.</p>
<p><h2>Intelligent Web Architecture: </h2>Creating platforms that are fast, secure, and ready for tomorrow's technology.</p>
<p><h2>Intuitive User Experience (UX):</h2> Designing interfaces that delight users and drive conversion.</p>
<p><h2>Strategic Digital Growth: </h2>Implementing solutions that directly impact your bottom line.</p>
<p>At Cortex Web Solutions, we see beyond the code and into the business potential. We are dedicated to delivering solutions that aren't just good, but brilliant. We invite you to experience the difference that deep, intelligent digital partnership can make.
<br /> <br /><h1>This is Cortex. This is where your potential is fully realized.</h1></p></div>
      <WorkSpeakers showTitle={false} />
      <AboutTum />
      <Testimonials />
      
    </>
  );
};

export default page;
