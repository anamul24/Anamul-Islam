'use client';

import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const RUNES = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟᛗᚢᚠᚱᛁᚨᚲᛖᛒᚦᛏᚹᛚᛜ';

const CARDS = [
  { id: 'card-net', title: 'Aspiring Network Engineer', icon: '⬡', sub: 'Cisco • Packet Tracer • Labs', color: '#10b981', finalX: -180, finalY: -130 },
  { id: 'card-dev', title: 'MERN Stack Developer', icon: '◈', sub: 'React • Node.js • MongoDB', color: '#34d399', finalX: 180, finalY: -130 },
  { id: 'card-ccna', title: 'CCNA Trained', icon: '⬢', sub: 'Routing • Switching • VLANs', color: '#6ee7b7', finalX: -180, finalY: 130 },
  { id: 'card-mik', title: 'MikroTik Trained', icon: '◉', sub: 'RouterOS • OSPF • NAT', color: '#a7f3d0', finalX: 180, finalY: 130 },
];

export default function NetworkHero() {
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);
  const photoRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const triggerScramble = () => {
    const spans = document.querySelectorAll('.intro-text span[data-char]');
    spans.forEach((span, index) => {
      if (span.dataset.intervalId) clearInterval(parseInt(span.dataset.intervalId));
      const originalText = span.getAttribute('data-char');
      if (!originalText || originalText === ' ') return;
      let iterations = 0;
      const maxIterations = 18 + Math.random() * 6 + index * 2;
      const interval = setInterval(() => {
        if (iterations >= maxIterations) {
          clearInterval(interval);
          span.innerText = originalText;
          delete span.dataset.intervalId;
        } else {
          span.innerText = RUNES[Math.floor(Math.random() * RUNES.length)];
        }
        iterations++;
      }, 65);
      span.dataset.intervalId = interval;
    });
  };

  useGSAP(
    () => {
      if (!mounted) return;

      const photo = photoRef.current;
      const wrapper = wrapperRef.current;
      if (!photo || !wrapper) return;

      gsap.from('.intro-text span[data-char]', {
        y: 60, opacity: 0, duration: 1.2, stagger: 0.04, ease: 'back.out(1.5)', delay: 0.3,
      });
      triggerScramble();
      gsap.to('.intro-text h1', { y: -12, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      const mm = gsap.matchMedia();

      /* ---------------- DESKTOP ---------------- */
      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=1500',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        const navLogo = document.querySelector('#navbar-logo');
        let logoX = -window.innerWidth / 2 + 40, logoY = -window.innerHeight / 2 + 40;
        if (navLogo) {
          gsap.set(navLogo, { opacity: 0 });
          const r = navLogo.getBoundingClientRect();
          logoX = r.left + r.width / 2 - window.innerWidth / 2;
          logoY = r.top + r.height / 2 - window.innerHeight / 2;
        }

        tl.to('.intro-text', { x: logoX, y: logoY, scale: 0.08, opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 'name-exit');
        if (navLogo) tl.to(navLogo, { opacity: 1, duration: 0.5 }, 'name-exit+=1.0');
        tl.to('.scroll-hint', { opacity: 0, duration: 0.4 }, 'name-exit');

        tl.fromTo(photo,
          { opacity: 0, filter: 'blur(20px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 1.5, ease: 'power3.out' },
          'name-exit+=1.2'
        );
        tl.fromTo('.char-ring-1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(2)' }, 'name-exit+=1.2');
        tl.fromTo('.char-ring-2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(2)' }, 'name-exit+=1.4');
        tl.fromTo('.char-ring-3', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(2)' }, 'name-exit+=1.6');

        let lastLabel = 'name-exit+=2.2';
        CARDS.forEach((card, i) => {
          const el = document.querySelector(`#${card.id}`);
          if (!el) return;
          gsap.set(el, { opacity: 0, x: 0, y: 0, scale: 0.3 });
          const lbl = `card-${i}`;
          tl.addLabel(lbl, `name-exit+=${2.2 + i * 1.1}`);
          lastLabel = lbl;
          tl.to(el, { opacity: 1, x: card.finalX, y: card.finalY, scale: 1, duration: 1.1, ease: 'back.out(1.6)' }, lbl);
        });

        tl.addLabel('exit', `${lastLabel}+=2`);
        tl.to('.char-ring-1, .char-ring-2, .char-ring-3', { opacity: 0, duration: 0.6, ease: 'power2.out' }, 'exit');
        CARDS.forEach((c) => tl.to(`#${c.id}`, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 'exit'));

        return () => { };
      });

      /* ---------------- TABLET ---------------- */
      mm.add('(min-width: 768px) and (max-width: 1023px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top', end: '+=1200', pin: true, scrub: 1, anticipatePin: 1,
          },
        });

        const navLogo = document.querySelector('#navbar-logo');
        let logoX = -window.innerWidth / 2 + 36, logoY = -window.innerHeight / 2 + 36;
        if (navLogo) {
          gsap.set(navLogo, { opacity: 0 });
          const r = navLogo.getBoundingClientRect();
          logoX = r.left + r.width / 2 - window.innerWidth / 2;
          logoY = r.top + r.height / 2 - window.innerHeight / 2;
        }

        tl.to('.intro-text', { x: logoX, y: logoY, scale: 0.09, opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 'ne');
        if (navLogo) tl.to(navLogo, { opacity: 1, duration: 0.5 }, 'ne+=1.0');
        tl.to('.scroll-hint', { opacity: 0, duration: 0.4 }, 'ne');
        tl.fromTo(photo,
          { opacity: 0, filter: 'blur(16px)' },
          { opacity: 1, filter: 'blur(0px)', duration: 1.3, ease: 'power3.out' },
          'ne+=1.2'
        );
        tl.fromTo('.char-ring-1', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(2)' }, 'ne+=1.2');
        tl.fromTo('.char-ring-2', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(2)' }, 'ne+=1.4');

        let lastLabel = 'ne+=2';
        CARDS.forEach((card, i) => {
          const el = document.querySelector(`#${card.id}`);
          if (!el) return;
          gsap.set(el, { opacity: 0, x: 0, y: 0, scale: 0.3 });
          const lbl = `tc${i}`;
          tl.addLabel(lbl, `ne+=${2 + i * 1}`);
          lastLabel = lbl;
          tl.to(el, { opacity: 1, x: card.finalX * 0.62, y: card.finalY * 0.62, scale: 1, duration: 1, ease: 'back.out(1.5)' }, lbl);
        });

        tl.addLabel('tex', `${lastLabel}+=1.5`);
        tl.to('.char-ring-1, .char-ring-2, .char-ring-3', { opacity: 0, duration: 0.6, ease: 'power2.out' }, 'tex');
        CARDS.forEach((c) => tl.to(`#${c.id}`, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 'tex'));

        return () => { };
      });

      /* ---------------- MOBILE ---------------- */
      mm.add('(max-width: 767px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top', end: '+=1000', pin: true, scrub: 1,
          },
        });

        const navLogo = document.querySelector('#navbar-logo');
        let logoX = -window.innerWidth / 2 + 28, logoY = -window.innerHeight / 2 + 28;
        if (navLogo) {
          gsap.set(navLogo, { opacity: 0 });
          const r = navLogo.getBoundingClientRect();
          logoX = r.left + r.width / 2 - window.innerWidth / 2;
          logoY = r.top + r.height / 2 - window.innerHeight / 2;
        }

        tl.to('.intro-text', { x: logoX, y: logoY, scale: 0.1, opacity: 0, duration: 1.5, ease: 'power2.inOut' }, 'me');
        if (navLogo) tl.to(navLogo, { opacity: 1, duration: 0.5 }, 'me+=1.0');
        tl.to('.scroll-hint', { opacity: 0, duration: 0.4 }, 'me');
        tl.fromTo(photo,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: 'power3.out' },
          'me+=1.2'
        );

        let lastLabel = 'me+=2';
        CARDS.forEach((card, i) => {
          const el = document.querySelector(`#${card.id}`);
          if (!el) return;
          gsap.set(el, { opacity: 0, x: 0, y: 0, scale: 0.3 });
          const lbl = `mc${i}`;
          tl.addLabel(lbl, `me+=${2 + i * 0.8}`);
          lastLabel = lbl;
          // 2x2 grid: image er upore 2ta, niche 2ta
          tl.to(el, {
            opacity: 1,
            x: card.finalX > 0 ? 82 : -82,
            y: card.finalY > 0 ? 150 : -150,
            scale: 0.72,
            duration: 0.9,
            ease: 'back.out(1.4)',
          }, lbl);
        });

        tl.addLabel('mex', `${lastLabel}+=1.2`);
        CARDS.forEach((c) => tl.to(`#${c.id}`, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 'mex'));

        return () => { };
      });

      /* ------------ HERO PHOTO -> ABOUT PHOTO BOX ------------ */
      const lerp = (a, b, t) => a + (b - a) * t;
      const ease = gsap.parseEase('power3.inOut');
      const baseSize = () => (window.innerWidth >= 1024 ? 208 : window.innerWidth >= 768 ? 176 : 144);

      const updatePhoto = () => {
        const target = document.querySelector('#about-photo-target');
        const about = document.querySelector('#about');
        if (!wrapper || !target || !about) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const raw = (vh * 0.9 - about.getBoundingClientRect().top) / (vh * 0.7);
        const t = ease(gsap.utils.clamp(0, 1, raw));

        const r = target.getBoundingClientRect();
        const b = baseSize();
        const w = lerp(b, r.width, t);
        const h = lerp(b, r.height, t);
        const cx = lerp(vw / 2, r.left + r.width / 2, t);
        const cy = lerp(vh / 2, r.top + r.height / 2, t);

        gsap.set(wrapper, {
          left: cx - w / 2,
          top: cy - h / 2,
          width: w,
          height: h,
          borderRadius: lerp(999, 32, t),
        });
      };

      updatePhoto();
      ScrollTrigger.create({
        trigger: '#about',
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: updatePhoto,
        onRefresh: updatePhoto,
        onLeave: updatePhoto,
        onLeaveBack: updatePhoto,
      });
      ScrollTrigger.addEventListener('refreshInit', updatePhoto);
      window.addEventListener('resize', updatePhoto);

      return () => {
        window.removeEventListener('resize', updatePhoto);
        ScrollTrigger.removeEventListener('refreshInit', updatePhoto);
        mm.revert();
      };
    },
    { scope: containerRef, dependencies: [mounted] }
  );

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full h-screen z-20 bg-[#020202] selection:bg-emerald-400 selection:text-black"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px]" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)' }} />
          <div className="absolute -top-[15%] -left-[5%] w-[500px] h-[500px] rounded-full blur-[160px]" style={{ background: 'rgba(59,130,246,0.05)' }} />
          <div className="absolute -bottom-[15%] -right-[5%] w-[500px] h-[500px] rounded-full blur-[160px]" style={{ background: 'rgba(16,185,129,0.05)' }} />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage: 'linear-gradient(rgba(16,185,129,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.07) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
              maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 72%)',
            }}
          />
          {['0x4E45', '10110011', '0xBEEF', '11001010', 'CCNA', 'OSI/7', 'TCP/IP', 'BGP'].map((txt, i) => (
            <span
              key={i}
              className="absolute text-emerald-500/20 text-[10px] font-mono animate-pulse"
              style={{
                top: `${[18, 78, 28, 72, 10, 85, 45, 60][i]}%`,
                left: `${[8, 12, 88, 88, 45, 40, 5, 92][i]}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            >
              {txt}
            </span>
          ))}
        </div>

        {/* Intro name */}
        <div className="intro-text absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="flex flex-col items-center gap-3 md:gap-5 pointer-events-auto cursor-crosshair" onMouseEnter={triggerScramble}>
            <h1
              className="font-medieval font-black tracking-[0.18em] uppercase flex flex-wrap justify-center gap-x-[0.6em] leading-none"
              style={{
                fontSize: 'clamp(2.6rem, 8.5vw, 6.5rem)',
                background: 'linear-gradient(160deg, #ffffff 0%, #e2ffe9 45%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 60px rgba(16,185,129,0.2))',
              }}
            >
              {'ANAMUL ISLAM'.split(' ').map((word, i) => (
                <span key={i} className="flex">
                  {word.split('').map((char, j) => (
                    <span key={j} data-char={char} className="inline-block">{char}</span>
                  ))}
                </span>
              ))}
            </h1>
            <div className="flex items-center gap-3 w-full px-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
              <span className="text-xs md:text-sm font-syne font-bold tracking-[0.4em] text-emerald-400/70 uppercase whitespace-nowrap">
                Network Engineer · Web Developer
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
            </div>
          </div>
        </div>

        {/* Rings (photo er bhaire, tai clip hobe na) */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="char-ring-1 absolute w-[190px] h-[190px] md:w-[230px] md:h-[230px] lg:w-[270px] lg:h-[270px] rounded-full border border-dashed border-emerald-500/30 animate-[spin_18s_linear_infinite] opacity-0" />
          <div className="char-ring-2 absolute w-[230px] h-[230px] md:w-[280px] md:h-[280px] lg:w-[330px] lg:h-[330px] rounded-full border border-emerald-400/15 animate-[spin_30s_linear_infinite_reverse] opacity-0" />
          <div className="char-ring-3 absolute w-[270px] h-[270px] md:w-[330px] md:h-[330px] lg:w-[390px] lg:h-[390px] rounded-full border border-dashed border-white/6 animate-[spin_50s_linear_infinite] opacity-0" />
        </div>

        {/* Cards */}
        <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
          {CARDS.map((card) => (
            <div
              key={card.id}
              id={card.id}
              className="absolute flex flex-col gap-1.5 p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-white/10 backdrop-blur-2xl"
              style={{
                background: 'linear-gradient(140deg, rgba(16,185,129,0.1) 0%, rgba(2,2,2,0.75) 100%)',
                minWidth: '140px',
                maxWidth: '195px',
                opacity: 0,
                boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(16,185,129,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
              }}
            >
              <div className="absolute inset-0 rounded-xl lg:rounded-2xl" style={{ background: `linear-gradient(135deg, ${card.color}18, transparent 55%)`, borderRadius: 'inherit' }} />
              <div className="relative z-10 flex items-center gap-2">
                <span style={{ color: card.color, fontSize: '1rem', lineHeight: 1 }}>{card.icon}</span>
                <h2 className="text-white font-bold text-xs lg:text-sm tracking-wider leading-tight">{card.title}</h2>
              </div>
              <p className="relative z-10 text-emerald-300/55 text-xs font-mono tracking-wide leading-relaxed">{card.sub}</p>
              <div className="relative z-10 w-full h-px mt-0.5" style={{ background: `linear-gradient(90deg, ${card.color}50, transparent)` }} />
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-50">
          <span className="text-[9px] font-bold tracking-[0.25em] text-white/30 uppercase font-syne">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-emerald-500/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Photo: document.body e portal, tai kono ancestor transform affect korbe na */}
      {mounted &&
        createPortal(
          <div
            ref={wrapperRef}
            className="hero-character-wrapper fixed z-[25] overflow-hidden pointer-events-none"
            style={{ left: 0, top: 0, width: 208, height: 208, borderRadius: 999 }}
          >
            <img
              ref={photoRef}
              src="/image/anamul islam.png"
              alt="Anamul Islam"
              className="hero-character absolute inset-0 w-full h-full object-cover object-top"
              style={{
                opacity: 0,
                borderRadius: 'inherit',
                backgroundColor: '#0a0a0a',
                boxShadow: '0 0 0 5px rgba(16,185,129,0.07), 0 0 70px rgba(16,185,129,0.12)',
              }}
            />
          </div>,
          document.body
        )}
    </>
  );
}