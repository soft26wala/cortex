"use client";
import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";

const images = [
  "/images/pic1.png",
  "/images/hero/anmol.png",
  "/images/tech.jpeg",
  "/images/hero/gurkreet.jpeg",
  "/images/hero/pawan.jpeg",
  "/images/hero/dharmveer.jpeg",
  "/images/ch.jpeg",
  "/images/anmol3.jpeg",
  "/images/anubav1.png",
  "/images/anubav2.jpeg",
];

const ThumbnailCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const mainSliderRef = useRef<Slider | null>(null);
  const navSliderRef = useRef<Slider | null>(null);

  const settingsFor = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: navSliderRef.current as Slider,
  };

  const settingsNav = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: mainSliderRef.current as Slider,
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setActiveIndex(newIndex),
  };

  useEffect(() => {
    if (mainSliderRef.current) {
      mainSliderRef.current.slickGoTo(activeIndex);
    }
  }, [activeIndex]);

  return (
    <div>
      {/* 🔥 MAIN SLIDER */}
      <Slider {...settingsFor} ref={mainSliderRef} className="pb-3" adaptiveHeight={true}>
        {images.map((img, index) => (
          <div key={index}>
           {/* <div className="w-full flex justify-center items-center bg-black/10 rounded-xl"> */}
           <div className="w-full flex justify-center items-center">
 <Image
  src={img}
  alt={`slide-${index}`}
  width={1000}
  height={1000}
  className="w-full h-auto object-contain max-h-[500px]"
  quality={100}
/>
</div>
          </div>
        ))}
      </Slider>

      {/* 🔥 THUMBNAIL SLIDER */}
      <Slider {...settingsNav} ref={navSliderRef} className="thumb">
        {images.map((img, index) => (
          <div key={index}>
           <div className="px-1">
  <div className="w-full h-[80px] flex items-center justify-center bg-black/10 rounded-md">
    <Image
      src={img}
      alt={`thumb-${index}`}
      width={150}
      height={80}
      className="h-full w-auto object-contain"
    />
  </div>
</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ThumbnailCarousel;