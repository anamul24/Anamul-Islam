'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
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
} from 'lucide-react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;

    const templateParams = {
      from_name: form.name.value,
      from_email: form.email.value,
      message: form.message.value,
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      alert('Message sent successfully!');
      form.reset();
    } catch (error) {
      console.error(error);
      alert('Failed to send message');
    }

    setIsSubmitting(false);
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden bg-black text-white transition-colors"
    >
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-400/10 dark:bg-amber-400/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 tech-grid opacity-[0.05] pointer-events-none z-0" />
      <div className="absolute inset-0 tech-dot-grid opacity-[0.08] pointer-events-none z-0" />
      <div className="absolute inset-0 scanlines opacity-[0.03] pointer-events-none z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-amber-600 dark:text-amber-400 font-bold tracking-widest uppercase text-xs mb-4"
            >
              Let's Connect
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black tracking-tight mb-8"
            >
              Contact <br />
              <span className="text-slate-400 dark:text-slate-500">
              With Me
              </span>
            </motion.h2>

            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-12 max-w-lg">
              I&apos;m currently open to new projects and collaborations.
              Whether you have a question or just want to say hi, I&apos;ll do
              my best to get back to you!
            </p>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  },
                },
              }}
              className="space-y-8"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 min-w-[56px] rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Mail size={24} />
                </div>

                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Email Me
                  </div>

                  <div className="text-slate-900 dark:text-white font-medium text-base md:text-lg break-all">
                    anamulislamsumon01@gmail.com
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex items-center gap-6 group"
              >
                <div className="w-14 h-14 min-w-[56px] rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <MapPin size={24} />
                </div>

                <div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                    Location
                  </div>

                  <div className="text-slate-900 dark:text-white font-medium text-base md:text-lg leading-snug">
                    161/12 Baganbari, Matikata,<br />Dhaka Cantonment
                  </div>
                </div>
              </motion.div>
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                <a
                  href="/resume.pdf"
                  download="Anamul_Islam_CV.pdf"
                  className="flex items-center justify-center gap-3 px-8 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-amber-600 dark:text-amber-400 hover:bg-slate-950 dark:hover:bg-amber-400 hover:text-white dark:hover:text-slate-950 transition-all font-bold uppercase tracking-widest text-[10px]"
                >
                  <Download size={16} />
                  Download CV
                </a>
              </motion.div>
            </motion.div>
            <div className="flex gap-6 mt-16">
              {[
                {
                  icon: Github,
                  link: 'https://github.com/anamul24',
                },
                {
                  icon: Linkedin,
                  link: 'https://www.linkedin.com/in/anamul-islam-ab907a242',
                },
                {
                  icon: Facebook,
                  link: 'https://www.facebook.com/share/17bRnrxef5/',
                },
                {
                  icon: Twitter,
                  link: 'https://x.com/anamul_islam1',
                },
                {
                  icon: MessageCircle,
                  link: 'https://wa.me/8801764162669',
                },
              ].map((item, i) => {
                const Icon = item.icon;

                return (
                  <a
                    key={i}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-600 dark:hover:border-amber-400 transition-all"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="p-8 md:p-12 rounded-[40px] bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200 dark:border-white/5 backdrop-blur-xl shadow-2xl transition-colors">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Full Name
                    </label>

                    <motion.input
                      name="name"
                      type="text"
                      required
                      className="w-full bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                      placeholder="Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Email Address
                    </label>

                    <motion.input
                      name="email"
                      type="email"
                      required
                      className="w-full bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Your Message
                  </label>

                  <motion.textarea
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-4 text-slate-900 dark:text-white focus:outline-none focus:border-amber-400 resize-none"
                    placeholder="Tell me about your self..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-2xl bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-bold text-lg hover:bg-slate-800 dark:hover:bg-amber-300 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-4 border-slate-900/30 dark:border-slate-950/30 border-t-slate-900 dark:border-t-slate-950 rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={20} />
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