"use client";
import React from "react";
import Link from "next/link";

const Page = () => {
  return (
    <div className="dark:bg-[#0b1c2c] bg-orange-50 text-white overflow-hidden">

      {/* 🔥 HERO */}
      <section className="py-20 text-center mt-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6" data-aos="fade-up" data-aos-duration="1000">
          We Build Digital Solutions 🚀
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg" data-aos="fade-up" data-aos-duration="1000">
          Cortex Web Solutions helps businesses grow with websites,
          automation systems, and smart digital tools.
        </p>
      </section>

      {/* 🔥 3D STYLE CARDS */}
      <section className="py-16 px-6">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Card 1 */}
          {/* <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-105 transition" data-aos="fade-right" data-aos-duration="500"> */}
          <div className="dark:bg-white/5 bg-blue-500/10 backdrop-blur-xl border dark:border-white/10 border-blue-300 rounded-2xl p-8 hover:scale-105 transition" data-aos="fade-up" data-aos-duration="1000">

            <div className="text-4xl mb-4" data-aos="fade-up" data-aos-duration="1000">💻</div>
            {/* <h3 className="text-xl font-bold mb-3" data-aos="fade-up" data-aos-duration="1000"> */}
            <h3 className="text-xl font-bold mb-3 dark:text-white text-black" data-aos="fade-up" data-aos-duration="1000">

              Web Development
            </h3>
            <p className="dark:text-gray-400 text-gray-600 " data-aos="fade-up" data-aos-duration="1000">
              Modern, fast and scalable websites designed to grow your business.
            </p>
          </div>

          {/* Card 2 */}
          <div className="dark:bg-white/5 bg-blue-500/10 backdrop-blur-xl border dark:border-white/10 border-blue-300 rounded-2xl p-8 hover:scale-105 transition" data-aos="fade-up" data-aos-duration="1000">
            <div className="text-4xl mb-4">📈</div>
            {/* <h3 className="text-xl font-bold mb-3" data-aos="fade-up" data-aos-duration="1000"> */}
            <h3 className="text-xl font-bold mb-3 dark:text-white text-black" data-aos="fade-up" data-aos-duration="1000">
              Meta Ads
            </h3>
              <p className="dark:text-gray-400 text-gray-600" data-aos="fade-up" data-aos-duration="1000">
              High converting ads to generate leads and increase sales.
            </p>
          </div>

          {/* Card 3 */}
          {/* <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:scale-105 transition" data-aos="fade-left" data-aos-duration="500"> */}
          <div className="dark:bg-white/5 bg-blue-500/10 backdrop-blur-xl border dark:border-white/10 border-blue-300 rounded-2xl p-8 hover:scale-105 transition" data-aos="fade-up" data-aos-duration="1000">

            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-3 dark:text-white text-black" data-aos="fade-up" data-aos-duration="1000">
              Automation Systems
            </h3>
            <p className="dark:text-gray-400 text-gray-600 " data-aos="fade-up" data-aos-duration="1000">
              WhatsApp bots, shop systems and automation tools (Coming Soon).
            </p>
          </div>

        </div>
      </section>

      {/* 🔥 MISSION */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6" data-aos="fade-up" data-aos-duration="1000">
          Our Mission
        </h2>
        <p className="dark:text-gray-400 text-gray-600 max-w-2xl mx-auto text-lg" data-aos="fade-up" data-aos-duration="1000">
          Our goal is to simplify business operations using smart technology.
          We build solutions that save time, reduce manual work, and increase revenue.
        </p>
      </section>

      {/* 🔥 FEATURES / VALUE */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-4">

          {[
            "Fast & Modern UI/UX",
            "Business Focused Solutions",
            "Affordable Pricing",
            "Automation & Growth Tools",
            "Full Support & Maintenance",
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
      </section>

      {/* 🔥 CTA */}
      <section className="py-20 text-center" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="text-4xl font-bold mb-6" data-aos="fade-up" data-aos-duration="1000">
          Let’s Build Your Business 🚀
        </h2>
        <p className="text-gray-400 mb-8">
          Start your digital journey with Cortex Web Solutions.
        </p>

        <Link
          href="/Service"
          className="bg-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          data-aos="fade-down"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          Explore Services
        </Link>
      </section>

    </div>
  );
};

export default Page;