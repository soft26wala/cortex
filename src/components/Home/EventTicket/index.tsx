import React from "react";
import Link from "next/link";
import Image from "next/image";

const EventTicket = () => {
    return (
        <>
            <section className="dark:bg-darkmode bg-white/50 pt-0">
                <div className="container">
                    <div className="text-center md:pb-20 pb-8">
                        <h2 className="pb-8" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">Powerful Digital Solutions for Modern Businesses</h2>
                        <p data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000" className="text-SlateBlueText dark:text-opacity-80 text-lg font-normal max-w-920 m-auto">
                            At Cortex Web Solutions, we help businesses grow with smart digital tools and automation systems. From website development to advanced shop management systems, we build solutions that save time, increase sales, and simplify operations.
                        </p>
                    </div>

                    <div className="text-center md:pb-20 pb-8">
                        <h2 className="pb-8" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">Smart Shop Management System (All-in-One Dashboard)</h2>
                        <p data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000" className="text-SlateBlueText dark:text-opacity-80 text-lg font-normal max-w-920 m-auto">
                            {/* Manage your entire business from one powerful dashboard with automation, billing, and real-time tracking features designed for both GST and non-GST businesses. */}
                            We build smart, scalable, and result-driven digital solutions that help businesses grow faster. Whether you need a high-performance website or a complete business management system, we deliver technology that works for you. <br /> <br />
                        </p>

                        <h2 className="pb-8" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">Powerful Features to Manage Your Business</h2>

                        <h3
                            className="pb-8 text-center text-2xl font-bold underline"
                            data-aos="fade-up"
                            data-aos-delay="200"
                            data-aos-duration="1000"
                        >
                            FEATURES
                        </h3>


                        <div className="max-w-2xl mx-auto space-y-4 hover:box-shadow-">
                            {[
                                "Real-Time Auto Stock Management",
                                "Smart Billing with Automatic HSN Code",
                                "GST & Non-GST Billing System (All-in-One)",
                                "Orders, Sales & Customer Management Dashboard",
                                "Advanced Reports & Business Analytics",
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-3 ddark:bg-white/5 bg-blue-500/10 p-4 rounded-lg border dark:border-white/10 border-blue-300 "
                                    data-aos="fade-left"
                                    data-aos-delay={index * 100}
                                    data-aos-duration="1000"
                                >
                                    <span className="text-green-400 text-lg" data-aos="fade-right" data-aos-duration="1000">
                                        ✔
                                    </span>
                                    <p className="dark:text-gray-300 text-gray-600" data-aos="fade-up" data-aos-duration="1000">
                                        {item}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                </div>
            </section>
        </>
    );
};

export default EventTicket;
