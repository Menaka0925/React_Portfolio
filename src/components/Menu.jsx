import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { AiFillHome } from "react-icons/ai";
import { FaUserTie, FaCode, FaBriefcase, FaBook } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { icon: AiFillHome, to: "home", label: "Home" },
  { icon: FaUserTie, to: "about", label: "About" },
  { icon: FaBriefcase, to: "experience", label: "Work" },
  { icon: FaCode, to: "projects", label: "Projects" },
  { icon: FaBook, to: "publications", label: "Publications" },
];

const Menu = () => {
  const [active, setActive] = useState('home');
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    navItems.forEach(item => {
      const el = document.getElementById(item.to);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* DESKTOP VERTICAL DOCK */}
      <nav className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-[100] hidden sm:block">
        <div className="glass-card rounded-full py-4 px-3 flex flex-col items-center gap-4 border-white/5 shadow-2xl backdrop-blur-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.to;
            
            return (
              <div key={item.to} className="relative flex items-center group">
                <AnimatePresence>
                  {hovered === item.to && (
                    <motion.div
                      initial={{ opacity: 0, x: 10, scale: 0.8 }}
                      animate={{ opacity: 1, x: -15, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.8 }}
                      className="absolute right-full mr-4 px-3 py-1.5 glass rounded-lg border-white/10 text-[10px] font-bold uppercase tracking-widest text-sky-400 whitespace-nowrap shadow-xl pointer-events-none"
                    >
                      {item.label}
                    </motion.div>
                  )}
                </AnimatePresence>

                <Link
                  to={item.to}
                  smooth
                  duration={500}
                  onSetActive={() => setActive(item.to)}
                  onMouseEnter={() => setHovered(item.to)}
                  onMouseLeave={() => setHovered(null)}
                  className="relative p-3 cursor-pointer group flex items-center justify-center transition-all duration-300"
                >
                  <div className="relative z-10">
                    <Icon
                      size={22}
                      className={`transition-all duration-300 ${
                        isActive ? "text-slate-950 scale-110" : "text-slate-400 group-hover:text-slate-100 group-hover:scale-110"
                      }`}
                    />
                  </div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="nav-active-vertical"
                      className="absolute inset-0 bg-sky-500 rounded-full z-0 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </div>
      </nav>

      {/* MOBILE HORIZONTAL PILL */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] sm:hidden w-[90%] max-w-[320px]">
        <div className="glass rounded-full px-2 py-1.5 flex items-center justify-around border-white/10 shadow-2xl backdrop-blur-xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                smooth
                duration={500}
                onSetActive={() => setActive(item.to)}
                className="relative px-4 py-2 cursor-pointer flex items-center justify-center"
              >
                <div className="relative z-10">
                  <Icon
                    size={18}
                    className={`transition-colors duration-300 ${
                      isActive ? "text-slate-950" : "text-slate-400"
                    }`}
                  />
                </div>
                
                {isActive && (
                  <motion.div
                    layoutId="nav-active-mobile"
                    className="absolute inset-0 bg-sky-500 rounded-full z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Menu;
