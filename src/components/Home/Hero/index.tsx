"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import './style.css'
import { useEffect, useRef, useState } from "react";
import Callback from "@/components/Auth/Callback";



const Hero = () => {
    
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


    return (
        <section className="dark:bg-darkmode bg-orange-50">
            <div className="container">
                <div className="grid lg:grid-cols-12 grid-cols-1 items-center gap-30">
                    <div className="col-span-6">
                        <h1
                            className="py-8"
                            data-aos="fade-up"
                            data-aos-delay="300"
                            data-aos-duration="1000"
                        >
                            We Only Teach <br></br>
                            What We are Really
                            Really good at.
                        </h1>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="400"
                            data-aos-duration="1000"
                            className="text-xl text-SlateBlueText dark:text-opacity-80 font-normal md:pb-14 pb-6"
                        >
                            We ready to accelerate your career with customized courese and leave your mark in the tech industry.
                        </p>
                        <div className="flex items-center md:justify-normal lg:justify-center justify-start flex-wrap gap-4">
                            <Link
                                href="/courses"
                                data-aos="fade-up"
                                data-aos-delay="500"
                                data-aos-duration="1000"
                                className="btn btn-1 hover-filled-slide-down rounded-lg overflow-hidden"
                            >
                                <span className="!flex !items-center gap-14">
                                    <i className="bg-[url('/images/hero/tickets.svg')] bg-no-repeat bg-contain w-6 h-6 inline-block"></i>
                                    Courses
                                </span>
                            </Link>
                            <Link
                                href="/"
                                data-aos="fade-up"
                                data-aos-delay="600"
                                data-aos-duration="1000"
                                className="btn_outline btn-2 hover-outline-slide-down group"
                                onClick={() => setIsCbUpOpen(true)} // यहाँ से ओपन होगा
                            >
                                <span className="!flex !items-center gap-14">
                                    <Icon icon="solar:phone-calling-linear" className="text-xl" />
                                    Request Callback
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div
                        data-aos="fade-left"
                        data-aos-delay="200"
                        data-aos-duration="1000"
                        className="col-span-6  lg:flex hidden items-center gap-3"
                    >
                        <div className="bg-ElectricAqua relative rounded-tl-166 rounded-br-166 w-full">

                            <Image
                                src="/images/hero/anmol.png"
                                alt="hero"
                                width={0}
                                height={0}
                                quality={100}
                                layout="responsive"
                                sizes="100vh"
                                className="w-full h-full imgbl"
                            />
                            <div className="bg-yellow-300 rounded-22 shadow-hero-box py-4 px-5 absolute top-20 -left-20">
                                <p className="text-lg font-bold text-yellow-900">Anmol Singh</p>
                                <p className="text-base font-medium text-yellow-900 text-center">
                                    4.8 rating
                                </p>
                            </div>
                        </div>


                        <div className="bg-primary relative rounded-tr-166 rounded-bl-166 w-full mt-32">
                            <Image
                                src="/images/hero/gavi.png"
                                alt="hero"
                                width={0}
                                height={0}
                                quality={100}
                                layout="responsive"
                                sizes="100vh"
                                className="w-full h-full imgbr"
                            />
                            <div className="bg-Aquamarine rounded-22 shadow-hero-box py-4 px-5 absolute top-24 -right-20 xl:inline-block hidden">
                                <p className="text-lg font-bold text-green-800">Gurvinder</p>
                                <p className="text-base font-medium text-green-800 text-center">
                                    4.4 rating
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
        </section>
    );
};

export default Hero;
