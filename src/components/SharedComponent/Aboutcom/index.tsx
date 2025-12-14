import React, { FC } from "react";
import { BreadcrumbLink } from "@/types/breadcrumb";
import Image from "next/image";

interface HeroSubProps {
  title: string;
  description: string;
  breadcrumbLinks: BreadcrumbLink[];
}

const Aboutcom: FC<HeroSubProps> = ({ title, description }) => {
  return (
   <section className="text-start pt-32 dark:bg-darkmode pb-0 w-full">
  <div className="w-full px-6 lg:px-20">

    {/* Full page column layout */}
    <div className="flex flex-col gap-12">

      {/* TEXT - FULL WIDTH */}
      <div
        data-aos="fade-right"
        data-aos-delay="200"
        data-aos-duration="1000"
        className="w-full"
      >
        <h1 className="dark:text-white text-[40px] leading-[3.4rem] font-bold text-secondary">
          {title}
        </h1>

        <p className="text-lg text-SlateBlueText dark:text-opacity-80 font-normal w-full mt-3">
          {description}
        </p>
      </div>

      {/* IMAGE - BELOW TEXT */}
      <div
        data-aos="fade-left"
        data-aos-delay="200"
        data-aos-duration="1000"
        className="w-full flex justify-center"
      >
        <Image
          src="/images/about/ab17.png"
          alt="About Us"
          width={700}
          height={400}
          className="w-full max-w-[700px] h-auto object-contain"
        />
      </div>

    </div>
  </div>
</section>

  );
};

export default Aboutcom;
