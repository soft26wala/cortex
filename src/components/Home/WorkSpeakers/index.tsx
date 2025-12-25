"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Icon } from "@iconify/react";
import Callback from "@/components/Auth/Callback";
import HoverUnderline from "@/components/HoverUnderline";

type typeofCourse = {
  course_id: string;
  course_name: string;
  course_desc: string;
  course_price: number;
  course_image: string;
  total_price: string
};

const WorkSpeakers = ({ showTitle = true }) => {
  const [courses, setCourses] = useState<typeofCourse[]>([]);
  const [iscbUpOpen, setIsCbUpOpen] = useState(false);
  const callbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (callbackRef.current && !callbackRef.current.contains(event.target as Node)) {
        setIsCbUpOpen(false);
      }
    };
    if (iscbUpOpen) document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [iscbUpOpen]);

  useEffect(() => {
    axios
      .get("https://cortex-api-htc8.onrender.com/add-course/all")
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  const pathname = usePathname();

  return (
    <>
      <section className={`dark:bg-darkmode bg-orange-50 py-10 ${pathname === "/" ? "" : ""}`}>
        {showTitle && <h2 className="text-center pb-12 text-3xl font-bold">Courses Offered</h2>}

        {/* --- Responsive Container --- */}
        {/* Mobile: flex with horizontal scroll | Desktop: Grid layout */}
        <div className="flex overflow-x-auto pb-8 snap-x snap-mandatory gap-6 px-6 
                        md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 md:mx-7">

          {courses.slice(0, 9).map((course, index) => (
            <div
              key={course.course_id}
              className={`
                flex-none w-[85%] sm:w-[60%] snap-center  /* Mobile Slider Settings */
                md:w-full md:flex md:flex-col group overflow-hidden bg-white dark:bg-darklight rounded-xl shadow-lg
                ${index % 2 === 1 ? "lg:mt-20 mt-0" : ""}
              `}
            >
              {/* Image */}
              <div className="overflow-hidden aspect-video">
                <Image
                  src={course.course_image?.startsWith("http") ? course.course_image : `/${course.course_image}`}
                  alt={course.course_name}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5 flex-grow">
                {/* <h6 className="text-xl font-bold text-secondary dark:text-white mb-2 line-clamp-1">
                  {course.course_name}
                </h6> */}

                <HoverUnderline
                  text={course.course_name}
                  textColor="#f1c40f"
                  gradient="linear-gradient(to right, #f39c12, #e67e22)"
                  thickness="4px"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {course.course_desc}
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-primary dark:text-white">₹{course.course_price}</span>
                  <span className="text-xs text-gray-400 line-through">₹{course.total_price}</span>
                  <span className="text-xs text-green-600 font-bold bg-green-50 px-1.5 py-0.5 rounded">
                    {Math.round(((Number(course.total_price) - Number(course.course_price)) / Number(course.total_price)) * 100)}% OFF
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <Link href={`courses/${course.course_id}`} className="btn-primary-style py-2 text-center bg-secondary text-white rounded-md text-sm font-medium">
                    Enroll Now
                  </Link>
                  <button onClick={() => setIsCbUpOpen(true)} className="py-2 text-sm border border-secondary text-secondary rounded-md font-medium dark:border-white dark:text-white">
                    Know More
                  </button>
                </div>
              </div>
            </div>
            
          ))}
        </div>

        {/* Mobile Indicator (Optional) */}
        <div className="md:hidden text-center text-gray-400 text-xs mt-2 animate-pulse">
          ← Swipe to see more →
        </div>
      </section>

      {/* --- MODAL SECTION --- */}
      {iscbUpOpen && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div ref={callbackRef} className="relative w-full max-w-md bg-white dark:bg-darklight p-8 rounded-2xl shadow-2xl">
            <button onClick={() => setIsCbUpOpen(false)} className="absolute top-4 right-4 text-2xl text-gray-500 dark:text-white">
              <Icon icon="ic:round-close" />
            </button>
            <Callback signUpOpen={(value: boolean) => setIsCbUpOpen(value)} />
          </div>
        </div>
      )}
    </>
  );
};

export default WorkSpeakers;