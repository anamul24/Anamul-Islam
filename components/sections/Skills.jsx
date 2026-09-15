'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Globe, Wifi } from 'lucide-react';

const CATEGORY_MAP = {
  networking: { title: 'Networking', icon: <Wifi size={24} className="text-indigo-400" /> },
  web: { title: 'Web Development', icon: <Globe size={24} className="text-amber-400" /> },
  language: { title: 'Languages', icon: <Terminal size={24} className="text-emerald-400" /> },
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

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#020202] transition-colors">
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#020202] pointer-events-none z-[1]" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-amber-500/80 font-bold tracking-[0.4em] uppercase text-[10px] mb-6"
          >
            Curated Tech Stack
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-2"
          >
            Industry Standard <span className="italic text-slate-400 font-serif">Toolkit</span>
          </motion.h2>
          <div className="w-12 h-[1px] bg-amber-500/30 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {Object.entries(CATEGORY_MAP).map(([key, config], idx) => {
            const skills = categorizedSkills[key] || [];
            if (skills.length === 0) return null;
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.8, ease: "easeOut" }}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-white/15 to-white/5 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition duration-500" />
                
                <div className="relative h-full p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-md overflow-hidden hover:bg-white/[0.04] transition-colors duration-500">
                  {/* Subtle background highlight */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none group-hover:bg-white/[0.04] transition-colors duration-500" />
                  
                  <div className="flex items-center gap-4 mb-8 relative z-10">
                    <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] shadow-inner">
                      {config.icon}
                    </div>
                    <h3 className="text-lg font-bold tracking-widest text-white/90 uppercase">{config.title}</h3>
                  </div>

                  <div className="flex flex-wrap gap-3 relative z-10">
                    {skills.map((skill, i) => (
                      <div 
                        key={i} 
                        className="px-4 py-2 rounded-lg bg-black/40 border border-white/5 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300 cursor-default"
                      >
                        {skill.name}
                      </div>
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
