import React, { FC } from "react";
import Image from "next/image";
import { AboutItem } from "../data/aboutData"

interface AboutcomProps {
  items: AboutItem[];
}

const Aboutimg: FC<AboutcomProps> = ({ items = [] }) => {
  return (
    <section className="text-start pt-32 dark:bg-darkmode pb-0">
      <div className="container space-y-20">

        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col lg:flex-row items-center justify-between gap-8 ${
              index % 2 !== 0 ? "lg:flex-row-reverse" : ""
            }`}
          >
            {/* TEXT */}
            <div
              data-aos="fade-right"
              data-aos-delay="200"
              data-aos-duration="1000"
              className="w-full lg:w-1/2"
            >
              <h2 className="dark:text-white md:text-[40px] leading-[3.4rem] text-4xl font-bold text-secondary">
                {item.title}
              </h2>

              <p className="text-lg text-SlateBlueText dark:text-opacity-80 font-normal w-full mt-3">
                {item.description}
              </p>
            </div>

            {/* IMAGE */}
            <div
              data-aos="fade-left"
              data-aos-delay="200"
              data-aos-duration="1000"
              className="w-full lg:w-1/2 flex justify-center"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={300}
                className="w-full max-w-[500px] h-auto object-contain"
              />
            </div>
          </div>
        ))}

      </div>
    </section>
  );
};

export default Aboutimg;
