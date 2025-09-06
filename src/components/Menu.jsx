import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { AiFillHome } from "react-icons/ai";
import { FaUserTie, FaCode, FaBriefcase } from "react-icons/fa";
import { GiSkills } from "react-icons/gi";
import { MdOutlineDarkMode, MdOutlineLightMode, MdVerified } from "react-icons/md";

const navItems = [
  { icon: AiFillHome, to: "home" },
  { icon: FaUserTie, to: "about" },
  { icon: GiSkills, to: "skills" },
  { icon: FaCode, to: "projects" },
  { icon: FaBriefcase, to: "experience" },
  { icon: MdVerified, to: "certify" },
];

const navItemWidth = 64;

const Menu = () => {
  const [active, setActive] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    let visibleSections = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });
        if (visibleSections.size > 0) {
          const mostVisible = Array.from(visibleSections.entries())
            .sort((a, b) => b[1] - a[1])[0][0];
          if (mostVisible !== active) setActive(mostVisible);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-30% 0px -70% 0px', 
      }
    );

    navItems.forEach(item => {
      const el = document.getElementById(item.to);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [active]);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark', newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const activeIndex = navItems.findIndex(i => i.to === active);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full px-2">
      <div className="hidden md:block fixed top-5 right-6 z-50">
        <button
          onClick={toggleMode}
          className="w-10 h-10 flex items-center justify-center text-xl
            bg-white/80 dark:bg-gray-700/70 text-gray-900 dark:text-gray-100
            rounded-full backdrop-blur-md shadow hover:scale-110 transition"
          aria-label="Toggle Theme"
        >
          {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>
      </div>

      <div className="relative w-full flex items-center justify-center max-w-[95vw] md:max-w-[70vw] mx-auto px-1 overflow-visible">
        <div className="flex-grow relative overflow-x-auto no-scrollbar">
          <ul className="flex items-center bg-white/70 dark:bg-gray-800/80 cursor-pointer backdrop-blur-md shadow-lg rounded-full relative px-1 py-1 min-h-[46px] w-fit mx-auto">
            <div
              className="absolute top-1/2 left-0 w-[40px] h-[40px] rounded-full bg-[#A35C7A] dark:bg-[#C890A7] z-10 transition-transform duration-300 transform -translate-y-1/2"
              style={{
                transform: `translateX(${activeIndex * navItemWidth + 16}px) translateY(-50%)`,
              }}
            />

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = active === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  smooth
                  duration={500}
                  offset={-70}
                  onClick={() => setActive(item.to)}
                  className="relative z-20 min-w-[64px] flex items-center justify-center"
                >
                  <div className="w-[40px] h-[40px] flex items-center justify-center">
                    <Icon
                      size={22}
                      className={`transition-colors duration-300 ${
                        isActive ? 'text-white' : 'text-gray-800 dark:text-white'
                      }`}
                    />
                  </div>
                </Link>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="md:hidden w-full flex justify-end px-2 pt-2">
        <button
          onClick={toggleMode}
          className="w-10 h-10 flex items-center justify-center text-xl
            bg-white/80 dark:bg-gray-700/70 text-gray-900 dark:text-gray-100
            rounded-full backdrop-blur-md shadow hover:scale-110 transition"
          aria-label="Toggle Theme"
        >
          {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>
      </div>
    </div>
  );
};

export default Menu;
