'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Globe, Wifi, Wrench } from 'lucide-react';

// Category map aligned with data categories: networking, web, tools
const CATEGORY_MAP = {
  networking: {
    title: 'Networking',
    icon: <Wifi size={22} aria-hidden="true" className="text-emerald-400" />,
    accent: 'emerald',
    description: 'Cisco, MikroTik, and enterprise network protocols',
  },
  web: {
    title: 'Web Development',
    icon: <Globe size={22} aria-hidden="true" className="text-amber-400" />,
    accent: 'amber',
    description: 'Full-stack MERN development and modern frameworks',
  },
  tools: {
    title: 'Tools & Utilities',
    icon: <Wrench size={22} aria-hidden="true" className="text-slate-300" />,
    accent: 'slate',
    description: 'Network analysis, monitoring, and development tools',
  },
};

const ACCENT_STYLES = {
  emerald: {
    iconBg: 'bg-emerald-500/10 border-emerald-500/20',
    glow: 'from-emerald-500/10 to-emerald-500/5',
    hover: 'hover:border-emerald-500/30',
    badge: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300 hover:text-emerald-200 hover:border-emerald-400/40',
  },
  amber: {
    iconBg: 'bg-amber-500/10 border-amber-500/20',
    glow: 'from-amber-500/10 to-amber-500/5',
    hover: 'hover:border-amber-500/30',
    badge: 'bg-amber-500/10 border-amber-500/20 text-amber-300 hover:text-amber-200 hover:border-amber-400/40',
  },
  slate: {
    iconBg: 'bg-slate-500/10 border-slate-500/20',
    glow: 'from-slate-500/10 to-slate-500/5',
    hover: 'hover:border-slate-400/30',
    badge: 'bg-slate-500/10 border-slate-500/20 text-slate-300 hover:text-slate-200 hover:border-slate-400/40',
  },
};

export default function Skills() {
  const [techStack, setTechStack] = useState([]);

  useEffect(() => {
    fetch('/api/admin/data?section=skills')
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d)) setTechStack(d);
      })
      .catch(() => {});
  }, []);

  const categorizedSkills = techStack.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Maintain display order: networking first (primary), then web, then tools
  const orderedCategories = ['networking', 'web', 'tools'];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#020202]" aria-label="Skills and expertise">
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#020202] pointer-events-none z-[1]" aria-hidden="true" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-500/80 font-bold tracking-[0.4em] uppercase text-xs mb-5"
          >
            Technical Skills
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tight text-white mb-2"
          >
            Skills &amp;{' '}
            <span className="text-slate-500">Expertise</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-sm mt-4 max-w-md mx-auto"
          >
            Networking is my primary focus. Web development is my secondary toolkit.
          </motion.p>
          <div className="w-12 h-[1px] bg-emerald-500/30 mx-auto mt-8" aria-hidden="true" />
        </div>

        {/* Skills grid — networking first, full-width for emphasis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {orderedCategories.map((key, idx) => {
            const config = CATEGORY_MAP[key];
            if (!config) return null;
            const skills = categorizedSkills[key] || [];
            if (skills.length === 0) return null;
            const styles = ACCENT_STYLES[config.accent];

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: 'easeOut' }}
                className="group relative"
              >
                {/* Hover glow */}
                <div className={`absolute -inset-[1px] bg-gradient-to-r ${styles.glow} rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition duration-500`} aria-hidden="true" />

                <div className={`relative h-full p-7 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-md overflow-hidden hover:bg-white/[0.04] transition-colors duration-500 ${styles.hover}`}>
                  {/* Decorative circle */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/[0.015] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" aria-hidden="true" />

                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6 relative z-10">
                    <div className={`p-3 rounded-xl border ${styles.iconBg} shadow-inner flex-shrink-0`}>
                      {config.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold tracking-wide text-white/90 mb-1">
                        {config.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-snug">{config.description}</p>
                    </div>
                  </div>

                  {/* Skill badges */}
                  <div className="flex flex-wrap gap-2 relative z-10">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all duration-300 cursor-default hover:-translate-y-0.5 ${styles.badge}`}
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
