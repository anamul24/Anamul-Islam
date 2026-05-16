'use client';

import { motion } from 'motion/react';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="relative py-32 bg-black overflow-hidden transition-colors">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-slate-100/50 to-white dark:from-black dark:via-slate-900/10 dark:to-black pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative mb-12 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -50 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] max-w-sm mx-auto lg:ml-0 rounded-t-[140px] rounded-b-[40px] overflow-hidden border border-amber-500/10 group shadow-2xl bg-slate-900"
            >
              <div className="absolute inset-0 tech-grid opacity-10" />
              <Image
                src="/image/anamul islam.png"
                alt="Portrait"
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 ring-1 ring-inset ring-amber-500/20 rounded-t-[140px] rounded-b-[40px]" />
            </motion.div>
            
          </div>
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 text-amber-600 dark:text-amber-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-8"
            >
              <div className="w-12 h-[1px] bg-amber-600 dark:bg-amber-500" />
              The Journey
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-none tracking-tighter mb-10 overflow-visible"
            >
              About My <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-200 to-white/10">Self </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6 text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-relaxed"
            >
              <p>
                Hi, I’m Anamul Islam — a passionate web developer and networking enthusiast who enjoys building modern, responsive, and user-friendly applications. I love working with technologies like React, Next.js, and Tailwind CSS to create clean and interactive digital experiences.
              </p>
              <p> Alongside web development, I have also completed a networking course, which helped me gain knowledge about computer networks, connectivity, and system communication. I’m always learning new technologies and improving my skills through real projects and challenges.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.15,
                    delayChildren: 0.5
                  }
                }
              }}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 w-full"
            >
              {[
              ].map((stat) => (
                <motion.div 
                  key={stat.label} 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  className="flex flex-col gap-1 border-l border-slate-200 dark:border-white/10 pl-6"
                >
                  <span className="text-slate-900 dark:text-white text-3xl font-black">{stat.value}</span>
                  <span className="text-slate-400 dark:text-slate-500 text-[9px] uppercase tracking-widest font-bold">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-100/20 dark:from-slate-900/20 to-transparent pointer-events-none" />
    </section>
  );
}
