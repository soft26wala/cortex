import Testimonials from "@/components/Home/Testimonials";
import TicketSection from "@/components/Home/TicketSection";
import HeroSub from "@/components/SharedComponent/HeroSub";
import React, { useEffect, useState } from "react";
import { Metadata } from "next";
import SplitPane from "@/app/api/SplitPane";
import axios from "axios";
export const metadata: Metadata = {
  title: "Classroom | Cortex Web Solutions",
  description: "Classroom sessions and speaker-led workshops from Cortex Web Solutions to upskill learners and professionals.",
};

const page = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/classroom", text: "classroom" },
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await axios.get('https://cortex-api-htc8.onrender.com/classroom')
      const data = await res.data;
      setCourses(data);
    }
    fetchCourses();
  })

  return (
    <>
      <HeroSub
        title="Welcome to the Classroom"
        description="Interactive sessions and workshops led by industry experts to enhance your skills."
        breadcrumbLinks={breadcrumbLinks}
      />
      {
        courses.map((course: any) => {
          return(
            <>
          <h1>{course.course_title}</h1>
          <h2>{course.course_description}</h2>
            </>
          )

        })
      }
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
