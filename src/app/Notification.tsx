"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
// import { Icon } from "@iconify/react";
import axios from "axios";
import Cookies from "js-cookie";
import AnimatedMail from "@/components/AnimatedMail";

const Notification = () => {
 
    return (
        <Link href="/EventNotificationPage" className="fixed bottom-10 right-10 z-[999]">
            <div className="relative flex items-center justify-center">
                {/* Ping Animation Effect */}
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                
                {/* Main Gol Button */}
                <button className="relative h-16 w-16 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform">
                    {/* <Icon icon="solar:history-bold" className="text-3xl" /> */}
                    <AnimatedMail />
                    {/* Chota dot */}
                    <span className="absolute top-4 right-0 h-4 w-4 bg-red-500 border-2 border-white rounded-full"></span>
                </button>
            </div>
        </Link>
    );
};

export default Notification;