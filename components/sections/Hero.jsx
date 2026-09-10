'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, ArrowDown, FlaskConical, FolderOpen } from 'lucide-react';

const DEFAULT = {
  roles: ['NETWORK ENGINEER', 'CISCO CCNA TRAINEE', 'MIKROTIK TRAINEE', 'MERN STACK DEVELOPER'],
  name: 'Anamul Islam',
  subtitle: 'Network Engineer | Infrastructure & Network Security Enthusiast',
  description: 'Building reliable networks, solving infrastructure problems, and exploring secure IT systems through hands-on labs and real-world projects.',
  scrollHint: 'Scroll to explore work',
  github: 'https://github.com/anamul24',
  linkedin: '',
  cvUrl: '',
};

function useTypingAnimation(words, { typeSpeed = 80, deleteSpeed = 40, pauseMs = 1800 } = {}) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 1800);
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

function ParticleNetwork() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const NUM = 80; const MAX_DIST = 120;
    class Particle {
      constructor() { this.init(); }
      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.r = Math.random() * 1.5 + 0.6;
        this.alpha = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251,191,36,${this.alpha})`; ctx.fill();
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
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(251,191,36,${(1 - d / MAX_DIST) * 0.2})`;
            ctx.lineWidth = 0.5; ctx.stroke();
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

const CODE_LINES = [
  'router ospf 1 / network 0.0.0.0', 'ping 192.168.1.1 -t',
  'vlan 10 / name MANAGEMENT', 'ssh admin@192.168.0.1',
  'nmap -sV 192.168.1.0/24', 'ip route 0.0.0.0 0.0.0.0 10.0.0.1',
  'traceroute 8.8.8.8', 'show ip route / show vlan brief',
  'sudo iptables -A INPUT -p tcp', 'npm run build && deploy',
  'interface GigabitEthernet0/0', 'git push origin main',
];

const SNIPPET_POSITIONS = CODE_LINES.map((_, i) => ({
  left: `${4 + ((i * 23 + 7) % 88)}%`,
  top: `${3 + ((i * 17 + 11) % 90)}%`,
  duration: 3.5 + (i % 5) * 0.7,
  delay: i * 0.35,
}));

export default function Hero() {
  const [data, setData] = useState(DEFAULT);

  useEffect(() => {
    fetch('/api/admin/data?section=hero')
      .then(r => r.json())
      .then(d => { if (d.roles?.length) setData({ ...DEFAULT, ...d }); })
      .catch(() => {});
  }, []);

  const typedText = useTypingAnimation(data.roles);

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="home" className="relative min-h-[100svh] flex flex-col justify-center bg-[#020202] overflow-hidden selection:bg-amber-400 selection:text-black">

      {/* Particle network */}
      <div className="absolute inset-0 z-0"><ParticleNetwork /></div>

      {/* Floating code snippets */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-[9px] sm:text-[10px] text-amber-400/15 whitespace-nowrap select-none"
            style={{ left: SNIPPET_POSITIONS[i].left, top: SNIPPET_POSITIONS[i].top }}
            animate={{ y: [0, -16, 0], opacity: [0.06, 0.22, 0.06] }}
            transition={{ duration: SNIPPET_POSITIONS[i].duration, repeat: Infinity, delay: SNIPPET_POSITIONS[i].delay, ease: 'easeInOut' }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[2] pointer-events-none bg-gradient-to-b from-black/60 via-black/5 to-black/75" />

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.1 }} transition={{ duration: 2, delay: 1 }}
        className="absolute inset-0 tech-grid pointer-events-none z-[3]"
      />

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center min-h-[100svh] pt-20 pb-12">
        <div className="w-full max-w-5xl flex flex-col items-center text-center">

          {/* Name strip */}
          <div className="flex items-center gap-6 w-full mb-5">
            <motion.div initial={{ x: '-101%' }} animate={{ x: 0 }} transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-amber-500/50" />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }}
              className="text-[9px] font-bold uppercase tracking-[0.45em] text-amber-500/60 whitespace-nowrap">
              {data.name}
            </motion.div>
            <motion.div initial={{ x: '101%' }} animate={{ x: 0 }} transition={{ duration: 1.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-500/20 to-amber-500/50" />
          </div>

          {/* Typing h1 */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.4 }}
            className="w-full flex items-center justify-center mb-4">
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-[90px] font-black uppercase text-transparent [-webkit-text-stroke:1px_#fbbf24] tracking-[0.06em] text-center min-h-[1.2em] flex items-center justify-center">
              <span>{typedText}</span>
              <span className="inline-block w-[3px] sm:w-[4px] h-[0.85em] bg-amber-400 ml-2 align-middle animate-blink" />
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2 }}
            className="text-sm sm:text-base md:text-lg font-medium text-slate-300 tracking-wide mb-4">
            {data.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.3 }}
            className="max-w-2xl text-sm text-slate-500 leading-relaxed mb-8">
            {data.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.6 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button onClick={() => scrollTo('#labs')}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-black text-sm font-bold uppercase tracking-widest hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20">
              <FlaskConical size={14} /> Network Labs
            </button>
            <button onClick={() => scrollTo('#projects')}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 hover:border-amber-500/40 transition-all">
              <FolderOpen size={14} /> Projects
            </button>
            {data.cvUrl && (
              <a href={data.cvUrl} download
                className="flex items-center gap-2 px-6 py-3 rounded-full border border-amber-500/30 text-amber-400 text-sm font-bold uppercase tracking-widest hover:bg-amber-500/10 transition-all">
                <ArrowDown size={14} /> Download CV
              </a>
            )}
          </motion.div>

          {/* Social links */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 3 }}
            className="flex items-center gap-4">
            {data.github && (
              <a href={data.github} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs uppercase tracking-widest font-bold">
                <Github size={16} /> GitHub
              </a>
            )}
            {data.github && data.linkedin && <span className="w-px h-4 bg-white/15" />}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors text-xs uppercase tracking-widest font-bold">
                <Linkedin size={16} /> LinkedIn
              </a>
            )}
          </motion.div>

        </div>
      </div>

      {/* Scroll hint */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[9px] font-bold uppercase tracking-[0.35em] text-white/35">{data.scrollHint}</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-6 bg-gradient-to-b from-amber-500/50 to-transparent" />
      </motion.div>

      {/* Signature */}
      <div className="absolute bottom-10 right-6 md:right-10 z-10">
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1.5, delay: 0.8 }}
          className="flex flex-col items-end">
          <div className="text-[9px] md:text-[11px] font-mono uppercase tracking-[0.4em] text-amber-500/40 mb-1">Signature</div>
          <div className="text-5xl sm:text-6xl md:text-7xl text-amber-500 font-signature rotate-[-7deg] opacity-90 drop-shadow-[0_2px_12px_rgba(251,191,36,0.3)]">
            {data.name}
          </div>
        </motion.div>
      </div>
    </section>
  );
}