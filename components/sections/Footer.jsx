'use client';

import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Heart } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Networking', href: '#labs' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/anamul24',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/anamul-islam-ab907a242',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:anamulislamsumon01@gmail.com',
  },
];

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer className="py-12 border-t border-slate-900 bg-slate-950 relative overflow-hidden" aria-label="Site footer">
      <div className="absolute inset-0 tech-grid opacity-[0.02] pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <img 
                src="/anam.png" 
                alt="Anamul Islam Logo" 
                className="w-10 h-10 object-cover rounded-full border border-white/10"
              />
              <div className="text-2xl font-bold tracking-tighter">
                <span className="text-white">ANAM</span>
                <span className="text-emerald-500">.</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Network Engineer &amp; MERN Stack Developer based in Dhaka, Bangladesh.
              Building reliable networks and modern web applications.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-slate-500 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social / contact */}
          <div>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Connect</h3>
            <div className="flex flex-col gap-3">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={`${item.label} — ${item.href.replace('mailto:', '').replace('https://', '')}`}
                    className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors text-sm group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 group-hover:text-emerald-400 transition-all">
                      <Icon size={15} aria-hidden="true" />
                    </span>
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-600 text-sm">
            <span>Built with</span>
            <motion.span
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              aria-hidden="true"
            >
              <Heart size={13} className="text-rose-500 fill-rose-500 inline" />
            </motion.span>
            <span>by Anamul Islam © {new Date().getFullYear()}</span>
          </div>
          <div className="text-slate-700 text-xs">
            Network Engineer · MERN Stack Developer
          </div>
        </div>
      </div>
    </footer>
  );
}
