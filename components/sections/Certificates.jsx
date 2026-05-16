'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Search, X } from 'lucide-react';

const certificates = [
  {
    title: 'Full Stack Web Development',
    issuer: 'Udemy / Dr. Angela Yu',
    date: '2024',
    image: '/image/fullstack.jpg',
  },
  {
    title: 'Professional Networking Course',
    issuer: 'Udemy / David Bombal',
    date: '2024',
    image: '/image/networking.jpg',
  },
  {
    title: 'Complete Web Development',
    issuer: 'Programming Hero',
    date: '2024',
    image: '',
  },
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="py-24 bg-black relative overflow-hidden transition-colors">
      <div className="absolute inset-0 tech-grid opacity-[0.05] pointer-events-none z-0" />
      <div className="absolute inset-0 tech-dot-grid opacity-[0.08] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase text-xs mb-4"
            >
              <Award size={16} />
              <span>Verify Skills</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white"
            >
              Badges & <span className="text-slate-400 dark:text-slate-500">Certificates</span>
            </motion.h2>
          </div>
          <p className="max-w-md text-slate-700 dark:text-slate-400 text-sm leading-relaxed">
            Continuous learning is part of my DNA. Here are some of the professional
            certifications I&apos;ve earned to validate my technical expertise.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
              }}
              className="group relative"
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg dark:shadow-xl">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-cover group-hover:opacity-80 transition-opacity"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-950 via-white/40 dark:via-slate-950/40 to-transparent opacity-100 group-hover:opacity-0 transition-opacity" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none group-hover:opacity-0 transition-opacity">
                  <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-widest mb-1">
                    {cert.issuer}
                  </div>
                  <h3 className="text-slate-900 dark:text-white font-bold text-sm leading-tight">
                    {cert.title}
                  </h3>
                </div>

                <div
                  className="absolute inset-0 bg-amber-400/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={() => setSelectedCert(cert)}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-amber-400 flex items-center justify-center text-white dark:text-slate-950 shadow-xl shadow-amber-400/40">
                    <Search size={22} />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] text-slate-600 dark:text-slate-500 font-bold uppercase tracking-widest">{cert.date}</span>
                <span className="text-[10px] text-slate-600 dark:text-slate-500 font-bold uppercase tracking-widest cursor-pointer hover:text-amber-600 dark:hover:text-amber-400">Verify</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-100/90 dark:bg-slate-950/90 backdrop-blur-md"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[32px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-950/50 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-white hover:bg-amber-400 hover:text-slate-950 transition-all font-sans"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 flex items-center justify-center bg-white p-4">
                  <div className="relative w-full h-[500px]">
                    <Image
                      src={selectedCert.image}
                      alt={selectedCert.title}
                      fill
                      className="object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="md:w-2/5 p-8 md:p-12 flex flex-col justify-center">
                  <div className="text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase text-xs mb-4">
                    Official Certification
                  </div>
                  <h3 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
                    {selectedCert.title}
                  </h3>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-full bg-slate-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                      <Award size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Issuer</div>
                      <div className="text-slate-700 dark:text-slate-400 font-medium">{selectedCert.issuer}</div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-sm text-slate-600 dark:text-slate-400 italic mb-8">
                    &quot;Successfully completed the rigorous evaluation and demonstrated
                    mastery of professional competencies in software engineering.&quot;
                  </div>

                  <button
                    className="w-full py-4 rounded-xl bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 font-bold text-center hover:bg-slate-800 dark:hover:bg-amber-300 transition-all font-sans"
                  >
                    Verify Credential
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
