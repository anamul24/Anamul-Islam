'use client';

import { motion } from 'motion/react';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950 relative overflow-hidden transition-colors">
      <div className="absolute inset-0 tech-grid opacity-[0.02] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-2xl font-bold tracking-tighter mb-2">
              <span className="text-slate-900 dark:text-white transition-colors">ANAM</span><span className="text-amber-500">.</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-xs transition-colors">
              Designing and developing beautiful digital experiences that make a difference.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-slate-600 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors text-sm">Credits</a>
          </div>

          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-500 text-sm font-sans transition-colors">
            <span>Built with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Heart size={14} className="text-rose-500 fill-rose-500" />
            </motion.div>
            <span>by Anamul Islam © 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
