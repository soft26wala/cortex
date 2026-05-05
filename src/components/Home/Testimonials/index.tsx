"use client";

import React from "react";
import Image from "next/image";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ⭐ Star icon
const Star = () => (
  <svg
    className="w-4 h-4 text-yellow-500"
    fill="currentColor"
    viewBox="0 0 22 20"
  >
    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
  </svg>
);

// ⭐ Dynamic rating
const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(full)].map((_, i) => (
        <Star key={i} />
      ))}
      {half && <span className="text-yellow-500 text-sm ml-1">★</span>}
      <span className="ml-2 text-sm text-gray-400">({rating})</span>
    </div>
  );
};

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const reviews = [
    {
      title: "Meta Ads Brought Real Leads 📈",
      text1:
        "I started Meta Ads and within days I got real leads. Their targeting and strategy is very strong.",
      text2:
        "They also connected WhatsApp automation which helped me respond faster.",
      name: "Ravi Kumar",
      img: "/images/testimonials/ravi.png",
      rating: 4.5,
    },
    {
      title: "Clean Website & Fast Performance 💻",
      text1:
        "They built a modern website for my business. It looks clean and works perfectly on mobile.",
      text2:
        "My online presence improved a lot after this. Great support from the team.",
      name: "Aman Sharma",
      img: "/images/testimonials/kasish.png",
      rating: 4.3,
    },
    {
      title: "AI Bot Saved My Time 🤖",
      text1:
        "The WhatsApp AI bot replies automatically to customers. It works like a real assistant.",
      text2:
        "Now I don't need to reply manually all the time. Very useful system.",
      name: "Neha Verma",
      img: "/images/testimonials/anjli.png",
      rating: 4.0,
    },
    {
      title: "Complete Business Growth 🚀",
      text1:
        "I used website + Meta Ads + automation together. Everything works smoothly.",
      text2:
        "Leads increased and business is growing faster now.",
      name: "Sandeep Singh",
      img: "/images/testimonials/sandeep.png",
      rating: 4.5,
    },
    {
      title: "Professional & Reliable 👍",
      text1:
        "Team understands business needs and provides practical solutions.",
      text2:
        "Support and communication are very good. Happy with service.",
      name: "Anil Kumar",
      img: "/images/testimonials/anil.png",
      rating: 4.2,
    },
  ];

  return (
    <section className="bg-[#0b1c2c] py-20 text-white">
      <div className="container mx-auto px-4">

        <h2 className="text-4xl font-bold text-center mb-12">
          What Our Clients Say 💬
        </h2>

        <Slider {...settings}>
          {reviews.map((item, i) => (
            <div key={i}>
              <div className="grid md:grid-cols-12 gap-6 items-center">

                {/* IMAGE */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6">
                    <Image
                      src={item.img}
                      alt="client"
                      width={250}
                      height={250}
                      className="rounded-xl"
                    />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="md:col-span-8 text-center md:text-left">

                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-300 mb-4">{item.text1}</p>
                  <p className="text-gray-300 mb-6">{item.text2}</p>

                  <div className="flex items-center gap-4 justify-center md:justify-start">
                    <Image
                      src={item.img}
                      alt="profile"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />

                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <StarRating rating={item.rating} />
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </Slider>

      </div>
    </section>
  );
};

export default Testimonials;