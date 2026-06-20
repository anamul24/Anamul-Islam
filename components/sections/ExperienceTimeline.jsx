'use client';

import { motion } from 'motion/react';
import { Briefcase, Calendar, Code2 } from 'lucide-react';

const experiences = [
  {
    title: 'Full Stack Web Development',
    company: 'Self-Directed / Programming Hero',
    period: 'JAN 2026 - Jun 2026',
    description: 'Mastering modern web technologies including React, Node.js, and Express. Building full-stack projects focusing on scalable architectures and user experience.',
    milestones: ['Completed 15+ real-world projects', 'Mastered MERN Stack'],
  },
  {
    title: 'Networking & Infrastructure',
    company: 'Udemy / David Bombal',
    period: '2026',
    description: 'Developed deep understanding of networking protocols, subnetting, and system security through intensive lab-based learning.',
    milestones: ['CCNA Prep Labs', 'Network Security Foundations'],
  },
];

const education = [
  {
    degree: 'B.Sc. in Computer Science',
    school: 'Northern University Bangladesh',
    period: '2023 - 2026',
    description: 'Specializing in computer science and engineering with a focus on core software development principles and modern technologies.',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    school: 'Gazipur Science College',
    period: '2020 - 2021',
    description: 'Science background with strong foundations in mathematics and logical reasoning.',
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-14 md:py-32 bg-black px-4 md:px-8 relative overflow-hidden transition-colors">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.05] dark:opacity-[0.02]">
        <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] border border-slate-900 dark:border-white/5 rounded-[200px] rotate-45 transition-colors" />
        <div className="absolute -bottom-20 -right-20 w-[400px] h-[400px] border border-slate-900 dark:border-white/5 rounded-full transition-colors" />
      </div>
      
      <div className="absolute inset-0 tech-grid opacity-[0.07] pointer-events-none z-0" />
      <div className="absolute inset-0 tech-dot-grid opacity-[0.1] pointer-events-none z-0" />
      <div className="absolute inset-0 scanlines opacity-[0.02] pointer-events-none z-0" />

      <div className="container mx-auto relative z-10">
        <div className="mb-10 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-amber-600 dark:text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 flex items-center gap-3"
            >
              <div className="w-10 h-[1px] bg-amber-600 dark:bg-amber-500" />
              Journey & Growth
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter"
            >
              Education and <br />
              <span className="text-slate-400 dark:text-slate-500">Experience.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-xs text-sm font-medium leading-relaxed italic"
          >
            A decade of perfecting digital experiences through continuous learning and impactful engineering.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 relative">
          <div className="flex flex-col gap-6 md:gap-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-500">
                <Briefcase size={20} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">Experience</h3>
            </div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2 }
                }
              }}
              className="space-y-6 md:space-y-12"
            >
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.title}
                  variants={{
                    hidden: { opacity: 0, x: -30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="group relative p-6 md:p-10 rounded-[24px] md:rounded-[40px] bg-slate-100/50 dark:bg-slate-500/[0.03] border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-500/[0.06] hover:border-amber-500/30 transition-all duration-500"
                >
                  <div className="absolute top-8 right-8 text-slate-900/5 dark:text-white/5 font-black text-6xl group-hover:text-amber-500/10 transition-colors">
                    0{index + 1}
                  </div>

                  <div className="text-amber-600 dark:text-amber-500 font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center gap-3">
                    <Calendar size={12} />
                    {exp.period}
                  </div>
                  <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{exp.title}</h4>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-6 italic">{exp.company}</div>
                  <p className="text-slate-700 dark:text-slate-500 text-sm leading-relaxed mb-5 md:mb-8 max-w-md">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.milestones.map(m => (
                      <span key={m} className="px-4 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-500/5 border border-slate-200 dark:border-white/5 text-[9px] text-slate-500 dark:text-white/40 font-bold uppercase tracking-widest group-hover:border-amber-500/20 group-hover:text-amber-600 dark:group-hover:text-amber-500/60 transition-all">
                        {m}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="flex flex-col gap-6 md:gap-12">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500">
                <Code2 size={20} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-wider">Education</h3>
            </div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.2, delayChildren: 0.3 }
                }
              }}
              className="space-y-6 md:space-y-12"
            >
              {education.map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  variants={{
                    hidden: { opacity: 0, x: 30 },
                    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                  }}
                  className="group relative p-6 md:p-10 rounded-[24px] md:rounded-[40px] bg-slate-100/50 dark:bg-slate-500/[0.03] border border-slate-200 dark:border-white/5 hover:bg-slate-100 dark:hover:bg-slate-500/[0.06] hover:border-blue-500/30 transition-all duration-500"
                >
                  <div className="text-blue-600 dark:text-blue-500 font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center gap-3">
                    <Calendar size={12} />
                    {edu.period}
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">{edu.degree}</h4>
                  <div className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-6 italic">{edu.school}</div>
                  <p className="text-slate-700 dark:text-slate-500 text-sm leading-relaxed max-w-sm">
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
