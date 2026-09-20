'use client';

import { motion } from 'motion/react';
import { Briefcase, Calendar, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ExperienceTimeline() {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    fetch('/api/admin/data?section=experience')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setExperiences(d); })
      .catch(() => {});
    fetch('/api/admin/data?section=education')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setEducation(d); })
      .catch(() => {});
  }, []);

  return (
    <section
      id="experience"
      className="py-14 md:py-32 bg-transparent px-4 md:px-8 relative overflow-hidden"
      aria-label="Education and experience"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" aria-hidden="true">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] border border-white/5 rounded-[200px] rotate-45" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] border border-white/5 rounded-full" />
      </div>

      <div className="absolute inset-0 tech-grid opacity-[0.05] pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute inset-0 tech-dot-grid opacity-[0.07] pointer-events-none z-0" aria-hidden="true" />

      <div className="container mx-auto relative z-10">
        <div className="mb-10 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-xs mb-4 flex items-center gap-3"
            >
              <div className="w-10 h-[1px] bg-emerald-500" aria-hidden="true" />
              Journey &amp; Growth
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-black text-white tracking-tighter"
            >
              Education and <br />
              <span className="text-slate-500">Experience.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-xs text-sm font-medium leading-relaxed"
          >
            Continuous learning and growth in networking, infrastructure, and web development.
          </motion.p>
        </div>

        <div className="flex justify-center relative">
          {/* Education section */}
          <div className="flex flex-col gap-6 md:gap-12 w-full max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <GraduationCap size={20} aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Education</h3>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
              }}
              className="space-y-6 md:space-y-10"
            >
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  className="group relative p-6 md:p-10 rounded-3xl bg-white/[0.02] backdrop-blur-md border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:bg-white/[0.04] hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                >
                  <div className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-3">
                    <Calendar size={12} aria-hidden="true" />
                    {edu.period}
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                    {edu.degree}
                  </h4>
                  <div className="text-slate-400 text-sm font-medium mb-5 italic">{edu.school}</div>
                  <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                    {edu.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
