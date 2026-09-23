'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Github, Download, ExternalLink, Network, ChevronRight } from 'lucide-react';

const DEFAULT_LABS = [
  {
    id: 'lab-enterprise-network',
    title: 'Enterprise Three-Tier Network',
    description:
      'Multi-layer enterprise network with core, distribution, and access layers. Includes inter-VLAN routing, EtherChannel, OSPF, and centralized DHCP.',
    technologies: ['Cisco IOS', 'Cisco Packet Tracer'],
    concepts: ['VLAN', 'Inter-VLAN Routing', 'EtherChannel', 'OSPF', 'DHCP', 'Trunking'],
    category: 'routing',
    image: '/image/threeTireNet.png',
    github: 'https://github.com/anamul24',
    pktFile: '',
    docLink: '',
    featured: true,
  },
];

const FILTERS = [
  { key: 'all', label: 'All Labs' },
  { key: 'routing', label: 'Routing' },
  { key: 'switching', label: 'Switching' },
  { key: 'vlan', label: 'VLAN' },
  { key: 'security', label: 'Security' },
  { key: 'mikrotik', label: 'MikroTik' },
  { key: 'cisco', label: 'Cisco' },
];

const CONCEPT_COLORS = {
  'default': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
};

const CATEGORY_CONFIG = {
  routing: { color: '#10b981', label: 'Routing' },
  switching: { color: '#6366f1', label: 'Switching' },
  vlan: { color: '#3b82f6', label: 'VLAN' },
  security: { color: '#ef4444', label: 'Security' },
  mikrotik: { color: '#f59e0b', label: 'MikroTik' },
  cisco: { color: '#0ea5e9', label: 'Cisco' },
  default: { color: '#10b981', label: 'Lab' },
};

function LabModal({ lab, onClose }) {
  const cat = CATEGORY_CONFIG[lab.category] || CATEGORY_CONFIG.default;

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0a0a0a] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="h-[2px] w-full rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
        />
        <div className="relative h-52 sm:h-64 bg-gradient-to-br from-slate-900 to-black overflow-hidden">
          {lab.image ? (
            <Image
              src={lab.image}
              alt={`${lab.title} -- network topology`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <Network size={64} className="opacity-10" style={{ color: cat.color }} />
              <span className="text-xs text-slate-600 tracking-widest uppercase font-bold">Network Topology</span>
            </div>
          )}
          <div
            className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest border"
            style={{ color: cat.color, borderColor: `${cat.color}40`, background: `${cat.color}15` }}
          >
            {cat.label}
          </div>
          <button
            onClick={onClose}
            aria-label="Close lab detail"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all"
          >
            ✕
          </button>
        </div>
        <div className="p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white mb-3 leading-snug">{lab.title}</h2>
            <p className="text-slate-400 text-sm leading-relaxed">{lab.description}</p>
          </div>
          {lab.technologies?.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-500/70 mb-3">Technologies</p>
              <div className="flex flex-wrap gap-2">
                {lab.technologies.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
          {lab.concepts?.length > 0 && (
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-3">Concepts Covered</p>
              <div className="flex flex-wrap gap-2">
                {lab.concepts.map((c) => (
                  <span key={c} className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-white/[0.07] text-slate-300 text-[11px] font-bold uppercase tracking-wide">
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-3 pt-2 border-t border-white/[0.05]">
            {lab.pktFile && (
              <a href={lab.pktFile} download
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all">
                <Download size={14} /> Download .pkt
              </a>
            )}
            {lab.docLink && (
              <a href={lab.docLink} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/10 transition-all">
                <ExternalLink size={14} /> Docs
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function LabCard({ lab, index, onOpen }) {
  const cat = CATEGORY_CONFIG[lab.category] || CATEGORY_CONFIG.default;
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col rounded-2xl overflow-hidden border border-white/[0.07] bg-white/[0.02] hover:border-emerald-500/30 hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-pointer"
      onClick={() => onOpen(lab)}
      role="button"
      tabIndex={0}
      aria-label={`Open ${lab.title} lab details`}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen(lab); }}
    >
      <div
        className="h-[2px] w-full"
        style={{ background: `linear-gradient(90deg, transparent, ${cat.color}60, transparent)` }}
      />
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-900 to-black">
        {lab.image ? (
          <>
            <Image
              src={lab.image}
              alt={`${lab.title} -- network topology`}
              fill
              className="object-cover opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
              }}
            />
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <Network size={48} className="opacity-10" style={{ color: cat.color }} aria-hidden="true" />
            <span className="text-[10px] text-slate-700 tracking-widest uppercase font-bold">{cat.label} Lab</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div
          className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest border"
          style={{ color: cat.color, borderColor: `${cat.color}40`, background: `${cat.color}15` }}
        >
          {cat.label}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/20 text-white text-[11px] font-bold backdrop-blur-sm">
            View Details
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 p-5 gap-4">
        <div>
          <h3 className="text-white font-bold text-base mb-2 group-hover:text-emerald-400 transition-colors duration-300 leading-snug">
            {lab.title}
          </h3>
          <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
            {lab.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5" role="list" aria-label="Networking concepts">
          {lab.concepts?.slice(0, 5).map(c => (
            <span
              key={c}
              role="listitem"
              className={`px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wide ${CONCEPT_COLORS[c] || CONCEPT_COLORS.default}`}
            >
              {c}
            </span>
          ))}
          {lab.concepts?.length > 5 && (
            <span className="px-2 py-0.5 rounded border border-white/10 text-[10px] text-slate-500">
              +{lab.concepts.length - 5}
            </span>
          )}
        </div>
        <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-white/[0.05]">
          {lab.github && (
            <a
              href={lab.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${lab.title} on GitHub`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
            >
              <Github size={13} aria-hidden="true" /> GitHub
            </a>
          )}
          {lab.pktFile && (
            <a
              href={lab.pktFile}
              download
              aria-label={`Download ${lab.title} Packet Tracer file`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all"
            >
              <Download size={13} aria-hidden="true" /> .pkt File
            </a>
          )}
          {lab.docLink && (
            <a
              href={lab.docLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View documentation for ${lab.title}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/10 transition-all"
            >
              <ExternalLink size={13} aria-hidden="true" /> Docs
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function NetworkLabs() {
  const [labs, setLabs] = useState(DEFAULT_LABS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedLab, setSelectedLab] = useState(null);

  useEffect(() => {
    fetch('/api/admin/data?section=labs')
      .then(r => r.json())
      .then(d => {
        if (Array.isArray(d) && d.length) {
          const merged = d.map((lab) => {
            const def = DEFAULT_LABS.find((dl) => dl.id === lab.id);
            return { ...lab, image: lab.image || def?.image || '' };
          });
          setLabs(merged);
        }
      })
      .catch(() => { });
  }, []);

  const filtered =
    activeFilter === 'all'
      ? labs
      : labs.filter(
        lab =>
          lab.category === activeFilter ||
          lab.concepts?.some(c => c.toLowerCase().includes(activeFilter)) ||
          lab.technologies?.some(t => t.toLowerCase().includes(activeFilter))
      );

  return (
    <>
      <section id="labs" className="py-24 bg-[#020202] relative overflow-hidden" aria-label="Network labs and projects">
        <div className="absolute inset-0 tech-grid opacity-[0.04] pointer-events-none" aria-hidden="true" />
        <div
          className="absolute top-0 left-0 w-[40vw] h-[40vw] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }}
          aria-hidden="true"
        />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-emerald-500/50" aria-hidden="true" />
              <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-emerald-500/70">
                Hands-On Practice
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Labs</span>
            </h2>
            <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
              Practical networking labs built with Cisco Packet Tracer and MikroTik. Each lab demonstrates
              real-world enterprise network configurations.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-10"
            role="group"
            aria-label="Filter labs by category"
          >
            {FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                aria-pressed={activeFilter === f.key}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all duration-300 ${activeFilter === f.key
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400'
                  }`}
              >
                {f.label}
              </button>
            ))}
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.length > 0 ? (
                filtered.map((lab, i) => <LabCard key={lab.id} lab={lab} index={i} onOpen={setSelectedLab} />)
              ) : (
                <div className="col-span-3 text-center py-20 text-slate-600">
                  <Network size={40} className="mx-auto mb-4 opacity-20" aria-hidden="true" />
                  <p className="text-sm">No labs in this category yet.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <a
              href="https://github.com/anamul24"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View all networking projects on GitHub"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-400 text-xs tracking-widest font-bold transition-colors group"
            >
              <Github size={14} aria-hidden="true" />
              View all on GitHub
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          </motion.div>
        </div>
      </section>
      <AnimatePresence>
        {selectedLab && (
          <LabModal lab={selectedLab} onClose={() => setSelectedLab(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
