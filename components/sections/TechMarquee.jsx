'use client';

import { motion } from 'motion/react';
import { Cpu, Terminal, Database, Palette, Globe, Server } from 'lucide-react';
import SkillBadge from '../ui/SkillBadge';

const techStack = [
  { name: 'React', icon: <Globe size={18} /> },
  { name: 'Next.js', icon: <Server size={18} /> },
  { name: 'C', icon: <Terminal size={18} /> },
  { name: 'Tailwind CSS', icon: <Palette size={18} /> },
  { name: 'Node.js', icon: <Database size={18} /> },
  { name: 'JAVA', icon: <Terminal size={18} /> },
  { name: 'Framer Motion', icon: <Cpu size={18} /> },
  { name: 'Firebase', icon: <Database size={18} /> },
  { name: 'Javascript', icon: <Terminal size={18} /> },
  { name: 'C++', icon: <Terminal size={18} /> },
  
  
];

export default function TechMarquee() {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black transition-colors">
      <div className="absolute inset-0 tech-grid opacity-[0.05] pointer-events-none z-0" />
      <div className="absolute inset-0 tech-dot-grid opacity-[0.08] pointer-events-none z-0" />
      
      <div className="container mx-auto px-6 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-amber-600 dark:text-amber-500/80 font-bold tracking-[0.4em] uppercase text-[10px] mb-6"
        >
          Curated Tech Stack
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-light tracking-tight text-slate-900 dark:text-white mb-2"
        >
          Industry Standard <span className="italic text-slate-500 dark:text-slate-400">Toolkit</span>
        </motion.h2>
        <div className="w-12 h-[1px] bg-amber-500/30 mx-auto mt-8" />
      </div>

      <div className="relative z-10">
        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-white dark:from-black via-white/80 dark:via-black/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-white dark:from-black via-white/80 dark:via-black/80 to-transparent z-10 pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="flex overflow-hidden group select-none py-6"
        >
          <div className="flex space-x-8 animate-marquee whitespace-nowrap group-hover:pause-marquee">
            {[...techStack, ...techStack].map((tech, i) => (
              <SkillBadge key={`${tech.name}-${i}`} name={tech.name} icon={tech.icon} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="flex overflow-hidden group select-none py-6 mb-16"
        >
          <div className="flex space-x-8 animate-marquee-reverse whitespace-nowrap group-hover:pause-marquee">
            {[...techStack].reverse().concat(techStack).map((tech, i) => (
              <SkillBadge key={`${tech.name}-rev-${i}`} name={tech.name} icon={tech.icon} />
            ))}
          </div>
        </motion.div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); }
        }
        @keyframes marquee-reverse {
          0% { transform: translateX(calc(-50% - 1rem)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
        .animate-marquee-reverse {
          animation: marquee-reverse 50s linear infinite;
        }
        .pause-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
