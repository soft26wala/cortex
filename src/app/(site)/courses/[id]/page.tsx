"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

// Interface for type safety
interface CourseType {
  course_id: string;
  course_name: string;
  course_desc: string;
  course_price: number;
  course_image: string;
  total_price: string;
}

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Aapki API endpoint ke hisab se fetch call
      axios
        .get(`https://cortex-api-htc8.onrender.com/add-course/${id}`)
        .then((res) => {
          setCourse(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching course:", err);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  if (!course || !course.course_id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <h2 className="text-2xl font-bold dark:text-white">Course Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
      
      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 pb-20 px-6 lg:px-20 lg:pt-24 dark:bg-gradient-to-b dark:from-[#111] dark:to-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center mt-14">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-1 rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 text-sm font-bold mb-6">
              ✨ Premium Course
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              {course.course_name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
              {course.course_desc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <button
               className="bg-orange-600 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-orange-600/20 transition-all active:scale-95">
                 <Link href={`/buy-now/${course.course_id}`} className="w-full text-center">
             Buy Now - ₹{course.course_price}
           </Link>
              </button>
              <button className="flex items-center justify-center gap-2 border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 px-10 py-4 rounded-2xl font-bold transition-all">
                <Icon icon="solar:download-minimalistic-bold" className="text-xl" />
                Syllabus
              </button>
            </div>
          </div>
          
          {/* Right Image/Card */}
          <div className="order-1 lg:order-2">
             <div className="relative rounded-3xl overflow-hidden border-4 border-white dark:border-[#1a1a1a] shadow-2xl">
                <Image 
                  src={course.course_image?.startsWith("http") ? course.course_image : `/${course.course_image}`}
                  alt={course.course_name} 
                  width={800} height={500} 
                  className="w-full object-cover aspect-video hover:scale-105 transition-transform duration-600"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white">
                        <Icon icon="solar:play-bold" className="text-xl ml-1" />
                      </div>
                      <span className="font-bold text-white">Watch Intro</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* --- CURRICULUM SECTION --- */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">Course <span className="text-orange-500 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Curriculum</span></h2>
          <p className="text-gray-500">Master every concept from scratch to advanced</p>
        </div>
        
        <div className="space-y-4">
          {["Fundamentals & Logic Building", "Advanced Core Concepts", "Industry Level Projects", "Placement Assistance"].map((step, idx) => (
            <div key={idx} className="bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:border-orange-500/50 transition-all cursor-pointer">
              <div className="flex items-center gap-5">
                <span className="text-4xl font-black text-gray-200 dark:text-white/5 group-hover:text-orange-500/20 transition-colors">0{idx + 1}</span>
                <h4 className="text-xl font-bold">{step}</h4>
              </div>
              <Icon icon="solar:add-circle-linear" className="text-2xl text-gray-400 group-hover:text-orange-500" />
            </div>
          ))}
        </div>
      </section>

      {/* --- FLOATING ENROLL FOR MOBILE --- */}
      <div className="lg:hidden fixed bottom-6 left-6 right-6 z-50">
          <button className="w-full bg-orange-600 text-white py-4 rounded-2xl font-bold shadow-2xl shadow-orange-600/40 border-t border-white/20">
           <Link href={`/buy-now/${course.course_id}`} className="w-full text-center">
             Buy Now - ₹{course.course_price}
           </Link>
          </button>
      </div>

    </div>
  );
};

export default CourseDetails;