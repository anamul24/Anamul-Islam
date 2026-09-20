'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const DEFAULT = {
  tagline: 'The Story So Far',
  heading: 'About',
  headingHighlight: 'Me',
  bio: "I'm Anamul, a final-year CSE student in Dhaka, graduating this December. My focus is networking — routing, switching, troubleshooting — and I like working with real hardware, not just diagrams on a screen.\n\nI got into networking through David Bombal's Udemy course, then went further with hands-on CCNA and MikroTik training at CSL Training, working directly with physical devices: VLANs, OSPF routing, DHCP/NAT, EtherChannel. I'm currently preparing for the official CCNA exam.\n\nI also build full-stack web apps with the MERN stack — React, Next.js, Node.js, MongoDB. Learned through Programming Hero and Dr. Angela Yu's bootcamp. It's not the usual pairing with networking, but it means I understand both sides: the application and the infrastructure it runs on.\n\nI'm looking for an entry-level Network Engineer or NOC role in Dhaka. Take a look at what I've built below, or get in touch.",
  stats: [
    { value: 'CCNA', label: 'Training' },
    { value: 'MikroTik', label: 'Training' },
    { value: '50+', label: 'Network Lab Hours' },
    { value: 'MERN', label: 'Stack Development' },
  ],
};

export default function About() {
  const [data, setData] = useState(DEFAULT);

  useEffect(() => {
    fetch('/api/admin/data?section=about')
      .then(r => r.json())
      .then(d => { if (d) setData(d); })
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="relative py-16 md:py-32 bg-[#020202] overflow-hidden">
      {/* Subtle dark background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020202] via-[#050a08] to-[#020202] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none z-0" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          {/* Photo column */}
          <div className="lg:col-span-5 relative mb-6 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] max-w-sm mx-auto lg:ml-0 rounded-t-[140px] rounded-b-[40px] overflow-hidden border border-emerald-500/10 group shadow-2xl bg-slate-900"
            >
              <div className="absolute inset-0 tech-grid opacity-10" aria-hidden="true" />
              <Image
                src="/image/anamul islam.png"
                alt="Anamul Islam — Network Engineer and MERN Stack Developer"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                referrerPolicy="no-referrer"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" aria-hidden="true" />
              <div className="absolute inset-0 ring-1 ring-inset ring-emerald-500/20 rounded-t-[140px] rounded-b-[40px]" aria-hidden="true" />
            </motion.div>
          </div>

          {/* Content column */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 text-emerald-500 font-bold uppercase tracking-[0.4em] text-xs mb-4 md:mb-8"
            >
              <div className="w-12 h-[1px] bg-emerald-500" aria-hidden="true" />
              {data.tagline}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter mb-6 md:mb-10 overflow-visible"
            >
              {data.heading}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-white/10">
                {data.headingHighlight}
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4 text-slate-400 text-base md:text-lg leading-relaxed"
            >
              {(data.bio || '').split(/\n\n+/).map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </motion.div>

            {/* Stats grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.5 },
                },
              }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-14 w-full"
            >
              {data.stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="flex flex-col gap-2 p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all duration-500 group hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                  <span className="text-white text-2xl font-black group-hover:text-emerald-400 transition-colors duration-300 relative z-10">
                    {stat.value}
                  </span>
                  <span className="text-slate-500 text-xs uppercase tracking-widest font-bold group-hover:text-slate-300 transition-colors duration-300 relative z-10">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
