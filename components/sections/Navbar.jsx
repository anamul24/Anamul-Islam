'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Labs', href: '#labs' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const tapTimerRef = useState(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Secret keyboard shortcut: Ctrl + Shift + A → Admin panel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        router.push('/nx-panel');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router]);

  // Secret logo tap: 5 quick taps → Admin panel (mobile)
  const handleLogoTap = (e) => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (tapTimerRef[0]) clearTimeout(tapTimerRef[0]);
    if (newCount >= 5) {
      setTapCount(0);
      router.push('/nx-panel');
    } else {
      tapTimerRef[0] = setTimeout(() => setTapCount(0), 3000);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    document.body.style.overflow = '';
    setTimeout(() => {
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'py-3 bg-black/80 backdrop-blur-lg border-b border-white/5 shadow-sm'
        : 'py-5 bg-transparent'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* Logo — secret: 5 taps = admin */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter flex-shrink-0"
        >
          <a href="#" onClick={(e) => { handleLogoTap(e); handleNavClick(e, '#'); }}>
            <span className="text-white">ANAM</span>
            <span className="text-amber-500">.</span>
          </a>
        </motion.div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6 bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-amber-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop right buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-3"
        >
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-amber-500/20 hover:border-amber-500/40 hover:text-amber-400 transition-all"
          >
            Contact
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="px-5 py-2 rounded-full bg-amber-500 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-amber-400 transition-all flex items-center gap-2"
          >
            <Download size={11} /> CV
          </a>
        </motion.div>

        {/* Hamburger */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            className="text-slate-300 p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-5">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-xl font-bold text-slate-400 hover:text-amber-400 transition-colors uppercase tracking-tighter"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-3 pt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex-1 py-3 rounded-xl border border-white/10 text-white text-center font-bold uppercase tracking-widest text-xs hover:border-amber-500/40 transition-all"
                >
                  Contact
                </a>
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-black text-center font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2"
                >
                  <Download size={12} /> Download CV
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
