'use client';

import { motion } from 'motion/react';

export default function SkillBadge({ name, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ 
        type: 'spring', 
        damping: 15, 
        stiffness: 120,
        duration: 0.8
      }}
      whileHover={{ 
        scale: 1.02, 
        y: -2,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(251, 191, 36, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-100 dark:bg-white/[0.02] backdrop-blur-md border border-slate-200 dark:border-white/[0.05] text-slate-700 dark:text-slate-300 transition-all duration-500 group shadow-sm dark:shadow-none"
    >
      {icon && <span className="text-slate-500 dark:text-slate-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-500 opacity-60 group-hover:opacity-100">{icon}</span>}
      <span className="text-xs font-bold tracking-[0.2em] uppercase group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-500">{name}</span>
    </motion.div>
  );
}
