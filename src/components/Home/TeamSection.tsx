'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Linkedin, Twitter, Sparkles, ShieldCheck } from 'lucide-react'
import { CortexNeuralCard } from '@/components/ui/CortexNeuralCard'

const teamMembers = [
  {
    name: 'Anmol Singh Thind',
    roles: ['Founder', 'CEO', 'CTO', 'Fullstack Developer'],
    image: '/images/hero/anmolin.png',
    bio: 'Architecting high-scale web platforms and neural AI automation engines.',
    socials: {
      linkedin: 'https://www.linkedin.com/in/cortex-web-solutions-349459399',
      twitter: '#',
    },
  },
  {
    name: 'Gurvinder Singh Thind',
    roles: ['Co-founder', 'COO'],
    image: '/images/tech.jpeg',
    bio: 'Managing operations, agency growth, and client delivery pipelines.',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Jaskreet Singh Thind',
    roles: ['Co-founder', 'CMO', 'Meta Ads'],
    image: '/images/about/jas.png',
    bio: 'Scaling brand visibility, performance marketing, and client partnerships.',
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    name: 'Gurkireet Singh',
    roles: ['Video Editor'],
    image: '/images/hero/gurkreet.jpeg',
    bio: 'Crafting high-converting visual media and video production.',
    socials: {
      linkedin: '#',
    },
  },
  {
    name: 'Pawan Kumar',
    roles: ['UI/UX Designer'],
    image: '/images/hero/pawan.jpeg',
    bio: 'Designing modern Apple-inspired user interfaces and interactive prototypes.',
    socials: {
      linkedin: '#',
    },
  },
  {
    name: 'Dharamveer Singh',
    roles: ['QA Engineer'],
    image: '/images/hero/dharmveer.jpeg',
    bio: 'Ensuring zero-defect deployments, performance testing, and code quality.',
    socials: {
      linkedin: '#',
    },
  },
]

const TeamSection = () => {
  return (
    <section className="py-24 dark:bg-[#050507] bg-slate-50 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Sparkles size={14} className="text-blue-500 animate-spin" />
            The Minds Behind Cortex
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tight mb-4"
          >
            Engineers & <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Visionaries</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Passionate creators driving software innovation, web architecture, and enterprise AI automation.
          </motion.p>
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <CortexNeuralCard className="h-full flex flex-col justify-between text-center">
                <div>
                  {/* Member Avatar */}
                  <div className="relative w-28 h-28 mx-auto mb-6 rounded-3xl overflow-hidden border-2 border-blue-500/30 p-1 shadow-xl bg-gradient-to-br from-blue-600 to-indigo-600">
                    <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-zinc-900">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Name & Bio */}
                  <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white mb-2">{member.name}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{member.bio}</p>

                  {/* Role Badges */}
                  <div className="flex flex-wrap justify-center gap-1.5 mb-6">
                    {member.roles.map((role, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-center gap-3">
                  {member.socials.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-blue-500 transition"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={16} />
                    </a>
                  )}
                  {member.socials.twitter && (
                    <a
                      href={member.socials.twitter}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-blue-400 transition"
                      aria-label="Twitter"
                    >
                      <Twitter size={16} />
                    </a>
                  )}
                </div>

              </CortexNeuralCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default TeamSection
