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
    const phone = "916376930459"; // 🔥 apna number dal
    const message = `Hi, I want ${serviceName} service`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="bg-orange-50 dark:bg-darkmode py-12">
      
      {showTitle && (
        <h2 className="text-center text-3xl font-bold mb-10"  data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
          Our Services 🚀
        </h2>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 md:px-12"  data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">

        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-blue-200 rounded-xl shadow-lg overflow-hidden transition hover:scale-105 duration-300"
          >
            {/* Image */}
            <div className="aspect-video overflow-hidden" 
             data-aos="fade-up" data-aos-delay="400" data-aos-duration="1000"
             >
              <Image
                src={service.image}
                alt={service.name}
                width={500}
                height={350}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-5">

              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold"  data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                  {service.name}
                </h3>

                {service.status === "available" ? (
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                    Available
                  </span>
                ) : (
                  <span className="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                    Coming
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 mb-4" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                {service.desc}
              </p>

              {service.status === "available" ? (
                <button
                  onClick={() => handleWhatsApp(service.name)}
                  className="w-full bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition"
                  data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000"
                >
                  Contact on WhatsApp
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-300 text-gray-600 py-2 rounded-md font-medium cursor-not-allowed"
                    data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000"
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