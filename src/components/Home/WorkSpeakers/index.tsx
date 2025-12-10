"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export interface typeofCourse {
  course_id: number;
  course_name: string;
  course_desc: string;
  course_image: string;
  course_price: string;      // "10983.00" aa raha hai isliye string
  created_at: string;        // ISO date string
}


const WorkSpeakers = ({ showTitle = true }) => {
const [courses, setCourses] = useState<typeofCourse[]>([]);
const Api = process.env.NEXT_PUBLIC_API;
console.log("API ENV =>", process.env.NEXT_PUBLIC_API);

  useEffect(() => {
    axios
      .get(`${Api}/add-course/all`)
      // .get("http://localhost:4000/add-course/all")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log("courses :" , courses)

  const pathname = usePathname();
  return (
    <>
      <section className={` dark:bg-darkmode ${pathname === "/" ? "" : ""}`}>
        {showTitle && (
          <h2 className="text-center pb-12">Courses Offered</h2>
        )}
        <div className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 items-stretch gap-8 mx-7">
          {courses.map((course, index) => (
            <div
              key={course.course_id}
              data-aos="fade-up"
              data-aos-delay={`${index * 300}`}
              data-aos-duration="1000"
              className={`col-span-1 group overflow-hidden ${
                index % 2 === 1 ? "lg:mt-28 mt-0" : ""
              }`}
            >
              <div className="overflow-hidden rounded-lg">
                <Image
                  src={`${Api}/uploads/${course.course_image}`}
                  alt={course.course_name}
                  width={0}
                  height={0}
                  quality={100}
                  layout="responsive"
                  sizes="100vh"
                  className=" object-cover w-full h-full transition-all duration-0.4s group-hover:scale-110"
                  priority={true}
                />
              </div>
              <div className="pt-6">
                <h6 className="text-[28px] leading-[2.25rem] font-bold text-secondary dark:text-white">
                  {course.course_name}
                </h6>
                <span className="text-lg font-normal text-SlateBlueText dark:text-opacity-80">
                  {course.course_desc}
                </span><br />
                <span className="text-lg font-normal text-SlateBlueText dark:text-opacity-80">
                  {course.course_price}
                </span>
              </div>

                 <Link
                                href="/buycourse"
                                data-aos="fade-up"
                                data-aos-delay="500"
                                data-aos-duration="1000"
                                className="btn btn-1 hover-filled-slide-down rounded-lg overflow-hidden my-5"
                            >
                                <span className="!flex !items-center gap-14">
                                    <i className="bg-[url('/images/hero/tickets.svg')] bg-no-repeat bg-contain w-6 h-6 inline-block"></i>
                                    Buy Coures
                                </span>
                            </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default WorkSpeakers;
