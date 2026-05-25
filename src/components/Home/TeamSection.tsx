"use client";
import React from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    name: "Anmol Singh Thind",
    roles: ["Founder", "CEO", "CTO", "Fullstack Developer"],
    image: "/images/hero/anmolin.png",
    socials: {
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  },
  {
    name: "Gurvinder singh Thind",
    roles: ["Co-founder", "COO"],
    image: "/images/tech.jpeg",
    socials: {
      linkedin: "#",
      twitter: "#"
    }
  },
  {
    name: "Jaskreet Singh Thind",
    roles: ["Co-founder", "CMO", "Meta Ads"],
    image: "/images/about/jas.png",
    socials: {
      linkedin: "#",
      twitter: "#"
    }
  },

  {
    name: "Gurkireet Singh",
    roles: ["Video Editor"],
    image: "/images/hero/gurkreet.jpeg",
    socials: {
      youtube: "#",
      linkedin: "#"
    }
  },

  {
    name: "Pawan Kumar",
    roles: ["UI/UX Designer"],
    image: "/images/hero/pawan.jpeg",
    socials: {
      dribbble: "#",
      linkedin: "#"
    }
  },

  {
    name: "Jaipal",
    roles: ["UI/UX Designer"],
    image: "/images/hero/jaipal.jpeg",
    socials: {
      dribbble: "#",
      linkedin: "#"
    }
  },



  {
    name: "Dharamveer Singh",
    roles: ["QA Engineer"],
    image: "/images/hero/dharmveer.jpeg",
    socials: {
      linkedin: "#",
      twitter: "#"
    }
  }
];

const TeamSection = () => {
  return (
    <section className="py-20 bg-orange-50 dark:bg-darkmode overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16" data-aos="fade-up">
          <p className="text-primary font-bold tracking-widest uppercase mb-3 text-sm">Our Minds</p>
          <h2 className="text-4xl md:text-5xl font-bold text-MidnightNavyText dark:text-white mb-6">
            Meet the <span className="text-primary">Cortex</span> Team
          </h2>
          <p className="text-SlateBlueText text-lg">
            We are a team of passionate creators, engineers, and visionaries dedicated to building next-generation digital solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-darklight rounded-2xl p-6 shadow-round-box hover:shadow-hero-box transition-all duration-300 transform hover:-translate-y-2 group border border-transparent dark:border-dark_border"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-PaleSkyBlu dark:border-dark_border group-hover:border-primary transition-colors duration-300">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-MidnightNavyText dark:text-white mb-2">
                  {member.name}
                </h3>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {member.roles.map((role, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs font-semibold rounded-full bg-PaleSkyBlu text-primary dark:bg-dark_border dark:text-LightSkyBlue"
                    >
                      {role}
                    </span>
                  ))}
                </div>

                {/* Optional Social Icons */}
                <div className="flex justify-center gap-4 mt-6 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                  {member.socials.linkedin && (
                    <a href={member.socials.linkedin} className="text-SlateBlueText hover:text-primary dark:hover:text-ElectricAqua transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a href={member.socials.twitter} className="text-SlateBlueText hover:text-primary dark:hover:text-ElectricAqua transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
