'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

/* ─── Roles for typing animation ─── */
const ROLES = [
  'FULL STACK DEVELOPER',
  'NETWORK ENGINEER',
  'UI/UX DESIGNER',
  'PROBLEM SOLVER',
];

/* ─── Typing animation hook ─── */
function useTypingAnimation(words, { typeSpeed = 80, deleteSpeed = 40, pauseMs = 1800 } = {}) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const current = words[wordIndex];
    if (!isDeleting && displayText === current) {
      const t = setTimeout(() => setIsDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const t = setTimeout(() => {
      setDisplayText((prev) =>
        isDeleting ? prev.slice(0, -1) : current.slice(0, prev.length + 1)
      );
    }, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(t);
  }, [displayText, isDeleting, wordIndex, words, started, typeSpeed, deleteSpeed, pauseMs]);

  return displayText;
}

/* ─── Particle Network Canvas (Option B) ─── */
function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const NUM = 90;
    const MAX_DIST = 130;

    class Particle {
      constructor() { this.init(); }
      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.r = Math.random() * 1.8 + 0.8;
        this.alpha = Math.random() * 0.55 + 0.15;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,191,36,${this.alpha})`;
        ctx.fill();
      }
    }

    resize();
    const particles = Array.from({ length: NUM }, () => new Particle());

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < MAX_DIST) {
            const a = (1 - d / MAX_DIST) * 0.28;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(251,191,36,${a})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => { resize(); particles.forEach(p => p.init()); };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />;
}

/* ─── Floating code snippets (Option A) ─── */
const CODE_LINES = [
  'const connect = async () => {',
  'ping 192.168.1.1 -t',
  'npm run build && deploy',
  'git push origin main',
  'router ospf 1 / network 0.0.0.0',
  'ssh admin@192.168.0.1',
  '{ status: 200, ok: true }',
  'router.get("/api/v1", ...)',
  'import { useState } from "react"',
  'sudo iptables -A INPUT -p tcp',
  'traceroute 8.8.8.8',
  'docker-compose up --build',
  'SELECT * FROM users WHERE id=?',
  'vlan 10 / name MANAGEMENT',
  'useEffect(() => { fetch(...) })',
  'nmap -sV 192.168.1.0/24',
];

// Pre-calculated positions to avoid hydration mismatch
const SNIPPET_POSITIONS = CODE_LINES.map((_, i) => ({
  left: `${4 + ((i * 23 + 7) % 88)}%`,
  top:  `${3 + ((i * 17 + 11) % 90)}%`,
  duration: 3.5 + (i % 5) * 0.7,
  delay: i * 0.35,
}));

export default function Hero() {
  const typedText = useTypingAnimation(ROLES);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center bg-[#020202] overflow-hidden selection:bg-amber-400 selection:text-black">

      {/* ── Layer 0: Particle network canvas ── */}
      <div className="absolute inset-0 z-0">
        <ParticleNetwork />
      </div>

      {/* ── Layer 1: Floating code snippets ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-[9px] sm:text-[11px] text-amber-400/18 whitespace-nowrap select-none"
            style={{ left: SNIPPET_POSITIONS[i].left, top: SNIPPET_POSITIONS[i].top }}
            animate={{ y: [0, -18, 0], opacity: [0.08, 0.28, 0.08] }}
            transition={{
              duration: SNIPPET_POSITIONS[i].duration,
              repeat: Infinity,
              delay: SNIPPET_POSITIONS[i].delay,
              ease: 'easeInOut',
            }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* ── Layer 2: Gradient vignette ── */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/70 via-black/10 to-black/80" />

      {/* ── Layer 3: Tech grid ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute inset-0 tech-grid pointer-events-none z-[3]"
      />
      <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none z-[4]" />

      {/* ── Layer 10: Main content ── */}
      <div className="container mx-auto px-8 md:px-12 relative z-10 flex flex-col items-center justify-center min-h-[100svh]">
        <div className="w-full flex flex-col items-center">

          {/* Name label + horizontal lines */}
          <div className="flex items-center gap-4 md:gap-12 w-full max-w-6xl overflow-hidden mb-6">
            <motion.div
              initial={{ x: '-101%' }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-amber-500/50"
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="text-[10px] font-bold uppercase tracking-[0.4em] text-amber-500/70 whitespace-nowrap"
            >
              Anamul Islam
            </motion.div>
            <motion.div
              initial={{ x: '101%' }}
              animate={{ x: 0 }}
              transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-amber-500/20 to-amber-500"
            />
          </div>

          {/* Typing animation h1 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="w-full max-w-6xl flex items-center justify-center"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[100px] font-black uppercase text-transparent [-webkit-text-stroke:1px_#fbbf24] tracking-[0.08em] text-center min-h-[1.2em] flex items-center justify-center">
              <span>{typedText}</span>
              <span className="inline-block w-[3px] sm:w-[4px] md:w-[5px] h-[0.85em] bg-amber-400 ml-2 align-middle animate-blink" />
            </h1>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="mt-10"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 3.5, duration: 1 }}
              className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-amber-400 transition-colors cursor-default"
            >
              Scroll to explore work
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* ── Signature (bottom right) ── */}
      <div className="absolute bottom-12 right-6 md:right-12 z-10 flex flex-col items-end">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="flex flex-col items-end"
        >
          <div className="text-[10px] md:text-[13px] font-mono uppercase tracking-[0.4em] text-amber-500/50 mb-2">
            Signature
          </div>
          <div className="text-6xl sm:text-7xl md:text-8xl text-amber-500 font-signature rotate-[-8deg] opacity-95 drop-shadow-[0_2px_16px_rgba(251,191,36,0.35)]">
            Anamul Islam
          </div>
        </motion.div>
      </div>

      {/* Carbon texture overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.025] pointer-events-none z-[5]" />
    </section>
  );
}