'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-white/80 dark:bg-black/60 backdrop-blur-lg border-b border-slate-200 dark:border-white/5 shadow-sm' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          <span className="text-slate-900 dark:text-white">ANAM</span><span className="text-amber-500 transition-colors">.</span>
        </motion.div>
        <div className="hidden lg:flex items-center gap-8 bg-slate-100/80 dark:bg-slate-900/40 backdrop-blur-md px-8 py-2.5 rounded-full border border-slate-200 dark:border-white/5 shadow-xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-4"
        >
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500 dark:hover:bg-amber-500 transition-all shadow-xl border border-amber-500/20"
          >
            Contact
          </a>
        </motion.div>
        <div className="flex items-center gap-4 lg:hidden">
          <button
            className="text-slate-900 dark:text-slate-200 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-2xl font-bold text-slate-700 dark:text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 transition-colors uppercase tracking-tighter"
                >
                  {link.name}
                </a>
              ))}
              
              <a
                href="#contact"
                onClick={closeMenu}
                className="w-full py-4 rounded-xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 text-center font-bold uppercase tracking-widest text-xs"
              >
                Contact
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
