"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { Icon } from "@iconify/react";
import Callback from "@/components/Auth/Callback";

// ... (typeofCourse interface)
type typeofCourse = {
  course_id: string;
  course_name: string;
  course_desc: string;
  course_price: number;
  course_image: string;
  total_price: string
};

const WorkSpeakers = ({ showTitle = true }) => {
  const [courses, setCourses] = useState<typeofCourse[]>([
    {course_id: "555",
    course_name: "mern",
    course_desc: "lkdjf jflk jdfkjsdf",  
    course_price: 232,
    course_image: "kldlksd.png",
    total_price: "666"}
  ]);
  const [iscbUpOpen, setIsCbUpOpen] = useState(false);
  const callbackRef = useRef<HTMLDivElement>(null);


  const handleClickOutside = (event: MouseEvent) => {


    // Close Callback Modal
    if (
      callbackRef.current &&
      !callbackRef.current.contains(event.target as Node)
    ) {
      setIsCbUpOpen(false);
    }

  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [iscbUpOpen]);

  // close popup on outside click
  const handleOutsideClick = (e: MouseEvent) => {
    if (callbackRef.current && !callbackRef.current.contains(e.target as Node)) {
      setIsCbUpOpen(false);
    }
  };

  useEffect(() => {
    if (iscbUpOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
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
      <section className={`dark:bg-darkmode ${pathname === "/" ? "" : ""}`}>
        {showTitle && <h2 className="text-center pb-12">Courses Offered</h2>}
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-stretch gap-8 mx-7">
          {courses.map((course, index) => (
            <div key={course.course_id} className={`col-span-1 group overflow-hidden ${index % 2 === 1 ? "lg:mt-28 mt-0" : ""}`}>

              <div className="overflow-hidden rounded-lg">
                <Image
                  src={course.course_image?.startsWith("http") ? course.course_image : `/${course.course_image}`}
                  alt={course.course_name}
                  width={500} height={300} layout="responsive"
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>

              <div className="pt-6">
                <h6 className="text-[28px] font-bold text-secondary dark:text-white">{course.course_name}</h6>
                <span className="text-lg font-normal text-SlateBlueText dark:text-opacity-80">{course.course_desc}</span><br />
                <span className="text-lg font-normal text-SlateDarkText dark:text-opacity-80">₹ {course.course_price}</span>
                <br />
                <span className="text-green-600 font-semibold">
                  {Math.round(
                    ((Number(course.total_price) - Number(course.course_price)) /
                      Number(course.total_price)) * 100
                  )}% OFF
                </span>
                <br />
                <span className="text-gray-500 line-through">{course.total_price}</span>
              </div>



              {/* बटन को वैसा ही रखा है जैसा आपका था */}
              <Link href="/buycourse" className="btn btn-1 hover-filled-slide-down rounded-lg overflow-hidden">
                <span className="!flex !items-center gap-14">
                  <i className="bg-[url('/images/hero/tickets.svg')] bg-no-repeat bg-contain w-6 h-6 inline-block"></i>
                  Enroll Now</span>
              </Link>

              {/* Know More बटन - इसमें से RequestCallback हटा दिया ताकि डिज़ाइन न बिगड़े */}
              <div 
                className="btn btn-1 hover-filled-slide-down rounded-lg overflow-hidden lg:mx-3"
                onClick={() => setIsCbUpOpen(true)} // यहाँ से ओपन होगा
              >
                <span className="!flex !items-center gap-14">
                  <Icon icon="solar:phone-calling-linear" className="text-xl" />
                  Know More
                </span>
              </div> 



              {/* <div className="flex flex-col sm:flex-row gap-4 mt-6">*/}

                {/* Enroll Now */}
                {/*
                <Link
                  href="/buycourse"
                  className="btn btn-1 hover-filled-slide-down rounded-lg w-full sm:w-auto overflow-hidden my-5"
                >
                  <span className="flex items-center justify-center gap-3">
                    Enroll Now
                  </span>
                </Link> 
                */}

                {/* Know More */}
                {/*
                <button
                  onClick={() => setIsCbUpOpen(true)}
                  className="btn btn-1 hover-filled-slide-down rounded-lg w-full sm:w-auto overflow-hidden my-5"
                >
                  <span className="flex items-center justify-center gap-3">
                    <Icon icon="solar:phone-calling-linear" className="text-xl" />
                    Know More
                  </span>
                </button>

              </div> */}

            </div>
          ))}
        </div>
      </section>

      {/* --- MODAL SECTION --- */}
      {/* इसे लूप के बाहर रखा गया है ताकि डिज़ाइन खराब न हो */}
      {iscbUpOpen && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
          <div ref={callbackRef} className="relative w-full max-w-md bg-white dark:bg-darklight p-10 rounded-lg shadow-2xl">
            <button
              onClick={() => setIsCbUpOpen(false)}
              className="absolute top-4 right-4 text-2xl dark:text-white"
            >
              <Icon icon="ic:round-close" />
            </button>

            {/* यह कॉम्पोनेंट अब सिर्फ फॉर्म दिखाएगा */}
            <Callback signUpOpen={(value: boolean) => setIsCbUpOpen(value)} />

          </div>
        </div>
      )}
    </>
  );
};

export default WorkSpeakers;