"use client"; // 1. Added this to allow hooks

import HeroSub from "@/components/SharedComponent/HeroSub";
import React, { useEffect, useState } from "react";
import SplitPane from "@/app/api/SplitPane";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // 2. Fixed import

const ClassroomPage = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [manualUser, setManualUser] = useState<any>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (user) {
      setManualUser(JSON.parse(user));
    }
  }, []);

  const isLoggedIn = status === "authenticated" || !!manualUser;

  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/classroom", text: "classroom" },
  ];

  useEffect(() => {
    // Only fetch if session status is determined
    if (status === "loading") return;

    const fetchCourses = async () => {
      if (!isLoggedIn) {
        alert("Please log in to proceed with the purchase.");
        return router.push("/");
      }

      try {
        const userId = manualUser ? manualUser.id : session?.user?.email;
        const res = await axios.get('https://cortex-api-htc8.onrender.com/classroom', { 
          params: { user_id: userId } 
        });
        setCourses(res.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [isLoggedIn, status, manualUser, session, router]); // 3. Added dependencies

  return (
    <>
      <HeroSub
        title="Welcome to the Classroom"
        description="Interactive sessions and workshops led by industry experts to enhance your skills."
        breadcrumbLinks={breadcrumbLinks}
      />
      {courses.map((course: any) => (
        <React.Fragment key={course.id || course.course_title}>
          <h1>{course.course_title}</h1>
          <h2>{course.course_description}</h2>
        </React.Fragment>
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

export default ClassroomPage;