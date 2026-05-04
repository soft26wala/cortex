"use client";
import React from "react";
import Image from "next/image";

const ServicesSection = ({ showTitle = true }) => {
  const services = [
    {
      id: 1,
      name: "Web Development",
      desc: "Modern websites & web apps for your business",
      status: "available",
      image: "/service/webdev.png",
    },
    {
      id: 2,
      name: "Meta Ads Service",
      desc: "Run high converting Facebook & Instagram ads",
      status: "available",
      image: "/service/meta.png",
    },
    {
      id: 3,
      name: "WhatsApp AI Auto Reply",
      desc: "Smart chatbot for auto replies",
      status: "coming",
      image: "/service/waib.png",
    },
    {
      id: 4,
      name: "WhatsApp Shop Order System",
      desc: "Take orders directly on WhatsApp",
      status: "coming",
      image: "/service/wshopai.png",
    },
    {
      id: 5,
      name: "Shop Management System",
      desc: "Big & advanced business management system",
      status: "coming",
      image: "/service/shopmanagment.png",
    },
  ];

  const handleWhatsApp = (serviceName: string) => {
    const phone = "916376930459";
    const message = `Hi, I want ${serviceName} service`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="relative py-24 dark:bg-[#0b1c2c] bg-orange-50 overflow-hidden">

      <h2 className="text-center text-4xl font-bold dark:text-white text-gray-700 mb-16" data-aos="fade-up" data-aos-duration="1000">
        Smart Automation Systems 🤖
      </h2>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">

        {services.map((service) => (
          <div
            key={service.id}
            // className="relative group rounded-2xl overflow-hidden border dark:border-white/10 dark:bg-white/5 bg-backdrop-blur-[10px] backdrop-blur-xl hover:scale-105 transition duration-500"
            className="relative group rounded-2xl overflow-hidden 
                      border border-black/10 dark:border-white/10 
                      bg-white/70 dark:bg-white/5 
                      backdrop-blur-xl 
                      transition duration-500 shadow-lg 
                      transform-gpu 
                      hover:scale-105 
                      hover:-translate-y-3 
                      hover:rotate-x-6 hover:rotate-y-6"
            data-aos="fade-left"
            data-aos-duration="800"
          >
            {/* Glow Effect */}
            {/* <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-blue-500/20 to-purple-500/20"></div> */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 
bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-pink-500/20 blur-xl"></div>

            {/* Image */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={service.image}
                alt={service.name}
                width={500}
                height={350}
                // className="w-full h-full object-contain p-6 transition duration-500 group-hover:scale-110"
                className="w-full h-full object-contain p-6 
transition duration-700 
group-hover:scale-110 
group-hover:-translate-y-2"
                data-aos="fade-right"
                data-aos-delay="200"
                data-aos-duration="1000"
              />
            </div>

            {/* Content */}
            <div className="p-6 relative z-10" data-aos="fade-up" data-aos-duration="1000">

              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold dark:text-white text-gray-800" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
                  {service.name}
                </h3>

                {service.status === "available" ? (
                  <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">
                    Available
                  </span>
                ) : (
                  <span className="text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
                    Coming
                  </span>
                )}
              </div>

              <p className="text-sm dark:text-gray-300 text-gray-600 mb-5">
                {service.desc}
              </p>

              {service.status === "available" ? (
                <button
                  onClick={() => handleWhatsApp(service.name)}
                  // className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition"
                  className="w-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 
shadow-lg shadow-green-500/20 
hover:shadow-green-500/40 transition"
                >
                  Chat on WhatsApp
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-white/10 text-gray-400 py-2 rounded-lg font-medium cursor-not-allowed"
                >
                  Coming Soon 🚀
                </button>
              )}

            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default ServicesSection;