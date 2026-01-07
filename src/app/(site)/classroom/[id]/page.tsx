import Testimonials from "@/components/Home/Testimonials";
import TicketSection from "@/components/Home/TicketSection";
import HeroSub from "@/components/SharedComponent/HeroSub";
import React, { useEffect, useState } from "react";
import { Metadata } from "next";
import SplitPane from "@/app/api/SplitPane";
import axios from "axios";
import { useParams } from "next/navigation";
export const metadata: Metadata = {
  title: "Classroom | Cortex Web Solutions",
  description: "Classroom sessions and speaker-led workshops from Cortex Web Solutions to upskill learners and professionals.",
};

type Props = {
  params: { id: string };
};

const Page = async ({ params }: Props) => {
  const { id } = params;

  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/classroom", text: "classroom" },
  ];

  let courses: any[] = [];
  try {
    const res = await axios.get(`https://cortex-api-htc8.onrender.com/classroom/${id}`);
    courses = res.data ?? [];
  } catch (err) {
    console.error("Error fetching classroom courses:", err);
  }

  return (
    <>
      <HeroSub
        title="Welcome to the Classroom"
        description="Interactive sessions and workshops led by industry experts to enhance your skills."
        breadcrumbLinks={breadcrumbLinks}
      />
      {courses.map((course: any, idx: number) => (
        <section key={course.id ?? idx} className="py-6">
          <h1 className="text-2xl font-bold">{course.course_title}</h1>
          <p className="mt-2 text-gray-600">{course.course_description}</p>
        </section>
      ))}

      <SplitPane
        leftText="WELCOME TO THE DARK SIDE"
        rightText="HELLO FROM THE LIGHT SIDE"
        leftButtonLabel="JOIN CLASSROOM"
        rightButtonLabel="EXIT CLASSROOM"
      />
    </>
  );
};

export default Page;
