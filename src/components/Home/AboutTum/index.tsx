"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
    "/images/about/ab1.jpeg",
    "/images/about/ab2.jpeg",
    "/images/about/ab3.jpeg",
    "/images/about/ab4.jpeg",
    "/images/about/ab5.jpeg",
    "/images/about/ab6.jpeg",
    "/images/about/ab7.jpeg",
    "/images/about/ab8.jpeg",
    "/images/about/ab9.png",
    "/images/about/ab10.png",
    "/images/about/ab11.png",
    "/images/about/ab12.png",
    "/images/about/ab13.png",
    "/images/about/ab15.png",
    "/images/about/ab16.png",
    "/images/about/ab17.png",
    
];

const AboutTum: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const mainSliderRef = useRef<Slider | null>(null);
    const navSliderRef = useRef<Slider | null>(null);

    const settingsFor = {
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


   

    useEffect(() => {
        mainSliderRef.current?.slickGoTo(activeIndex);
    }, [activeIndex]);

    return (
        <div className="w-full h-[95vh] relative overflow-hidden">

            {/* MAIN FULL SCREEN SLIDER */}
            <Slider {...settingsFor} ref={mainSliderRef}>
                {images.map((src, index) => (
                    <div key={index} className="relative h-[90vh] w-[90vw]">
                        <Image
                            src={src}
                            alt="Image"
                            fill
                            quality={100}        // 🔥 highest quality
                            sizes="100vw"
                            priority
                            className="object-center will-change-transform object-contain"
                        />
                    </div>
                ))}
            </Slider>

            {/* THUMBNAILS (optional – niche) */}
            {/* <div className="absolute bottom-4 left-0 right-0 px-6">
        <Slider {...settingsNav} ref={navSliderRef}>
          {images.map((src, index) => (
            <div key={index} className="px-2">
              <div className="relative h-24 w-full cursor-pointer">
                <Image
                  src={src}
                  alt="Thumbnail"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div> */}

        </div>
    );
};

export default AboutTum;
