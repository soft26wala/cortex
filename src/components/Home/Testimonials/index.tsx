"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./st.css";

const Star = () => (
    <svg
        className="w-4 h-4 text-yellow-500 ms-1"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 22 20"
    >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
);

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,        // ✅ auto slide ON
        autoplaySpeed: 2500,   // ✅ 2.5 sec per slide
        pauseOnHover: true,    // hover par ruk jaaye
        pauseOnFocus: true,
    };


    return (
        <section className="bg-IcyBreeze dark:bg-darklight py-16">
            <div className="container mx-auto px-4">
                <Slider {...settings}>
                    {/* SLIDE 1 */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                            {/* IMAGE */}
                            <div className="md:col-span-4 flex justify-center mb-8 md:mb-0">
                                <div className="bg-LightSkyBlue rounded-br-[180px] rounded-tl-[180px] p-6 max-w-[260px] md:max-w-full relative">
                                    <Image
                                        src="/images/about/gav.png"
                                        alt="testimonial"
                                        width={300}
                                        height={300}
                                        className="myimg"
                                    />
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="md:col-span-8 md:ml-20 text-center md:text-left">
                                <h2 className="text-2xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
                                    Excellent Tech Service & Support
                                </h2>

                                <p className="text-base md:text-lg text-SlateBlueText dark:text-opacity-80 mb-6 max-w-full">
                                    I had a great experience working with this tech team. Their website design and development quality is impressive, and they have a strong understanding of modern technologies. The final website is fast, responsive, and works smoothly on all devices.
                                </p>

                                <p className="text-base md:text-lg text-SlateBlueText dark:text-opacity-80 mb-6 max-w-full">
                                    Their professional communication, on-time delivery, and quick response to updates really stood out. They provided clear explanations and smart technical solutions tailored to my business needs. Highly recommended.
                                </p>

                                <div className="flex items-center gap-6 justify-center md:justify-start">
                                    <Image
                                        src="/images/testimonials/ravi.png"
                                        alt="profile"
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />

                                    <div>
                                        <p className="text-lg font-medium text-secondary dark:text-white">
                                            Ravi Kashyap
                                        </p>
                                        <div className="flex items-center">
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 2 */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                            <div className="md:col-span-4 flex justify-center mb-8 md:mb-0">
                                <div className="bg-LightSkyBlue rounded-br-[180px] rounded-tl-[180px] p-6 max-w-[260px] md:max-w-full">
                                    <Image
                                        src="/images/about/gav.png"
                                        alt="testimonial"
                                        width={300}
                                        height={300}
                                        className="myimg"
                                    />
                                </div>
                            </div>

                            <div className="md:col-span-8 md:ml-20 text-center md:text-left">
                                <h2 className="text-2xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
                                    Professional & Reliable Team
                                </h2>

                                <p className="text-base md:text-lg text-SlateBlueText dark:text-opacity-80 mb-6">
                                    They maintained clear communication throughout the project and handled every request professionally. Their technical expertise and support make them a reliable choice for web development and IT services.
                                </p>

                                <p className="text-base md:text-lg text-SlateBlueText dark:text-opacity-80 mb-6">
                                    Working with this tech company was a smooth and stress-free experience. The team delivered a modern, well-optimized website that looks great and performs perfectly across all screen sizes.
                                </p>

                                <div className="flex items-center gap-6 justify-center md:justify-start">
                                    <Image
                                        src="/images/testimonials/kasish.png"
                                        alt="profile"
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />

                                    <div>
                                        <p className="text-lg font-medium text-secondary dark:text-white">
                                            Kasish Sharma
                                        </p>
                                        <div className="flex items-center">
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 3 */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                            {/* IMAGE */}
                            <div className="md:col-span-4 flex justify-center mb-8 md:mb-0">
                                <div className="bg-LightSkyBlue rounded-br-[180px] rounded-tl-[180px] p-6 max-w-[260px] md:max-w-full relative">
                                    <Image
                                        src="/images/about/gav.png"
                                        alt="testimonial"
                                        width={300}
                                        height={300}
                                        className="myimg"
                                    />
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="md:col-span-8 md:ml-20 text-center md:text-left">
                                <h2 className="text-2xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
                                    High-Quality Development Work
                                </h2>

                                <p className="text-base md:text-lg text-SlateBlueText dark:text-opacity-80 mb-6 max-w-full">
                                    This tech team delivered exactly what we were looking for. The website design is clean, user-friendly, and built with modern development standards. Performance and responsiveness are excellent.
                                </p>

                                <p className="text-base md:text-lg text-SlateBlueText dark:text-opacity-80 mb-6 max-w-full">
                                    They were quick to understand our requirements and provided effective solutions. Their dedication and timely delivery make them a great partner for long-term projects.
                                </p>

                                <div className="flex items-center gap-6 justify-center md:justify-start">
                                    <Image
                                        src="/images/testimonials/anjli.jfif"
                                        alt="profile"
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />

                                    <div>
                                        <p className="text-lg font-medium text-secondary dark:text-white">
                                            Anjali Verma
                                        </p>
                                        <div className="flex items-center">
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SLIDE 4 */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                            {/* IMAGE */}
                            <div className="md:col-span-4 flex justify-center mb-8 md:mb-0">
                                <div className="bg-LightSkyBlue rounded-br-[180px] rounded-tl-[180px] p-6 max-w-[260px] md:max-w-full relative">
                                    <Image
                                        src="/images/about/gav.png"
                                        alt="testimonial"
                                        width={300}
                                        height={300}
                                        className="w-full h-auto object-cover rounded-lg"
                                    />
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="md:col-span-8 md:ml-20 text-center md:text-left">
                                <h2 className="text-2xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
                                    Smooth Process & Great Results
                                </h2>

                                <p className="text-base md:text-lg text-SlateBlueText dark:text-opacity-80 mb-6 max-w-full">
                                    From the initial discussion to the final delivery, everything was handled professionally. The team created a fast, responsive, and visually appealing website that meets our business goals.
                                </p>

                                <p className="text-base md:text-lg text-SlateBlueText dark:text-opacity-80 mb-6 max-w-full">
                                    They were always available for support and explained technical details in a simple and clear way. I would definitely recommend them for web development and software solutions.
                                </p>

                                <div className="flex items-center gap-6 justify-center md:justify-start">
                                    <Image
                                        src="/images/testimonials/anil.png"
                                        alt="profile"
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />

                                    <div>
                                        <p className="text-lg font-medium text-secondary dark:text-white">
                                            Anil Shirvastav
                                        </p>
                                        <div className="flex items-center">
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* SLIDE 5 */}
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
                            {/* IMAGE */}
                            <div className="md:col-span-4 flex justify-center mb-8 md:mb-0">
                                <div className="bg-LightSkyBlue rounded-br-[180px] rounded-tl-[180px] p-6 max-w-[260px] md:max-w-full relative">
                                    <Image
                                        src="/images/about/gav.png"
                                        alt="testimonial"
                                        width={300}
                                        height={300}
                                        className="myimg"
                                    />
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="md:col-span-8 md:ml-20 text-center md:text-left">
                                <h2 className="text-2xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
                                    Trusted Tech Partner
                                </h2>

                                <p className="text-base md:text-lg text-SlateBlueText dark:text-opacity-80 mb-6 max-w-full">
                                    I am extremely satisfied with the service provided by this tech team. Their approach to design, development, and optimization is modern and efficient. The website works flawlessly on mobile and desktop devices.
                                </p>

                                <p className="text-base md:text-lg text-SlateBlueText dark:text-opacity-80 mb-6 max-w-full">
                                    Their communication, technical knowledge, and post-delivery support were excellent. I look forward to working with them again on future projects.
                                </p>

                                <div className="flex items-center gap-6 justify-center md:justify-start">
                                    <Image
                                        src="/images/testimonials/sandeep.png"
                                        alt="profile"
                                        width={64}
                                        height={64}
                                        className="rounded-full"
                                    />

                                    <div>
                                        <p className="text-lg font-medium text-secondary dark:text-white">
                                            Sandeep Singh
                                        </p>
                                        <div className="flex items-center">
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                            <Star />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Slider>

            </div>
        </section>
    );
};

export default Testimonials;
