'use client';

import { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import emailjs from '@emailjs/browser';
import {
  Send,
  Mail,
  MapPin,
  Download,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const SOCIAL_LINKS = [
  {
    icon: Github,
    label: 'GitHub',
    link: 'https://github.com/anamul24',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    link: 'https://www.linkedin.com/in/anamul-islam-ab907a242',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    link: 'https://www.facebook.com/share/17bRnrxef5/',
  },
  {
    icon: Twitter,
    label: 'X (Twitter)',
    link: 'https://x.com/anamul_islam1',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    link: 'https://wa.me/8801764162669',
  },
];

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null
  const baseId = useId();
  const nameId = `${baseId}-name`;
  const emailId = `${baseId}-email`;
  const messageId = `${baseId}-message`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    const form = e.target;

    const templateParams = {
      from_name: form.name.value.trim(),
      from_email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setStatus('success');
      form.reset();
    } catch (error) {
      console.error('EmailJS error:', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResumeClick = () => {
    const RESUME_URL = '/resume.pdf';
    const LINKEDIN_URL = 'https://www.linkedin.com/in/anamul-islam-ab907a242';
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
      id="contact"
      className="py-12 md:py-24 relative overflow-hidden bg-black text-white"
      aria-label="Contact section"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/5 rounded-full blur-[120px] pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 tech-grid opacity-[0.04] pointer-events-none z-0" aria-hidden="true" />
      <div className="absolute inset-0 tech-dot-grid opacity-[0.06] pointer-events-none z-0" aria-hidden="true" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-10 md:gap-20">

          {/* Left column — contact info */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-emerald-400 font-bold tracking-widest uppercase text-xs mb-4"
            >
              Let&apos;s Connect
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-6xl font-black tracking-tight mb-6 md:mb-8"
            >
              Contact <br />
              <span className="text-slate-500">With Me</span>
            </motion.h2>

            <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-lg">
              I&apos;m open to networking discussions, collaboration, and web development projects.
              Feel free to reach out — I&apos;ll get back to you as soon as I can.
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1, delayChildren: 0.2 },
                },
              }}
              className="space-y-5 md:space-y-8"
            >
              {/* Email */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center gap-5 group"
              >
                <div className="w-14 h-14 min-w-[56px] rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400" aria-hidden="true">
                  <Mail size={22} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Email</div>
                  <a
                    href="mailto:anamulislamsumon01@gmail.com"
                    className="text-white font-medium text-base break-all hover:text-emerald-400 transition-colors"
                  >
                    anamulislamsumon01@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Location */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className="flex items-center gap-5 group"
              >
                <div className="w-14 h-14 min-w-[56px] rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400" aria-hidden="true">
                  <MapPin size={22} aria-hidden="true" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Location</div>
                  <div className="text-white font-medium text-base leading-snug">
                    Dhaka Cantonment, Dhaka<br />
                    <span className="text-slate-500 text-sm">Bangladesh</span>
                  </div>
                </div>
              </motion.div>

            </motion.div>

            {/* Social links */}
            <div className="flex gap-4 mt-10 flex-wrap" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit my ${item.label} profile`}
                    role="listitem"
                    className="w-12 h-12 min-w-[44px] min-h-[44px] rounded-full border border-slate-800 flex items-center justify-center text-slate-500 hover:text-emerald-400 hover:border-emerald-400 transition-all"
                  >
                    <Icon size={20} aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right column — contact form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="p-6 md:p-12 rounded-[24px] bg-slate-900/40 border border-white/5 backdrop-blur-xl shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor={nameId} className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Full Name <span aria-hidden="true" className="text-emerald-500">*</span>
                    </label>
                    <input
                      id={nameId}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      aria-required="true"
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor={emailId} className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                      Email Address <span aria-hidden="true" className="text-emerald-500">*</span>
                    </label>
                    <input
                      id={emailId}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      aria-required="true"
                      className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor={messageId} className="block text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Message <span aria-hidden="true" className="text-emerald-500">*</span>
                  </label>
                  <textarea
                    id={messageId}
                    name="message"
                    required
                    aria-required="true"
                    rows={5}
                    className="w-full bg-slate-950/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 resize-none transition-colors"
                    placeholder="What would you like to discuss?"
                  />
                </div>

                {/* Status messages */}
                <AnimatePresence mode="wait">
                  {status === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                      role="status"
                      aria-live="polite"
                    >
                      <CheckCircle size={18} aria-hidden="true" />
                      <span className="text-sm font-medium">Message sent! I&apos;ll get back to you soon.</span>
                    </motion.div>
                  )}
                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400"
                      role="alert"
                      aria-live="assertive"
                    >
                      <AlertCircle size={18} aria-hidden="true" />
                      <span className="text-sm font-medium">
                        Couldn&apos;t send your message. Please try emailing me directly.
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 min-h-[52px] rounded-2xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={isSubmitting ? 'Sending message, please wait' : 'Send message'}
                >
                  {isSubmitting ? (
                    <>
                      <div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
                        aria-hidden="true"
                      />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}