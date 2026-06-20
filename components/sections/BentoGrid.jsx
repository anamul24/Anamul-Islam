'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Layers, X, ArrowRight, Code2, ExternalLink } from 'lucide-react';

const projects = [
  
  {
    title: 'TILES GALLERY',
    description: 'Tiles Gallery is a responsive, modern image gallery built with a tile-based layout system, focusing on clean UI, smooth responsiveness, and visual presentation.',
    longDescription: 'Tiles Gallery is a modern and responsive image gallery web application designed with a focus on visually appealing layouts and smooth user experience. The project showcases images in a dynamic tile-based grid system, allowing content to be displayed in an organized yet creative structure.Built using modern frontend technologies, the application emphasizes responsive design, ensuring optimal viewing across all devices including mobile, tablet, and desktop. The layout adapts seamlessly to different screen sizes while maintaining a clean and aesthetic presentation.The project highlights practical skills in UI/UX design, grid-based layout systems, and frontend performance optimization. It serves as a strong example of building visually engaging gallery interfaces suitable for portfolio or creative showcase purposes.',
    tags: ['React', 'Next.js'],
    link: 'https://tiles-gallery-brown-psi.vercel.app/',
    github: 'https://github.com/anamul24/Tiles-Gallery',
    size: 'large',
    image: '/image/tilesgallery.png',
    
  },
  {
    title: 'KeenKeeper',
    description: 'A modern, responsive web application focused on clean UI/UX and smooth user experience.',
    longDescription: 'Keen Keeper is a modern, responsive web application designed with a focus on clean UI/UX and smooth user experience. The project showcases a minimal yet functional interface that works seamlessly across different devices, including mobile, tablet, and desktop.Built as a frontend-focused project, it highlights practical web development skills such as layout structuring, responsive design, and performance optimization. The website is deployed on Netlify, ensuring fast loading speed and reliable accessibility.Overall, Keen Keeper serves as a demonstration of modern frontend development practices and design thinking, making it suitable for portfolio presentation and UI/UX showcase purposes.',
    tags: ['React', 'Tailwind',],
    link: 'https://keenkeeperp.netlify.app/',
    github: 'https://github.com/anamul24/KeenKeeper',
    size: 'small',
    image: '/image/keenkeeper.png',
    
  },
  {
    title: 'DigiTools',
    description: 'DigiTools Platform is a responsive utility web app offering multiple digital tools in a clean, fast, and user-friendly interface.',
    longDescription: 'DigiTools Platform is a modern, responsive web application that provides a collection of useful digital tools in a clean and user-friendly interface. The project is designed to simplify everyday tasks by offering multiple utility features in one centralized platform.Built with a focus on performance and usability, the platform ensures a smooth experience across all devices including mobile, tablet, and desktop. It features a minimal yet functional design that enhances accessibility and user interaction.',
    tags: ['TailwindCSS','React',],
    link: 'https://digitoolsplatforma06.netlify.app',
    github: 'https://github.com/anamul24/Digitools',
    size: 'small',
    image: '/image/digitool.png',
    
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function BentoGrid() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTag, setActiveTag] = useState(null);

  const allTags = Array.from(new Set(projects.flatMap(p => p.tags))).sort();
  
  const filteredProjects = activeTag 
    ? projects.filter(p => p.tags.some(t => t.toLowerCase().includes(activeTag.toLowerCase())))
    : projects;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  useEffect(() => {
    const handlePopState = () => {
      setSelectedProject(null);
    };

    if (selectedProject) {
      window.history.pushState({ modalOpen: true }, '');
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedProject]);

  const closeProjectModal = () => {
    setSelectedProject(null);
    if (window.history.state?.modalOpen) {
      window.history.back();
    }
  };

  return (
    <section id="projects" className="py-12 md:py-24 bg-black relative overflow-hidden transition-colors selection:bg-amber-500 selection:text-black">
      <div className="absolute inset-0 tech-grid opacity-[0.03] pointer-events-none z-0" />
      <div className="absolute inset-0 tech-dot-grid opacity-[0.05] pointer-events-none z-0" />
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none z-0">
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke="currentColor" className="text-amber-500" strokeWidth="0.5" fill="none" />
          <circle cx="50" cy="50" r="1.5" fill="currentColor" className="text-amber-500" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10 md:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-6 md:gap-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 text-amber-500/80 font-mono tracking-[0.4em] uppercase text-[9px] mb-4 md:mb-8"
            >
              <div className="w-12 h-[1px] bg-amber-500/30" />
              <span>&lt;node_manager_v4.0.1 /&gt;</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-8xl font-black tracking-tighter text-white leading-[0.85] md:leading-[0.8] mb-4 md:mb-8"
            >
              My <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-200 to-white/10 italic">Projects.</span>
            </motion.h2>
          </div>

          <div className="flex flex-col gap-4">
            <div className="font-mono text-[10px] text-amber-500/40 uppercase tracking-widest pl-4 border-l border-amber-500/20">
              $ grep_projects --tag:
            </div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-2 md:justify-end"
            >
              <button
                onClick={() => setActiveTag(null)}
                className={`relative px-4 py-2 rounded-sm font-mono text-[10px] uppercase tracking-widest transition-all duration-300 overflow-hidden group ${
                  activeTag === null 
                    ? 'text-slate-950 bg-amber-400' 
                    : 'text-white/40 border border-white/5 hover:border-amber-400/50 hover:text-white'
                }`}
              >
                <span className="relative z-10">all_nodes</span>
                <motion.div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              </button>
              {['React', 'Next.js', 'TailwindCSS','Node.js'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`relative px-4 py-2 rounded-sm font-mono text-[10px] uppercase tracking-widest transition-all duration-300 overflow-hidden group ${
                    activeTag === tag 
                      ? 'text-slate-950 bg-amber-400' 
                      : 'text-white/40 border border-white/5 hover:border-amber-400/50 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{tag.toLowerCase()}</span>
                  <motion.div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div 
          key={activeTag || 'all'}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 auto-rows-[320px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.title}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.95 }}
                onMouseMove={handleMouseMove}
                onClick={() => setSelectedProject(project)}
                style={{
                  perspective: 1000,
                }}
                className={`group relative rounded-xl overflow-hidden border border-white/5 bg-slate-950 flex flex-col shadow-2xl transition-all duration-500 hover:border-amber-500/50 cursor-pointer ${
                  project.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
                  project.size === 'medium' ? 'md:row-span-2' : ''
                }`}
              >
                <motion.div
                  className="w-full h-full flex flex-col"
                  whileHover={{
                    rotateY: mousePos.x * 10,
                    rotateX: mousePos.y * -10,
                    scale: 1.02,
                  }}
                  transition={{ type: "spring", damping: 20, stiffness: 100 }}
                >

                  <div className="h-10 bg-black border-b border-white/5 flex items-center justify-between px-5">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-900 border border-white/5 shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-slate-900 border border-white/5 shadow-inner" />
                      <div className="w-3 h-3 rounded-full bg-slate-900 border border-white/5 shadow-inner group-hover:bg-amber-500 group-hover:shadow-amber-500/50 transition-all duration-500" />
                    </div>
                    <div className="font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase">
                      LOC: 0x{index.toString(16).toUpperCase()} {"//"} NODE_{index + 1}
                    </div>
                  </div>

                  <div className="flex-1 relative overflow-hidden">
                    <div className="absolute inset-0 z-0 scale-110 group-hover:scale-100 transition-transform duration-1000">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover grayscale opacity-20 brightness-[0.5] group-hover:opacity-50 group-hover:brightness-100 transition-all duration-1000"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity flex flex-wrap font-mono text-[8px] text-amber-500 overflow-hidden select-none pointer-events-none p-4 gap-2">
                      {Array.from({ length: 60 }).map((_, i) => (
                        <div key={i} className="animate-pulse" style={{ animationDelay: `${(i % 10) * 0.1}s` }}>
                          {((index + i) * 6421 % 0xFFFF).toString(16).padStart(4, '0')}
                        </div>
                      ))}
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                    <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
                      <div className="flex items-center gap-6 mb-8 font-mono text-[9px] text-amber-500/40 uppercase tracking-widest transition-all duration-700 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100">
                        <div className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20 group-hover:bg-amber-500 animate-pulse" />
                          
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-[1px] bg-amber-500/20 group-hover:bg-amber-500/60" />
                        
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="px-3 py-1 rounded-sm bg-amber-500/5 text-amber-400 text-[10px] font-mono border border-amber-500/10 backdrop-blur-sm">
                            #{tag.toLowerCase()}
                          </span>
                        ))}
                      </div>

                      <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-amber-400 transition-all duration-500 mb-4 tracking-tighter leading-none">
                        {project.title}
                      </h3>
                      
                      <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed font-mono opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-6 group-hover:translate-y-0 max-w-sm">
                        ENTRY_LOG: &quot;{project.description}&quot;
                      </p>

                      <div className="flex items-center justify-between pt-8 border-t border-white/5 mt-8 opacity-0 group-hover:opacity-100 transition-all duration-700">
                        
                        <div className="text-amber-400 group/btn flex items-center gap-2 text-[11px] font-black uppercase tracking-widest bg-amber-400/5 px-4 py-2 rounded-sm border border-amber-400/10 hover:bg-amber-400 hover:text-black transition-all">
                          LINK_START <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                <div className="absolute inset-0 scanlines opacity-[0.05] pointer-events-none group-hover:opacity-0 transition-opacity" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={closeProjectModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full max-h-[85vh] bg-slate-950 border border-amber-500/20 rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeProjectModal}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-sm bg-black border border-white/10 flex items-center justify-center text-white hover:bg-amber-400 hover:text-black transition-all"
              >
                <X size={16} />
              </button>

              <div className="md:w-2/5 relative h-[250px] md:h-auto border-r border-white/5">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  fill
                  className="object-cover opacity-60"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 font-mono text-[10px] text-amber-500/60">
                   NODE_PREVIEW: ACTIVE
                </div>
              </div>

              <div className="md:w-3/5 p-6 md:p-10 overflow-y-auto flex-1">
                <div className="flex items-center gap-3 text-amber-500/80 font-mono text-[9px] uppercase tracking-widest mb-6">
                  <span>ROOT/PROJECTS/{selectedProject.title.replace(/\s+/g, '_').toUpperCase()}</span>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-6">
                  {selectedProject.title}
                </h3>
                
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 rounded-sm bg-white/5 border border-white/10 text-slate-400 text-[9px] font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-6 mb-12 font-mono text-xs leading-relaxed text-slate-400">
                  <p className="border-l border-amber-500 pl-4 py-1">
                    {selectedProject.longDescription}
                  </p>
                  <p className="opacity-60 italic">
                    &gt; {selectedProject.description}
                  </p>
                </div>
 
                <div className="flex gap-4">
                  <a href={selectedProject.github} className="flex-1 flex items-center justify-center gap-3 py-3 rounded-sm bg-white/5 border border-white/10 text-white font-mono text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all">
                    <Github size={16} />
                    <span>View_Source</span>
                  </a>
                  <a href={selectedProject.link} className="flex-1 flex items-center justify-center gap-3 py-3 rounded-sm bg-amber-400 text-slate-950 font-mono text-[10px] font-black uppercase tracking-widest hover:bg-amber-300 transition-all group">
                    <span>Deploy_Live</span>
                    <ExternalLink size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
