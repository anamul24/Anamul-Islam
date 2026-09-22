'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Search, X, ExternalLink } from 'lucide-react';

function CertCard({ cert, openCert }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
      }}
      className="group relative"
    >
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-xl flex items-center justify-center p-4">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full h-full relative"
        >
          {cert.image && !imgError ? (
            <Image
              src={cert.image}
              alt={`${cert.title} certificate`}
              fill
              onError={() => setImgError(true)}
              className="object-contain group-hover:opacity-80 transition-opacity"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-xl">
              <Award size={48} className="text-amber-400/40 mb-4" aria-hidden="true" />
              <div className="text-center">
                <div className="text-xs font-bold text-amber-400/60 uppercase tracking-widest mb-2">{cert.issuer}</div>
                <div className="text-white font-bold text-sm leading-tight">{cert.title}</div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Hover overlay — view button */}
        <button
          className="absolute inset-0 bg-amber-400/15 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          onClick={() => openCert(cert)}
          aria-label={`View ${cert.title} certificate details`}
        >
          <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-400/30">
            <Search size={22} aria-hidden="true" />
          </div>
        </button>
      </div>

      {/* Card footer */}
      <div className="mt-4 flex items-center justify-between px-1">
        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{cert.date}</span>
        {cert.verifyUrl ? (
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Verify ${cert.title} certificate`}
            className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs text-slate-300 font-bold uppercase tracking-widest hover:bg-white/10 hover:text-amber-400 hover:border-amber-400/30 transition-all flex items-center gap-1.5"
          >
            Verify <ExternalLink size={12} aria-hidden="true" />
          </a>
        ) : (
          <button
            onClick={() => openCert(cert)}
            aria-label={`View ${cert.title} certificate`}
            className="px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs text-slate-300 font-bold uppercase tracking-widest hover:bg-white/10 hover:text-amber-400 hover:border-amber-400/30 transition-all flex items-center gap-1.5"
          >
            View <Search size={12} aria-hidden="true" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    fetch('/api/admin/data?section=certificates')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d)) setCertificates(d); })
      .catch(() => {});
  }, []);

  // Open modal — push a history entry so back button closes it
  const openCert = useCallback((cert) => {
    setSelectedCert(cert);
    window.history.pushState({ certModal: true }, '');
  }, []);

  // Close modal — go back in history only if we pushed the entry
  const closeCert = useCallback(() => {
    setSelectedCert(null);
    if (window.history.state?.certModal) {
      window.history.back();
    }
  }, []);

  // Listen for hardware/browser back button
  useEffect(() => {
    const handlePopState = () => { setSelectedCert(null); };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    if (!selectedCert) return;
    const handleKey = (e) => { if (e.key === 'Escape') closeCert(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedCert, closeCert]);

  return (
    <section
      id="certificates"
      className="py-12 md:py-24 bg-black relative overflow-hidden"
      aria-label="Certificates and badges"
    >
      <div className="absolute inset-0 tech-grid opacity-[0.04] pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute inset-0 tech-dot-grid opacity-[0.06] pointer-events-none z-0" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-amber-400 font-bold tracking-widest uppercase text-xs mb-4"
            >
              <Award size={16} aria-hidden="true" />
              <span>Verify Skills</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black tracking-tight text-white"
            >
              Badges &amp; <span className="text-slate-500">Certificates</span>
            </motion.h2>
          </div>
          <p className="max-w-md text-slate-400 text-sm leading-relaxed">
            Continuous learning is part of my approach. Here are certifications I&apos;ve earned to validate my technical knowledge.
          </p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {certificates.map((cert) => (
            <CertCard key={cert.id || cert.title} cert={cert} openCert={openCert} />
          ))}
        </motion.div>
      </div>

      {/* Certificate detail modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md"
            onClick={closeCert}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedCert.title} certificate details`}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-[32px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeCert}
                aria-label="Close certificate preview"
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-slate-950/60 border border-white/10 flex items-center justify-center text-white hover:bg-amber-400 hover:text-slate-950 transition-all"
              >
                <X size={20} aria-hidden="true" />
              </button>

              <div className="flex flex-col md:flex-row">
                <div className="md:w-3/5 flex items-center justify-center bg-slate-950 p-4">
                  <div className="relative w-full h-[280px] sm:h-[380px] md:h-[460px]">
                    {selectedCert.image && !imgError ? (
                      <Image
                        src={selectedCert.image}
                        alt={`${selectedCert.title} certificate`}
                        fill
                        className="object-contain"
                        referrerPolicy="no-referrer"
                        onError={() => setImgError(true)}
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Award size={64} className="text-amber-400/30 mb-4" aria-hidden="true" />
                        <p className="text-slate-500 text-sm text-center px-8">Certificate image not available</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:w-2/5 p-8 md:p-10 flex flex-col justify-center">
                  <div className="text-amber-400 font-bold tracking-widest uppercase text-xs mb-4">
                    Certification
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white mb-4 leading-tight">
                    {selectedCert.title}
                  </h3>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center text-amber-400">
                      <Award size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">Issuer</div>
                      <div className="text-slate-300 font-medium">{selectedCert.issuer}</div>
                    </div>
                  </div>

                  {selectedCert.date && (
                    <div className="mb-6 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Year Earned</div>
                      <div className="text-white font-bold">{selectedCert.date}</div>
                    </div>
                  )}

                  {selectedCert.verifyUrl ? (
                    <a
                      href={selectedCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${selectedCert.title} certificate credential`}
                      className="w-full py-4 min-h-[44px] rounded-xl bg-amber-400 text-slate-950 font-bold text-center hover:bg-amber-300 transition-all flex items-center justify-center gap-2"
                    >
                      Verify Credential <ExternalLink size={14} aria-hidden="true" />
                    </a>
                  ) : (
                    <div className="w-full py-4 rounded-xl bg-white/5 border border-white/5 text-slate-500 font-bold text-center text-sm">
                      Verification link not available
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
