"use client"
import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const BoxSlider = () => {
 const items = [
  { title: "Web Development 💻", desc: "Modern business websites" },
  { title: "Meta Ads 📈", desc: "Leads & sales growth" },
  { title: "AI Chat Bot 🤖", desc: "Auto replies & support" },
  { title: "WhatsApp Orders 🛒", desc: "Direct order system" },
  { title: "Automation ⚙️", desc: "Save time & scale" },
];
  return (
    <>
      <Slider {...items} className="text-center">
       {items.map((item, i) => (
  <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl text-center hover:scale-105 transition">
    <h5 className="text-white text-lg font-bold">{item.title}</h5>
    <p className="text-gray-400 text-sm">{item.desc}</p>
  </div>
))}
      </Slider>
    </>
  );
};

export default BoxSlider;
