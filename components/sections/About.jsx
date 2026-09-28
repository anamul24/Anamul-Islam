'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const DEFAULT = {
  tagline: 'The Story So Far',
  heading: 'About',
  headingHighlight: 'Me',
  bio: "I'm Anamul, a final-year CSE student in Dhaka, graduating this December. My focus is networking — routing, switching, troubleshooting — and I like working with real hardware, not just diagrams on a screen.\n\nI got into networking through David Bombal's Udemy course, then went further with hands-on CCNA and MikroTik training at CSL Training, working directly with physical devices: VLANs, OSPF routing, DHCP/NAT, EtherChannel. I'm currently preparing for the official CCNA exam.\n\nI also build full-stack web apps with the MERN stack — React, Next.js, Node.js, MongoDB. Learned through Programming Hero and Dr. Angela Yu's bootcamp. It's not the usual pairing with networking, but it means I understand both sides: the application and the infrastructure it runs on.\n\nI'm looking for an entry-level Network Engineer or NOC role in Dhaka. Take a look at what I've built below, or get in touch.",
  stats: [
    { value: 'CCNA', label: 'Training' },
    { value: 'MikroTik', label: 'Training' },
    { value: '50+', label: 'Network Lab Hours' },
    { value: 'MERN', label: 'Stack Development' },
  ],
};

export default function About() {
  const data = DEFAULT;
  const sectionRef = useRef(null);
  const photoWrapRef = useRef(null);
  const taglineRef = useRef(null);
  const headingRef = useRef(null);
  const bioRef = useRef(null);
  const statsRef = useRef(null);

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        taglineRef.current,
        { opacity: 0, x: 28 },
        {
          opacity: 1, x: 0,
          scrollTrigger: {
            trigger: taglineRef.current,
            start: 'top 88%',
            end: 'top 55%',
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 88%',
            end: 'top 52%',
            scrub: 1.1,
          },
        }
      );

      const paras = bioRef.current?.querySelectorAll('p');
      paras?.forEach((para, i) => {
        gsap.fromTo(
          para,
          { opacity: 0, y: 28 },
          {
            opacity: 1, y: 0,
            scrollTrigger: {
              trigger: para,
              start: 'top 92%',
              end: 'top 62%',
              scrub: 1 + i * 0.08,
            },
          }
        );
      });

      const statCards = statsRef.current?.querySelectorAll('[data-stat]');
      statCards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 28, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: `top ${88 - i * 3}%`,
              end: `top ${55 - i * 2}%`,
              scrub: 1,
            },
          }
        );
      });
    });

    mm.add('(max-width: 767px)', () => {
      [taglineRef.current, headingRef.current, bioRef.current, statsRef.current]
        .filter(Boolean)
        .forEach((el) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 20 },
            {
              opacity: 1, y: 0,
              scrollTrigger: {
                trigger: el,
                start: 'top 90%',
                end: 'top 62%',
                scrub: 1,
              },
            }
          );
        });
    });

    return () => {
      mm.revert();
    };
  }, { scope: sectionRef });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 md:py-32 bg-[#020202] overflow-hidden"
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020202] via-[#050a08] to-[#020202] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none z-0" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

          <div className="lg:col-span-5 relative mb-6 lg:mb-0">
            <div
              id="about-photo-target"
              ref={photoWrapRef}
              className="about-photo-target relative aspect-[4/5] max-w-sm mx-auto lg:ml-0 rounded-[32px] overflow-hidden border border-emerald-500/10 group shadow-2xl bg-slate-900/50"
            >
              <div className="absolute inset-0 tech-grid opacity-10" aria-hidden="true" />
              <div className="absolute inset-0 ring-1 ring-inset ring-emerald-500/20 rounded-[32px]" aria-hidden="true" />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-start">
            <div
              ref={taglineRef}
              className="flex items-center gap-4 text-emerald-500 font-bold uppercase tracking-[0.4em] text-xs mb-4 md:mb-8"
            >
              <div className="w-12 h-[1px] bg-emerald-500" aria-hidden="true" />
              {data.tagline}
            </div>

            <h2
              ref={headingRef}
              className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 md:mb-10"
            >
              {data.heading}{' '}
              <span className="text-slate-500">
                {data.headingHighlight}
              </span>
            </h2>

            <div
              ref={bioRef}
              className="space-y-4 text-slate-400 text-base md:text-lg leading-relaxed"
            >
              {(data.bio || '').split(/\n\n+/).map((para, i) => (
                <p key={i}>{para.trim()}</p>
              ))}
            </div>

            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-14 w-full"
            >
              {data.stats.map((stat) => (
                <div
                  key={stat.label}
                  data-stat
                  className="flex flex-col gap-2 p-5 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:bg-white/[0.05] hover:border-emerald-500/30 transition-all duration-500 group hover:-translate-y-1 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true" />
                  <span className="text-white text-2xl font-black group-hover:text-emerald-400 transition-colors duration-300 relative z-10">
                    {stat.value}
                  </span>
                  <span className="text-slate-500 text-xs tracking-widest font-bold group-hover:text-slate-300 transition-colors duration-300 relative z-10">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
