'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';

const LINKEDIN_URL = 'https://www.linkedin.com/in/anamul-islam-ab907a242';
const RESUME_URL = '/resume.pdf'; // Place resume.pdf in /public — falls back to LinkedIn

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Networking', href: '#labs' },
  { name: 'Projects', href: '#projects' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const tapTimerRef = useRef(null);
  const menuRef = useRef(null);
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
    if (tapTimerRef.current) clearTimeout(tapTimerRef.current);
    if (newCount >= 5) {
      setTapCount(0);
      router.push('/nx-panel');
    } else {
      tapTimerRef.current = setTimeout(() => setTapCount(0), 3000);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
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

  // Check if resume exists, else link to LinkedIn
  const handleResumeClick = (e) => {
    // We try to download; if the file doesn't exist, open LinkedIn
    fetch(RESUME_URL, { method: 'HEAD' })
      .then((res) => {
        if (res.ok) {
          const a = document.createElement('a');
          a.href = RESUME_URL;
          a.download = 'Anamul_Islam_Resume.pdf';
          a.click();
        } else {
          window.open(LINKEDIN_URL, '_blank', 'noopener noreferrer');
        }
      })
      .catch(() => {
        window.open(LINKEDIN_URL, '_blank', 'noopener noreferrer');
      });
  };

  return (
    <nav
      ref={menuRef}
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 bg-black/60 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* Logo — secret: 5 taps = admin */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-shrink-0"
        >
          <a
            href="#"
            onClick={(e) => { handleLogoTap(e); handleNavClick(e, '#'); }}
            aria-label="Anamul Islam — scroll to top"
            className="block group"
          >
            <img 
              src="/image/anam.png" 
              alt="Anamul Islam Logo" 
              className="w-10 h-10 object-cover rounded-xl border border-white/10 group-hover:border-emerald-500/50 group-hover:scale-105 transition-all duration-300"
            />
          </a>
        </motion.div>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-6 bg-white/[0.03] backdrop-blur-xl px-7 py-2.5 rounded-full border border-white/10 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-bold uppercase tracking-widest text-slate-300 hover:text-emerald-400 hover:-translate-y-0.5 transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop right — Download Resume */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center gap-3"
        >
          <button
            onClick={handleResumeClick}
            aria-label="Download my resume"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold uppercase tracking-widest hover:scale-[1.05] hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all duration-300 flex items-center gap-2"
          >
            <Download size={13} aria-hidden="true" /> Resume
          </button>
        </motion.div>

        {/* Hamburger */}
        <div className="flex items-center gap-4 lg:hidden">
          <button
            className="text-slate-300 p-2.5 rounded-lg hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-base font-bold text-slate-400 hover:text-emerald-400 transition-colors uppercase tracking-tighter py-3 min-h-[44px] flex items-center"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4">
                <button
                  onClick={handleResumeClick}
                  aria-label="Download my resume"
                  className="w-full py-3.5 min-h-[44px] rounded-xl bg-emerald-600 text-white text-center font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-emerald-500 transition-colors"
                >
                  <Download size={14} aria-hidden="true" /> Download Resume
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
