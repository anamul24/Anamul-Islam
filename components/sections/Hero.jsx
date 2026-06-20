'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const ROLES = [
  'FULL STACK DEVELOPER',
  'NETWORK ENGINEER',
  'UI/UX DESIGNER',
  'PROBLEM SOLVER',
];

function useTypingAnimation(words, { typeSpeed = 80, deleteSpeed = 40, pauseMs = 1800 } = {}) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  // Delay start until page loaded
  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const current = words[wordIndex];

    if (!isDeleting && displayText === current) {
      // Pause then start deleting
      const t = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const t = setTimeout(
      () => {
        setDisplayText((prev) =>
          isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
        );
      },
      isDeleting ? deleteSpeed : typeSpeed
    );
    return () => clearTimeout(t);
  }, [displayText, isDeleting, wordIndex, words, started, typeSpeed, deleteSpeed, pauseMs]);

  return displayText;
}

export default function Hero() {
  const typedText = useTypingAnimation(ROLES);

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

          {/* Horizontal lines */}
          <div className="flex items-center gap-4 md:gap-12 w-full max-w-6xl overflow-hidden mb-6">
            <motion.div
              initial={{ x: '-101%' }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-amber-500/50"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500/70 whitespace-nowrap"
            >
              Anamul Islam
            </motion.div>
            <motion.div
              initial={{ x: '101%' }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-amber-500/20 to-amber-500"
            />
          </div>

          {/* Typing animation - role text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="w-full max-w-6xl flex items-center justify-center"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[100px] font-black uppercase text-transparent [-webkit-text-stroke:1px_#fbbf24] tracking-[0.08em] text-center min-h-[1.2em] flex items-center justify-center">
              <span>{typedText}</span>
              <span className="inline-block w-[3px] sm:w-[4px] md:w-[5px] h-[0.85em] bg-amber-400 ml-2 align-middle animate-blink" />
            </h1>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="flex flex-col items-center gap-4 mt-10"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 3.5, duration: 1 }}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-600 dark:text-white/40 cursor-pointer hover:text-amber-400 transition-colors"
            >
              Scroll to explore work
            </motion.span>
          </motion.div>

        </div>
      </div>

      {/* Signature bottom right */}
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

          <div className="text-6xl sm:text-7xl md:text-8xl text-amber-500 font-signature rotate-[-8deg] opacity-95 drop-shadow-[0_2px_12px_rgba(251,191,36,0.3)]">
            Anamul Islam
          </div>

        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none z-50" />

    </section>
  );
}