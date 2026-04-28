import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaCommentDots, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-scroll';

const ValueStack = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFanned, setIsFanned] = useState(false);

  const cards = [
    {
      id: 0,
      title: "Independent Developer",
      value: "Freelance & Academic",
      desc: "Delivering functional, responsive web solutions for academic projects and independent client requirements.",
      icon: <FaCode className="text-sky-400" />,
      color: "border-sky-500/20 shadow-sky-500/10",
      showProjects: true
    },
    {
      id: 1,
      title: "Full Stack Developer",
      value: "Engineer @Apt-Aura",
      desc: "Actively contributing to production-grade features and high-performance UI components in a startup environment.",
      icon: <FaRocket className="text-indigo-400" />,
      color: "border-indigo-500/20 shadow-indigo-500/10"
    },
    {
      id: 2,
      title: "Open for Collaboration",
      value: "Freelance & Roles",
      desc: "Available for professional freelance projects or impactful full-stack roles. Let's build something great together.",
      icon: <FaCommentDots className="text-emerald-400" />,
      color: "border-emerald-500/20 shadow-emerald-500/10",
      isLast: true
    }
  ];

  useEffect(() => {
    // Start the fan-out animation after the initial zoom finishes
    const fanTimer = setTimeout(() => setIsFanned(true), 2200);
    
    return () => clearTimeout(fanTimer);
  }, []);

  useEffect(() => {
    if (isPaused || !isFanned) return;
    
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, isFanned]);

  const getPosition = (idx) => {
    if (!isFanned) return "stacked"; // Before fan-out, all cards stay stacked
    
    const diff = (idx - activeIdx + 3) % 3;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    return "left";
  };

  const variants = {
    stacked: { 
      x: 0, 
      scale: 0.9, 
      zIndex: 10, 
      opacity: 0.5, 
      filter: "blur(4px)" 
    },
    center: { 
      x: 0, 
      scale: 1, 
      zIndex: 30, 
      opacity: 1, 
      filter: "blur(0px)" 
    },
    right: { 
      x: 120, 
      scale: 0.85, 
      zIndex: 10, 
      opacity: 0.4, 
      filter: "blur(2px)" 
    },
    left: { 
      x: -120, 
      scale: 0.85, 
      zIndex: 20, 
      opacity: 0.4, 
      filter: "blur(2px)" 
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center py-10">
      {/* The 3D Stack */}
      <div 
        className="relative w-full max-w-md h-[450px] flex items-center justify-center cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {cards.map((card, idx) => {
          const pos = getPosition(idx);
          const isActive = pos === "center";
          const isTopCardInStack = !isFanned && idx === 0;

          return (
            <motion.div
              key={card.id}
              initial="stacked"
              animate={pos === "stacked" && isTopCardInStack ? { ...variants.center, scale: 0.9, opacity: 1 } : variants[pos]}
              transition={{ 
                type: "spring", 
                stiffness: 200, 
                damping: 25,
                delay: isFanned ? 0 : idx * 0.1 // Stagger the stack arrival slightly
              }}
              onClick={() => isFanned && setActiveIdx(idx)}
              className={`absolute w-64 md:w-72 h-full glass-card p-8 rounded-[2.5rem] border ${card.color} shadow-2xl backdrop-blur-2xl flex flex-col items-center text-center select-none`}
            >
              {/* Top Icon */}
              <div className="w-14 h-14 bg-white/5 rounded-3xl flex items-center justify-center text-2xl mb-8 border border-white/5">
                {card.icon}
              </div>

              <div className="space-y-4 flex-1">
                <p className="text-[9px] uppercase tracking-[0.3em] text-slate-500 font-black">{card.title}</p>
                <h3 className="text-xl font-extrabold text-white leading-tight">{card.value}</h3>
                <p className={`text-xs leading-relaxed text-slate-400 font-medium transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                  {card.desc}
                </p>
              </div>

              {/* CTAs */}
              {card.showProjects && (
                <div className={`mt-auto w-full transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <Link
                    to="projects"
                    smooth
                    duration={500}
                    offset={-70}
                    className="w-full py-3.5 bg-sky-500 hover:bg-sky-400 text-slate-950 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-lg shadow-sky-500/20"
                  >
                    View My Work
                    <FaExternalLinkAlt className="text-xs" />
                  </Link>
                </div>
              )}

              {card.isLast && (
                <div className={`mt-auto w-full transition-all duration-500 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <button className="w-full py-3.5 bg-white/5 border border-white/10 text-slate-300 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
                    <FaCommentDots className="text-lg" />
                    Start Discussion
                  </button>
                </div>
              )}

              {!card.showProjects && !card.isLast && <div className="mt-auto h-12" />}
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Dots */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isFanned ? 1 : 0 }}
        className="flex gap-4 mt-12 relative z-50"
      >
        {cards.map((_, i) => (
          <button
            key={i}
            onClick={() => isFanned && setActiveIdx(i)}
            className={`h-2 rounded-full transition-all duration-500 hover:bg-sky-400 ${
              i === activeIdx ? 'w-10 bg-sky-500' : 'w-3 bg-slate-800'
            }`}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default ValueStack;
