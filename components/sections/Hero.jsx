'use client';

import Image from 'next/image';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center bg-black overflow-hidden selection:bg-amber-400 selection:text-black">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/image/anamul islam.png"
            alt="Anamul Islam Portrait"
            fill
            className="object-cover object-[center_35%] grayscale brightness-[0.7] dark:brightness-[0.3] contrast-[1.1]"
            priority
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent dark:from-black dark:via-transparent dark:to-transparent opacity-90" />
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute inset-0 tech-grid pointer-events-none z-0"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2, delay: 1.2 }}
        className="absolute inset-0 tech-dot-grid pointer-events-none z-0"
      />

      <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none z-40" />
      <div className="container mx-auto px-8 md:px-12 relative z-20 h-full flex flex-col items-center justify-center">

        <div className="w-full flex flex-col items-center">
          <div className="flex items-center gap-4 md:gap-12 w-full max-w-6xl overflow-hidden">

            <motion.div
              initial={{ x: "-101%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-amber-500/50"
            />

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-[150px] font-black uppercase text-transparent [-webkit-text-stroke:1px_#fbbf24] tracking-[0.1em]">
              ANAMUL ISLAM
            </motion.h1>

            <motion.div
              initial={{ x: "101%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-amber-500/20 to-amber-500"
            />

          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="flex flex-col items-center gap-4 mt-10"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 3, duration: 1 }}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 dark:text-white/40 cursor-pointer hover:text-amber-400 transition-colors"
            >
              Scroll to explore work
            </motion.span>
          </motion.div>

        </div>
      </div>
      <div className="absolute bottom-12 right-6 md:right-12 z-40 flex flex-col items-end gap-1">

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="flex flex-col items-end"
        >

          <div className="text-[10px] md:text-[15px] font-mono uppercase tracking-[0.4em] text-amber-500/50 mb-2">
            Signature
          </div>

          <div className="text-5xl md:text-6xl text-amber-700 font-[Pinyon_Script] rotate-[-8deg] opacity-90">
            Anamul Islam
          </div>

        </motion.div>

      </div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none z-50" />

    </section>
  );
}