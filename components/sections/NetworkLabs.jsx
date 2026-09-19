'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Github, Download, ExternalLink, Network } from 'lucide-react';

const DEFAULT_LABS = [
  {
    id: 'lab-enterprise-network',
    title: 'Enterprise Three-Tier Network',
    description:
      'Multi-layer enterprise network with core, distribution, and access layers. Includes inter-VLAN routing, EtherChannel, OSPF, and centralized DHCP.',
    technologies: ['Cisco IOS', 'Cisco Packet Tracer'],
    concepts: ['VLAN', 'Inter-VLAN Routing', 'EtherChannel', 'OSPF', 'DHCP', 'Trunking'],
    category: 'routing',
    image: '/image/networking.jpg',
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
  'VLAN': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'OSPF': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'DHCP': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'NAT': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'ACL': 'bg-red-500/10 text-red-400 border-red-500/20',
  'default': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

function LabCard({ lab, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all duration-300 hover:bg-white/[0.04]"
    >
      {/* Featured badge */}
      {lab.featured && (
        <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-bold uppercase tracking-widest">
          Featured
        </div>
      )}

      {/* Lab image / topology */}
      <div className="relative h-44 bg-gradient-to-br from-slate-900 to-black overflow-hidden">
        {lab.image ? (
          <Image
            src={lab.image}
            alt={`${lab.title} — network topology diagram`}
            fill
            className="object-cover opacity-50 group-hover:opacity-65 transition-opacity duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Network size={48} className="text-emerald-500/20" aria-hidden="true" />
          </div>
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
        {/* Technology tags */}
        <div className="absolute bottom-3 left-4 flex flex-wrap gap-1.5">
          {lab.technologies?.map(t => (
            <span
              key={t}
              className="px-2 py-1 bg-black/60 border border-white/10 rounded text-xs font-bold uppercase tracking-wide text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-white font-bold text-base mb-2 group-hover:text-emerald-400 transition-colors">
          {lab.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
          {lab.description}
        </p>

        {/* Concept tags */}
        <div className="flex flex-wrap gap-1.5 mb-5" role="list" aria-label="Networking concepts covered">
          {lab.concepts?.slice(0, 5).map(c => (
            <span
              key={c}
              role="listitem"
              className={`px-2 py-1 rounded border text-xs font-bold uppercase tracking-wide ${CONCEPT_COLORS[c] || CONCEPT_COLORS.default}`}
            >
              {c}
            </span>
          ))}
          {lab.concepts?.length > 5 && (
            <span className="px-2 py-1 rounded border border-white/10 text-xs text-slate-500">
              +{lab.concepts.length - 5} more
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2">
          {lab.github && (
            <a
              href={lab.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${lab.title} on GitHub`}
              className="flex items-center gap-1.5 px-3 py-2 min-h-[36px] rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/10 hover:text-white transition-all"
            >
              <Github size={13} aria-hidden="true" /> GitHub
            </a>
          )}
          {lab.pktFile && (
            <a
              href={lab.pktFile}
              download
              aria-label={`Download ${lab.title} Packet Tracer file`}
              className="flex items-center gap-1.5 px-3 py-2 min-h-[36px] rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all"
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
              className="flex items-center gap-1.5 px-3 py-2 min-h-[36px] rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-bold hover:bg-white/10 transition-all"
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

  useEffect(() => {
    fetch('/api/admin/data?section=labs')
      .then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length) setLabs(d); })
      .catch(() => {});
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
    <section id="labs" className="py-24 bg-[#020202] relative overflow-hidden" aria-label="Network labs and projects">
      {/* Background */}
      <div className="absolute inset-0 tech-grid opacity-[0.04] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Network size={16} className="text-emerald-500" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.35em] text-emerald-500/70">
              Hands-On Practice
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4">
            Network <span className="text-emerald-500">Labs</span>
          </h2>
          <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
            Practical networking labs built with Cisco Packet Tracer and MikroTik. Each lab demonstrates
            real-world enterprise network configurations.
          </p>
        </motion.div>

        {/* Filter tabs */}
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
              className={`px-4 py-2 min-h-[38px] rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeFilter === f.key
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:border-emerald-500/30 hover:text-emerald-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Labs grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.length > 0 ? (
              filtered.map((lab, i) => <LabCard key={lab.id} lab={lab} index={i} />)
            ) : (
              <div className="col-span-3 text-center py-16 text-slate-600">
                <Network size={40} className="mx-auto mb-4 opacity-30" aria-hidden="true" />
                <p className="text-sm">No labs in this category yet.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
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
            className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-400 text-xs uppercase tracking-widest font-bold transition-colors"
          >
            <Github size={14} aria-hidden="true" /> View all on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
