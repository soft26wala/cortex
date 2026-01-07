"use client"; // 1. Added this to allow hooks

import HeroSub from "@/components/SharedComponent/HeroSub";
import React, { useEffect, useState } from "react";
import SplitPane from "@/app/api/SplitPane";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // 2. Fixed import
import Image from "next/image";

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
                    params: { user_id: userId },
                });

                const payload = res.data;
                // Backend shape: { success: true, user, data }
                const courseList = payload?.data ?? (Array.isArray(payload) ? payload : []);
                setCourses(courseList);
                console.log('fetched courses:', courseList);
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
            <h1>Your Courses</h1>
            {courses.map((course: any) => (
                <React.Fragment key={course.id || course.course_name}>
                    {/* --- Course List Container --- */}
<div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8 text-dark dark:text-white">Your Courses</h1>
    
    <div className="grid gap-6">
        {courses.map((course: any) => (
            <div 
                key={course.id || course.course_name} 
                className="flex flex-col md:flex-row items-center bg-white dark:bg-darklight border border-border dark:border-dark_border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
                {/* 1. Image Section */}
                <div className="w-full md:w-1/4 relative h-48 md:h-40">
                    <Image
                        src={course.course_image?.startsWith("http") ? course.course_image : `/${course.course_image}`}
                        alt={course.course_name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* 2. Content Section */}
                <div className="flex-1 p-6 flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-dark dark:text-white mb-2">{course.course_name}</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 max-w-md">
                            {course.course_desc}
                        </p>
                    </div>

                    {/* 3. Time & Action Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0">
                        {/* Time Slot */}
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-dark px-4 py-2 rounded-full border border-border dark:border-dark_border">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-semibold text-dark dark:text-white">
                                04:00 PM - 05:00 PM
                            </span>
                        </div>

                        {/* Join Button */}
                        <button className="w-full sm:w-auto bg-primary hover:bg-darkprimary text-white font-bold py-2 px-8 rounded-lg transition-colors duration-300">
                            Join Now
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
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