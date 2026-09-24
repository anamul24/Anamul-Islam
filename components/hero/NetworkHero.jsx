'use client';

import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';
import { heroData } from './heroData';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

export default function NetworkHero() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);

  const triggerScramble = () => {
    const runes = "ᚠᚢᚦᚬᚱᚴᚼᚽᚾᚿᛁᛅᛆᛋᛌᛏᛐᛒᛘᛚᛦᚨᛒᚲᛞᛖᚠᚷᚺᛁᛃᚴᛚᛗᚾᛟᛈᛩᚱᛊᛏᚢᚡᚹᛪᚣᛉ";
    const spans = document.querySelectorAll(".intro-text span");
    spans.forEach((span, index) => {
      if (span.dataset.intervalId) {
        clearInterval(parseInt(span.dataset.intervalId));
      }
      const originalText = span.getAttribute("data-char");
      if (!originalText || originalText === " ") return;
      
      let iterations = 0;
      const maxIterations = 15 + (Math.random() * 5) + index * 2; 
      
      const interval = setInterval(() => {
        if (iterations >= maxIterations) {
          clearInterval(interval);
          span.innerText = originalText;
          delete span.dataset.intervalId;
        } else {
          span.innerText = runes[Math.floor(Math.random() * runes.length)];
        }
        iterations++;
      }, 70); 
      span.dataset.intervalId = interval;
    });
  };

  useGSAP(() => {
    // Initial text reveal animation
    gsap.from(".intro-text span", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.05,
      ease: "back.out(1.5)",
      delay: 0.2
    });

    // Custom Text Morphing / Scramble Effect on load
    triggerScramble();


    // Subtle continuous floating for the whole block
    gsap.to(".intro-text h1", {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Media query for responsive logic
    let mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Main timeline for desktop/tablet
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=6000",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      // Calculate intro text target position (Navbar logo)
      let logoX = -window.innerWidth / 2 + 40;
      let logoY = -window.innerHeight / 2 + 40;
      let logoScale = 0.1;
      const navLogo = document.querySelector("#navbar-logo");
      if (navLogo) {
        gsap.set(navLogo, { opacity: 0 }); // Hide initially
        const rect = navLogo.getBoundingClientRect();
        logoX = rect.left + rect.width / 2 - window.innerWidth / 2;
        logoY = rect.top + rect.height / 2 - window.innerHeight / 2;
      }

      // Intro text animation
      tl.to(".intro-text", {
        x: logoX,
        y: logoY,
        scale: logoScale,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, "stage-start");
      
      if (navLogo) {
        tl.to(navLogo, { opacity: 1, duration: 0.5 }, "stage-start+=1.0");
      }

      // Character entrance — blur to sharp
      tl.fromTo(".hero-character", 
        { opacity: 0, scale: 0.85, filter: "blur(12px)" }, 
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
        "stage-start+=1.5"
      );
      tl.fromTo(".char-ring-1", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "stage-start+=1.5");
      tl.fromTo(".char-ring-2", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "stage-start+=1.7");
      tl.fromTo(".char-ring-3", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }, "stage-start+=1.9");

      // Hide scroll hint
      tl.to(".scroll-hint", { opacity: 0, duration: 0.5 }, "stage-start+=1.5");

      // Loop through each route and animate
      heroData.forEach((route, index) => {
        const stageLabel = `stage-${index + 1}`;
        tl.addLabel(stageLabel);

        // 1. Draw the path
        const pathEl = document.querySelector(`#path-${route.id}`);
        const pathLength = pathEl.getTotalLength();
        
        gsap.set(pathEl, { strokeDasharray: pathLength, strokeDashoffset: pathLength, opacity: 1 });
        
        tl.to(pathEl, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power1.inOut"
        }, stageLabel);

        // 2. Animate the packet along the path
        const packetEl = document.querySelector(`#packet-${route.id}`);
        gsap.set(packetEl, { opacity: 0, scale: 0.5 });
        
        tl.to(packetEl, {
          opacity: 1,
          scale: 1.2,
          duration: 0.2
        }, stageLabel)
        .to(packetEl, {
          motionPath: {
            path: pathEl,
            align: pathEl,
            alignOrigin: [0.5, 0.5],
          },
          duration: 1.5,
          ease: "power1.inOut"
        }, stageLabel)
        .to(packetEl, {
          scale: 1,
          duration: 0.2
        });

        // 3. Activate the destination node + ripple
        const nodeEl = document.querySelector(`#node-${route.id}`);
        const rippleEl = document.querySelector(`#ripple-${route.id}`);
        tl.fromTo(nodeEl, 
          { scale: 0, opacity: 0, transformOrigin: "center center" },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
          `${stageLabel}+=1.3`
        );
        if (rippleEl) {
          tl.fromTo(rippleEl,
            { scale: 0, opacity: 0.8, transformOrigin: "center center" },
            { scale: 4, opacity: 0, duration: 1, ease: "power2.out" },
            `${stageLabel}+=1.3`
          );
        }

        // 4. Show the card
        const cardEl = document.querySelector(`#card-${route.id}`);
        tl.fromTo(cardEl,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
          `${stageLabel}+=1.4`
        );
      });

      // Final stage — glow + synchronized node pulse
      tl.addLabel("stage-final");
      tl.to(".hero-character", {
        filter: "drop-shadow(0 0 25px rgba(16,185,129,0.7))",
        duration: 1
      }, "stage-final");
      // Pulse all nodes in sync
      tl.to(`[id^="node-"]`, {
        scale: 1.8, opacity: 0.6, transformOrigin: "center center",
        duration: 0.6, repeat: 2, yoyo: true, ease: "sine.inOut",
        stagger: 0.08
      }, "stage-final");
      tl.fromTo(".network-status",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "stage-final+=0.5"
      );

      // Exit stage — image zooms and blurs out at the very end of the pin
      tl.addLabel("stage-exit", "stage-final+=2");
      tl.to(".hero-character", {
        scale: 2.2,
        opacity: 0,
        filter: "blur(30px)",
        duration: 2,
        ease: "power2.in"
      }, "stage-exit");
      tl.to(".char-ring-1, .char-ring-2, .char-ring-3", {
        scale: 2.5,
        opacity: 0,
        duration: 1.5,
        ease: "power2.in"
      }, "stage-exit");
      tl.to(".network-status", {
        opacity: 0,
        y: -20,
        duration: 1,
        ease: "power2.in"
      }, "stage-exit");
      
      return () => {}; // cleanup
    });

    // Mobile fallback/simplification
    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4000",
          pin: true,
          scrub: 1,
        }
      });
      
      // Calculate intro text target position (Navbar logo) for mobile
      let logoX = -window.innerWidth / 2 + 30;
      let logoY = -window.innerHeight / 2 + 30;
      let logoScale = 0.1;
      const navLogo = document.querySelector("#navbar-logo");
      if (navLogo) {
        gsap.set(navLogo, { opacity: 0 }); // Hide initially
        const rect = navLogo.getBoundingClientRect();
        logoX = rect.left + rect.width / 2 - window.innerWidth / 2;
        logoY = rect.top + rect.height / 2 - window.innerHeight / 2;
      }

      tl.to(".intro-text", {
        x: logoX,
        y: logoY,
        scale: logoScale,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut"
      }, "stage-start");
      
      if (navLogo) {
        tl.to(navLogo, { opacity: 1, duration: 0.5 }, "stage-start+=1.0");
      }

      tl.fromTo(".hero-character", 
        { opacity: 0, scale: 0.9 }, 
        { opacity: 1, scale: 1, duration: 1 },
        "stage-start+=1.5"
      );
      tl.to(".scroll-hint", { opacity: 0, duration: 0.5 }, "stage-start+=1.5");

      heroData.forEach((route, index) => {
        const stageLabel = `stage-${index + 1}`;
        tl.addLabel(stageLabel);
        
        const pathEl = document.querySelector(`#mobile-path-${route.id}`);
        if(pathEl) {
           const pathLength = pathEl.getTotalLength();
           gsap.set(pathEl, { strokeDasharray: pathLength, strokeDashoffset: pathLength, opacity: 1 });
           tl.to(pathEl, { strokeDashoffset: 0, duration: 1.5, ease: "power1.inOut" }, stageLabel);
        }

        const packetEl = document.querySelector(`#mobile-packet-${route.id}`);
        if (packetEl && pathEl) {
          gsap.set(packetEl, { opacity: 0, scale: 0.5 });
          tl.to(packetEl, { opacity: 1, scale: 1.2, duration: 0.2 }, stageLabel)
            .to(packetEl, {
              motionPath: {
                path: pathEl,
                align: pathEl,
                alignOrigin: [0.5, 0.5],
              },
              duration: 1.5,
              ease: "power1.inOut"
            }, stageLabel)
            .to(packetEl, { scale: 1, duration: 0.2 });
        }
        
        const nodeEl = document.querySelector(`#mobile-node-${route.id}`);
        if (nodeEl) {
          tl.fromTo(nodeEl, 
            { scale: 0, opacity: 0, transformOrigin: "center center" },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
            `${stageLabel}+=1.3`
          );
        }

        const cardEl = document.querySelector(`#mobile-card-${route.id}`);
        if (cardEl) {
          tl.fromTo(cardEl,
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5 },
            `${stageLabel}+=1.4`
          );
        }
      });
      
      tl.addLabel("stage-final");
      tl.to(".hero-character", {
        filter: "drop-shadow(0 0 20px rgba(16,185,129,0.5))",
        duration: 1
      }, "stage-final");

      tl.fromTo(".network-status",
        { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 },
        "stage-final"
      );

      return () => {}; // cleanup
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#020202] overflow-hidden selection:bg-emerald-400 selection:text-black">
      
      {/* Intro Text (Name) */}
      <div className="intro-text absolute inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="flex flex-col items-center gap-4 md:gap-6 pointer-events-auto cursor-crosshair" onMouseEnter={triggerScramble}>
          {/* Name */}
          <h1 className="text-[11vw] md:text-[7.5rem] font-medieval font-black tracking-widest uppercase bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-emerald-400 drop-shadow-[0_0_40px_rgba(16,185,129,0.3)] flex flex-wrap justify-center gap-x-3 md:gap-x-6 leading-none">
            {"ANAMUL ISLAM".split(" ").map((word, i) => (
               <div key={i} className="flex">
                 {word.split("").map((char, j) => (
                   <span key={j} data-char={char} className="inline-block">{char}</span>
                 ))}
               </div>
            ))}
          </h1>

          {/* Glowing separator + Subtitle */}
          <div className="flex items-center gap-4 w-full px-4 mt-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
            <span className="text-[10px] md:text-xs font-syne font-bold tracking-[0.4em] text-emerald-400/80 uppercase whitespace-nowrap">
              Aspiring Network Engineer · MERN Stack Web Development
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />
          </div>
        </div>
      </div>

      {/* Background Subtle Elements */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] opacity-60" />
        <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] opacity-40" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[150px] opacity-40" />
        
        {/* Grid with Radial Fade */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" 
          style={{ maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)', WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)' }}
        />

        {/* Noise texture for cinematic grain */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '200px 200px' }}
        />

        {/* Floating Hex/Tech Fragments */}
        <span className="absolute top-[18%] left-[12%] text-emerald-500/25 text-xs font-mono animate-pulse" style={{ animationDelay: '0s' }}>0x4E45</span>
        <span className="absolute bottom-[22%] left-[20%] text-emerald-500/20 text-[10px] font-mono animate-pulse" style={{ animationDelay: '1.2s' }}>10110011</span>
        <span className="absolute top-[28%] right-[14%] text-emerald-500/25 text-xs font-mono animate-pulse" style={{ animationDelay: '2s' }}>0xBEEF</span>
        <span className="absolute bottom-[18%] right-[12%] text-emerald-500/20 text-[10px] font-mono animate-pulse" style={{ animationDelay: '0.7s' }}>11001010</span>
        <span className="absolute top-[10%] left-[45%] text-emerald-500/15 text-[9px] font-mono animate-pulse" style={{ animationDelay: '1.8s' }}>CCNA</span>
        <span className="absolute bottom-[10%] right-[40%] text-emerald-500/15 text-[9px] font-mono animate-pulse" style={{ animationDelay: '3s' }}>OSI/7</span>
      </div>


      {/* Main SVG Coordinate Space (Desktop) */}
      <div className="absolute inset-0 z-10 pointer-events-none hidden md:flex items-center justify-center">
        <svg 
          ref={svgRef}
          viewBox="0 0 1000 800" 
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
          className="w-full h-full max-w-[1400px] max-h-[1000px] overflow-visible"
        >
          {/* Paths */}
          <g className="routes">
            {/* Perimeter Mesh Line */}
            <path 
              d="M 246,150 L 754,150 L 754,550 L 246,550 Z"
              fill="none"
              stroke="rgba(16,185,129,0.15)"
              strokeWidth="1"
              strokeDasharray="4 8"
              className="animate-[spin_60s_linear_infinite]"
              style={{ transformOrigin: '500px 350px' }}
            />
            {heroData.map(route => (
              <path 
                key={`path-${route.id}`}
                id={`path-${route.id}`}
                d={route.path}
                fill="none"
                stroke="rgba(16,185,129,0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0"
              />
            ))}
          </g>

          {/* Cards via ForeignObject */}
          {heroData.map(route => {
            const isEnd = route.align === 'end';
            const xOffset = isEnd ? -450 : 0; // Shift left by exactly card width
            const yOffset = -45; // Shift up by exactly half of card height (90)
            return (
              <foreignObject 
                key={`card-${route.id}`}
                id={`card-${route.id}`}
                x={route.cardX + xOffset} 
                y={route.cardY + yOffset} 
                width="450" 
                height="90"
                className="opacity-0 overflow-visible"
              >
                <div 
                  className={`w-full h-full flex flex-col justify-center px-0 ${isEnd ? 'text-right items-end' : 'text-left items-start'}`}
                >
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase whitespace-nowrap drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">{route.title}</h3>
                </div>
              </foreignObject>
            );
          })}

          {/* Destination Nodes + Ripple Rings */}
          <g className="nodes">
            {heroData.map(route => (
              <g key={`node-group-${route.id}`}>
                <circle
                  id={`ripple-${route.id}`}
                  cx={route.nodeX} cy={route.nodeY} r="6"
                  fill="none" stroke="#10b981" strokeWidth="1.5"
                  className="opacity-0"
                />
                <circle 
                  key={`node-${route.id}`}
                  id={`node-${route.id}`}
                  cx={route.nodeX}
                  cy={route.nodeY}
                  r="6"
                  fill={route.color}
                  className="opacity-0 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                />
              </g>
            ))}
          </g>

          {/* Packets with comet glow */}
          <defs>
            <filter id="comet-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <g className="packets">
            {heroData.map(route => (
              <circle 
                key={`packet-${route.id}`}
                id={`packet-${route.id}`}
                cx="0" cy="0"
                r="5"
                fill="#34d399"
                filter="url(#comet-glow)"
                className="opacity-0"
              />
            ))}
          </g>

          {/* Central Character — Desktop */}
          <foreignObject x="350" y="200" width="300" height="300">
            <div className="w-full h-full flex items-center justify-center relative">
               {/* Three concentric glowing rings */}
               <div className="char-ring-1 absolute w-[200px] h-[200px] border border-emerald-500/30 rounded-full border-dashed animate-[spin_15s_linear_infinite] opacity-0" />
               <div className="char-ring-2 absolute w-[240px] h-[240px] border border-emerald-400/15 rounded-full animate-[spin_25s_linear_infinite_reverse] opacity-0" />
               <div className="char-ring-3 absolute w-[280px] h-[280px] border border-white/5 rounded-full border-dashed animate-[spin_40s_linear_infinite] opacity-0" />
               
               <img 
                 src="/image/anamul islam.png" 
                 alt="Anamul Islam"
                 className="hero-character w-48 h-48 rounded-full border-2 border-emerald-500/60 object-cover object-top opacity-0 relative z-10"
                 style={{ backgroundColor: '#0a0a0a' }}
               />
            </div>
          </foreignObject>


          {/* Scroll Hint */}
          <foreignObject x="400" y="680" width="200" height="60">
             <div className="scroll-hint w-full flex flex-col items-center justify-center gap-2 opacity-100">
                <span className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase">Scroll to explore</span>
                <div className="w-px h-6 bg-gradient-to-b from-emerald-500/50 to-transparent animate-pulse" />
             </div>
          </foreignObject>

          {/* Network Status / Description */}
          <foreignObject x="150" y="660" width="700" height="120">
             <div className="network-status w-full h-full flex flex-col items-center justify-center opacity-0 px-4">
                <p className="text-base md:text-lg text-center text-emerald-100/70 leading-relaxed font-mono">
                  Building reliable networks, solving infrastructure problems, and exploring secure IT systems through hands-on labs and real-world projects. Also developing modern full-stack web applications.
                </p>
             </div>
          </foreignObject>
        </svg>
      </div>

      {/* Main SVG Coordinate Space (Mobile) */}
      <div className="absolute inset-0 z-10 pointer-events-none flex md:hidden items-center justify-center">
        <svg 
          viewBox="0 0 400 800" 
          preserveAspectRatio="xMidYMid meet"
          overflow="visible"
          className="w-full h-full max-h-[800px] overflow-visible"
        >
          {/* Paths */}
          <g className="routes">
            {/* Perimeter Mesh Line (Mobile) */}
            <path 
              d="M 95,190 L 305,190 L 305,510 L 95,510 Z"
              fill="none"
              stroke="rgba(16,185,129,0.15)"
              strokeWidth="1"
              strokeDasharray="2 4"
            />
            {/* Outer Mesh Box for visual fill */}
            <path 
              d="M 80,180 L 320,180 L 320,580 L 80,580 Z"
              fill="none"
              stroke="rgba(16,185,129,0.05)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            {heroData.map(route => (
              <path 
                key={`mobile-path-${route.id}`}
                id={`mobile-path-${route.id}`}
                d={route.mobilePath}
                fill="none"
                stroke="rgba(16,185,129,0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="opacity-0"
              />
            ))}
          </g>

          {/* Cards via ForeignObject */}
          {heroData.map(route => {
            const yOffset = -40; // Shift up by half of height 80
            return (
              <foreignObject 
                key={`mobile-card-${route.id}`}
                id={`mobile-card-${route.id}`}
                x={route.mobileX} 
                y={route.mobileY + yOffset} 
                width="170" 
                height="80"
                className="opacity-0 overflow-visible"
              >
                <div 
                  className="w-full h-full flex flex-col justify-center items-center text-center px-2"
                >
                  <h3 className="text-[13px] leading-tight font-black text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">{route.title}</h3>
                </div>
              </foreignObject>
            );
          })}

          {/* Destination Nodes + Ripple (Mobile) */}
          <g className="nodes">
            {heroData.map(route => (
              <g key={`mobile-node-group-${route.id}`}>
                <circle
                  id={`mobile-ripple-${route.id}`}
                  cx={route.mobileNodeX} cy={route.mobileNodeY} r="6"
                  fill="none" stroke="#10b981" strokeWidth="1.5"
                  className="opacity-0"
                />
                <circle 
                  key={`mobile-node-${route.id}`}
                  id={`mobile-node-${route.id}`}
                  cx={route.mobileNodeX}
                  cy={route.mobileNodeY}
                  r="6"
                  fill={route.color}
                  className="opacity-0 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                />
              </g>
            ))}
          </g>

          {/* Packets — Mobile with comet glow */}
          <g className="packets">
            {heroData.map(route => (
              <circle 
                key={`mobile-packet-${route.id}`}
                id={`mobile-packet-${route.id}`}
                cx="0" cy="0"
                r="5"
                fill="#34d399"
                filter="url(#comet-glow)"
                className="opacity-0"
              />
            ))}
          </g>

          {/* Central Character — Mobile */}
          <foreignObject x="100" y="250" width="200" height="200">
            <div className="w-full h-full flex items-center justify-center relative">
               <div className="char-ring-1 absolute w-[130px] h-[130px] border border-emerald-500/30 rounded-full border-dashed animate-[spin_15s_linear_infinite] opacity-0" />
               <div className="char-ring-2 absolute w-[155px] h-[155px] border border-emerald-400/15 rounded-full animate-[spin_25s_linear_infinite_reverse] opacity-0" />
               <div className="char-ring-3 absolute w-[175px] h-[175px] border border-white/5 rounded-full border-dashed animate-[spin_40s_linear_infinite] opacity-0" />
               
               <img 
                 src="/image/anamul islam.png" 
                 alt="Anamul Islam"
                 className="hero-character w-28 h-28 rounded-full border-2 border-emerald-500/60 object-cover object-top opacity-0 relative z-10"
                 style={{ backgroundColor: '#0a0a0a' }}
               />
            </div>
          </foreignObject>

          {/* Scroll Hint */}
          <foreignObject x="100" y="720" width="200" height="60">
             <div className="scroll-hint w-full flex flex-col items-center justify-center gap-2 opacity-100">
                <span className="text-[9px] font-bold tracking-[0.2em] text-white/40 uppercase">Scroll to explore</span>
                <div className="w-px h-6 bg-gradient-to-b from-emerald-500/50 to-transparent animate-pulse" />
             </div>
          </foreignObject>

          {/* Network Status / Description */}
          <foreignObject x="10" y="640" width="380" height="140">
             <div className="network-status w-full h-full flex flex-col items-center justify-center opacity-0 px-2">
                <p className="text-[12px] text-center text-emerald-100/70 leading-relaxed font-mono">
                  Building reliable networks, solving infrastructure problems, and exploring secure IT systems through hands-on labs and real-world projects. Also developing modern full-stack web applications.
                </p>
             </div>
          </foreignObject>
        </svg>
      </div>

    </section>
  );
}
