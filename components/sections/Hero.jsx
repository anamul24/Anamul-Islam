'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, ArrowDown, Network, FolderOpen } from 'lucide-react';

const LINKEDIN_URL = 'https://www.linkedin.com/in/anamul-islam-ab907a242';
const RESUME_URL = '/resume.pdf';

const DEFAULT = {
  roles: ['NETWORK ENGINEER', 'CISCO CCNA TRAINEE', 'MIKROTIK TRAINEE', 'MERN STACK DEVELOPER'],
  name: 'Anamul Islam',
  subtitle: 'Network Engineer | CCNA Trainee | MERN Stack Developer',
  description:
    'Building reliable networks through hands-on Cisco and MikroTik labs. Also developing modern web applications with the MERN stack.',
  scrollHint: 'Scroll to explore',
  github: 'https://github.com/anamul24',
  linkedin: LINKEDIN_URL,
  cvUrl: RESUME_URL,
};

import { AnimatePresence } from 'motion/react';

function LetterStagger({ roles, pauseMs = 2500 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, pauseMs + 1200); // pauseMs + transition time
    return () => clearInterval(interval);
  }, [roles, pauseMs]);

  const currentRole = roles[index];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          visible: { transition: { staggerChildren: 0.04 } },
          exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } }
        }}
        className="flex whitespace-nowrap items-center"
      >
        {currentRole.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 }
            }}
            className={char === ' ' ? 'w-[0.3em]' : 'inline-block'}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

// Network topology particle animation — emerald green color scheme
function ParticleNetwork() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    const NUM = 70; const MAX_DIST = 130;
    class Particle {
      constructor() { this.init(); }
      init() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.35;
        this.vy = (Math.random() - 0.5) * 0.35;
        this.r = Math.random() * 1.5 + 0.5;
        this.alpha = Math.random() * 0.4 + 0.1;
        // Mostly emerald with occasional amber node
        this.isAmber = Math.random() < 0.15;
      }
      update() {
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
      draw() {
        ctx.beginPath(); ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        const color = this.isAmber ? `rgba(251,191,36,${this.alpha})` : `rgba(16,185,129,${this.alpha})`;
        ctx.fillStyle = color; ctx.fill();
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
            ctx.strokeStyle = `rgba(16,185,129,${(1 - d / MAX_DIST) * 0.15})`;
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
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />;
}

const CODE_LINES = [
  'router ospf 1 / network 0.0.0.0', 'ping 192.168.1.1 -t',
  'vlan 10 / name MANAGEMENT', 'ssh admin@192.168.0.1',
  'ip route 0.0.0.0 0.0.0.0 10.0.0.1', 'traceroute 8.8.8.8',
  'show ip route / show vlan brief', 'interface GigabitEthernet0/0',
  'ip dhcp pool LAN', 'no shutdown', 'git push origin main', 'npm run dev',
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
      .then(d => {
        if (d.roles?.length) {
          setData({
            ...DEFAULT,
            ...d,
            // Ensure we always have real social links
            linkedin: d.linkedin || LINKEDIN_URL,
            cvUrl: d.cvUrl || RESUME_URL,
          });
        }
      })
      .catch(() => { });
  }, []);

  // typedText removed in favor of LetterStagger component

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleResumeClick = () => {
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
    <section
      id="home"
      aria-label="Introduction"
      className="relative min-h-[100svh] flex flex-col justify-center bg-[#020202] overflow-hidden selection:bg-emerald-400 selection:text-black"
    >

      {/* Glowing orb blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div style={{
          position: 'absolute', top: '-10%', left: '-10%',
          width: '55vw', height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          animation: 'orbFloat1 12s ease-in-out infinite',
          filter: 'blur(40px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-15%', right: '-10%',
          width: '50vw', height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.09) 0%, rgba(99,102,241,0.06) 50%, transparent 70%)',
          animation: 'orbFloat2 16s ease-in-out infinite',
          filter: 'blur(50px)',
        }} />
        <div style={{
          position: 'absolute', top: '40%', left: '40%',
          width: '30vw', height: '30vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 70%)',
          animation: 'orbFloat3 20s ease-in-out infinite',
          filter: 'blur(60px)',
        }} />
      </div>

      {/* Particle network background */}
      <div className="absolute inset-0 z-[1]" aria-hidden="true"><ParticleNetwork /></div>

      {/* Floating network command snippets */}
      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden" aria-hidden="true">
        {CODE_LINES.map((line, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-[10px] sm:text-[11px] text-emerald-400/12 whitespace-nowrap select-none"
            style={{ left: SNIPPET_POSITIONS[i].left, top: SNIPPET_POSITIONS[i].top }}
            animate={{ y: [0, -14, 0], opacity: [0.04, 0.18, 0.04] }}
            transition={{ duration: SNIPPET_POSITIONS[i].duration, repeat: Infinity, delay: SNIPPET_POSITIONS[i].delay, ease: 'easeInOut' }}
          >
            {line}
          </motion.div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[3] pointer-events-none bg-gradient-to-b from-black/55 via-black/5 to-black/70" aria-hidden="true" />

      {/* Grid overlay */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.07 }} transition={{ duration: 2, delay: 0.8 }}
        className="absolute inset-0 tech-grid pointer-events-none z-[4]"
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center min-h-[100svh] pt-20 pb-16">
        <div className="w-full max-w-5xl flex flex-col items-center text-center">

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-3 relative"
          >
            <span className="text-xs font-bold uppercase tracking-[0.5em] text-slate-500">{data.name}</span>
          </motion.div>

          {/* Stagger Animation H1 */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="w-full flex items-center justify-center mb-6 overflow-visible"
          >
            <h1 className="text-[clamp(1.6rem,5vw,5.5rem)] font-black uppercase text-transparent [-webkit-text-stroke:1px_#10b981] sm:[-webkit-text-stroke:2px_#10b981] tracking-[0.05em] text-center min-h-[1.2em] flex items-center justify-center whitespace-nowrap">
              <LetterStagger roles={data.roles} />
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-sm sm:text-base md:text-lg font-medium text-slate-300 tracking-wide mb-4"
          >
            {data.subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.9 }}
            className="max-w-2xl text-sm sm:text-base text-slate-500 leading-relaxed mb-10"
          >
            {data.description}
          </motion.p>


        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}
        transition={{ delay: 3.0, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs font-bold tracking-wide text-white/35">{data.scrollHint}</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-6 bg-gradient-to-b from-emerald-500/50 to-transparent"
        />
      </motion.div>

      {/* Orb animation keyframes */}
      <style>{`
        @keyframes orbFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(5%, 8%) scale(1.05); }
          66% { transform: translate(-3%, 5%) scale(0.97); }
        }
        @keyframes orbFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-6%, -8%) scale(1.08); }
          66% { transform: translate(4%, -4%) scale(0.95); }
        }
        @keyframes orbFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-8%, 6%) scale(1.1); }
        }
      `}</style>
    </section>
  );
}