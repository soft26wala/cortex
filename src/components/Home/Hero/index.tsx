"use client";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import './style.css'
import { useRef, useState } from "react";
import Callback from "@/components/Auth/Callback";



// ... बाकी इम्पोर्ट्स वही रहेंगे

const Hero = () => {
    const [iscbUpOpen, setIsCbUpOpen] = useState(false);
    const callbackRef = useRef<HTMLDivElement>(null);

    return (
        <section className="dark:bg-darkmode overflow-hidden">
            <div className="container">
                {/* grid-cols-1 मोबाइल के लिए और lg:grid-cols-12 बड़ी स्क्रीन के लिए */}
                <div className="grid lg:grid-cols-12 grid-cols-1 items-center gap-10 lg:gap-30">
                    
                    {/* टेक्स्ट वाला हिस्सा */}
                    <div className="lg:col-span-6 col-span-1">
                        <h1
                            className="py-8 text-4xl lg:text-6xl font-bold" // फ़ॉन्ट साइज़ एडजस्ट किया
                            data-aos="fade-up"
                            data-aos-delay="300"
                            data-aos-duration="1000"
                        >
                            We Only Teach <br />
                            What We are Really <br />
                            Really good at.
                        </h1>
                        <p
                            data-aos="fade-up"
                            data-aos-delay="400"
                            data-aos-duration="1000"
                            className="text-xl text-SlateBlueText dark:text-opacity-80 font-normal md:pb-14 pb-6"
                        >
                            We ready to accelerate your career with customized courses and leave your mark in the tech industry.
                        </p>
                        <div className="flex items-center md:justify-normal justify-start flex-wrap gap-4">
                            <Link
                                href="/courses"
                                className="btn btn-1 hover-filled-slide-down rounded-lg overflow-hidden"
                            >
                                <span className="!flex !items-center gap-2">
                                    <i className="bg-[url('/images/hero/tickets.svg')] bg-no-repeat bg-contain w-6 h-6 inline-block"></i>
                                    Courses
                                </span>
                            </Link>
                            <button
                                onClick={() => setIsCbUpOpen(true)}
                                className="btn_outline btn-2 hover-outline-slide-down group"
                            >
                                <span className="!flex !items-center gap-2">
                                    <Icon icon="solar:phone-calling-linear" className="text-xl" />
                                    Request Callback
                                </span>
                            </button>
                        </div>
                    </div>

                    {/* इमेज वाला हिस्सा - यहाँ बदलाव किया गया है */}
                    <div
                        data-aos="fade-left"
                        data-aos-delay="200"
                        data-aos-duration="1000"
                        // 'hidden' हटा दिया, अब यह हर स्क्रीन पर दिखेगा और मोबाइल पर टेक्स्ट के नीचे आएगा
                        className="lg:col-span-6 col-span-1 flex items-center gap-3 mt-12 lg:mt-0"
                    >
                        {/* पहली इमेज */}
                        <div className="bg-ElectricAqua relative rounded-tl-[100px] lg:rounded-tl-166 rounded-br-[100px] lg:rounded-br-166 w-full">
                            <Image
                                src="/images/hero/anmol.png"
                                alt="hero"
                                width={500}
                                height={600}
                                quality={100}
                                className="w-full h-auto imgbl"
                            />
                            <div className="bg-yellow-300 rounded-22 shadow-hero-box py-2 px-4 absolute top-10 -left-5 lg:top-20 lg:-left-20">
                                <p className="text-sm lg:text-lg font-bold text-yellow-900">Anmol Singh</p>
                                <p className="text-xs lg:text-base font-medium text-yellow-900 text-center">
                                    4.8 rating
                                </p>
                            </div>
                        </div>

                        {/* दूसरी इमेज */}
                        <div className="bg-primary relative rounded-tr-[100px] lg:rounded-tr-166 rounded-bl-[100px] lg:rounded-bl-166 w-full mt-20 lg:mt-32">
                            <Image
                                src="/images/hero/gavi.png"
                                alt="hero"
                                width={500}
                                height={600}
                                quality={100}
                                className="w-full h-auto imgbr"
                            />
                            <div className="bg-Aquamarine rounded-22 shadow-hero-box py-2 px-4 absolute top-10 -right-5 lg:top-24 lg:-right-20">
                                <p className="text-sm lg:text-lg font-bold text-green-800">Gurvinder</p>
                                <p className="text-xs lg:text-base font-medium text-green-800 text-center">
                                    4.4 rating
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal/Callback Logic */}
            {iscbUpOpen && (
                <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
                    <div ref={callbackRef} className="relative w-full max-w-md bg-white dark:bg-darklight p-6 lg:p-10 rounded-lg shadow-2xl">
                        <button
                            onClick={() => setIsCbUpOpen(false)}
                            className="absolute top-4 right-4 text-2xl dark:text-white"
                        >
                            <Icon icon="ic:round-close" />
                        </button>
                        <Callback />
                    </div>
                </div>
            )}
        </section>
    );
};

export default Hero;