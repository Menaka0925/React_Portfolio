import React, { useState, useEffect, useRef } from "react";
import { FaCalendarAlt, FaTimes, FaMapMarkerAlt } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// DEFINED COORDINATES
const MAP_WIDTH = 1700;
const MAP_HEIGHT = 400;

const workData = [
  {
    id: 1,
    title: "Web Development Intern",
    company: "CodeBind Technologies",
    location: "Trichy",
    duration: "2024",
    stack: ["HTML", "CSS", "JavaScript"],
    details: [
      "Built responsive interfaces with HTML, CSS, and JavaScript.",
      "Enhanced UI/UX with interactive design elements."
    ],
    icon: "01",
    x: 200,
    y: 280
  },
  {
    id: 2,
    title: "Data Analytics Intern",
    company: "NullClass Edtech",
    location: "Dharmapuri - Remote",
    duration: "Nov – Dec 2024",
    stack: ["Power BI"],
    details: [
      "Analyzed datasets and generated actionable insights using Power BI.",
      "Improved team reporting and visualization techniques."
    ],
    icon: "02",
    x: 550,
    y: 120
  },
  {
    id: 3,
    title: "Frontend Tech Intern",
    company: "IBM Training",
    location: "Remote",
    duration: "Mar – May 2025",
    stack: ["JavaScript", "React", "Angular", "Node.js", "Express.js", "MongoDB"],
    details: [
      "Completed modules on React JS, Directives, DOM, and Views, gaining practical experience in building responsive front-end components.",
      "Explored JavaScript, jQuery, and AngularJS, and received exposure to WordPress for UI development."
    ],
    icon: "03",
    x: 900,
    y: 280
  },
  {
    id: 4,
    title: "Full Stack Dev Intern",
    company: "Adroit Technologies",
    location: "Coimbatore - Remote",
    duration: "Mar – Apr 2025",
    stack: ["MERN Stack"],
    details: [
      "Completed a 1-month internship in Full Stack Development, gaining hands-on experience in building and deploying web applications.",
      "Enhanced technical skills across front-end and back-end development while adhering to best practices."
    ],
    icon: "04",
    x: 1250,
    y: 120
  },
  {
    id: 5,
    title: "Full Stack Developer",
    company: "Apt-Aura",
    location: "Remote",
    duration: "Dec 2025 – Present",
    stack: ["React", "TypeScript", "Supabase"],
    details: [
      "Collaborating directly with founders to build and maintain business-critical production features for the main platform and company website.",
      "Architecting end-to-end workflows and optimizing data flow across product modules using React, TypeScript, and Supabase."
    ],
    isCurrent: true,
    icon: "05",
    x: 1600,
    y: 280
  }
];

const Work = () => {
  const [selectedWork, setSelectedWork] = useState(null);
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollRef = useRef(null);

  // Path that flows through ALL 5 nodes
  const pathD = `M 50,200 
                C 100,200 100,280 ${workData[0].x},${workData[0].y} 
                C 350,280 350,120 ${workData[1].x},${workData[1].y} 
                C 750,120 750,280 ${workData[2].x},${workData[2].y} 
                C 1050,280 1050,120 ${workData[3].x},${workData[3].y} 
                C 1450,120 1450,280 ${workData[4].x},${workData[4].y} 
                L 1650,280`;

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setIsScrollable(scrollRef.current.scrollWidth > scrollRef.current.clientWidth);
      }
    };
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedWork) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedWork]);

  return (
    <section id="experience" className="pt-24 pb-0 px-6 bg-[#020617] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            The <span className="text-gradient">Quest</span> Map
          </h2>
          <p className="text-slate-600 font-mono text-[9px] uppercase tracking-[0.5em]">Career Milestones</p>
        </motion.div>

        <div className="flex justify-center mb-6">
          <AnimatePresence>
            {isScrollable && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex items-center gap-2 text-slate-500"
              >
                <span className="text-[9px] font-mono uppercase tracking-[0.4em]">Scroll</span>
                <motion.div animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-slate-500">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div
          ref={scrollRef}
          className="relative w-full overflow-x-auto no-scrollbar pb-8"
          style={{ perspective: "1200px" }}
        >
          <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>

          <div
            className="min-w-[1700px] relative h-[400px]"
            style={{
              transform: "rotateX(40deg)",
              transformStyle: "preserve-3d",
              transformOrigin: "center center"
            }}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}>
              <motion.path d={pathD} fill="none" stroke="rgba(56, 189, 248, 0.08)" strokeWidth="14" strokeLinecap="round" />
              <motion.path
                d={pathD}
                fill="none"
                stroke="url(#questPathGrad)"
                strokeWidth="4"
              />
              <defs>
                <linearGradient id="questPathGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38bdf8" /><stop offset="100%" stopColor="#818cf8" />
                </linearGradient>
              </defs>
            </svg>

            {workData.map((work, idx) => (
              <motion.div
                key={work.id}
                className="absolute z-20 group cursor-pointer"
                style={{
                  left: `${work.x}px`,
                  top: `${work.y}px`,
                  transform: 'translate(-50%, -50%)',
                  transformStyle: "preserve-3d"
                }}
                onClick={() => setSelectedWork(work)}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-lg font-black transition-all duration-500 shadow-2xl ${work.isCurrent
                  ? "bg-sky-500 text-slate-950 shadow-[0_10px_40px_rgba(56,189,248,0.5)]"
                  : "bg-slate-900 text-slate-500 border-2 border-slate-700 hover:border-sky-500 hover:text-sky-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                  }`}>
                  {work.icon}
                </div>

                <div
                  className="absolute top-[100%] pt-6 left-1/2 text-center w-40 pointer-events-none"
                  style={{
                    transform: "translateX(-50%) rotateX(-40deg)",
                    transformOrigin: "top center"
                  }}
                >
                  <h4 className="text-white font-bold text-xs mb-1 tracking-tight group-hover:text-sky-400 transition-colors drop-shadow-lg">{work.title}</h4>
                  <p className="text-slate-500 font-mono text-[7px] uppercase tracking-widest">{work.company}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Modal — Glass overlay, see-through */}
      <AnimatePresence>
        {selectedWork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/30 backdrop-blur-sm"
            onClick={() => setSelectedWork(null)}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 40 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="bg-slate-950/80 backdrop-blur-2xl border border-sky-500/10 max-w-xl w-full rounded-xl p-10 relative shadow-[0_0_100px_rgba(56,189,248,0.08)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedWork(null)} className="absolute top-8 right-8 text-slate-600 hover:text-white transition-colors"><FaTimes size={16} /></button>

              {/* Header */}
              <div className="flex items-start gap-5 mb-8">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 ${selectedWork.isCurrent ? "bg-sky-500 text-slate-950" : "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                  }`}>
                  {selectedWork.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight leading-tight">{selectedWork.title}</h3>
                  <p className="text-sky-400 font-mono text-[10px] uppercase tracking-[0.3em] mt-1">{selectedWork.company}</p>
                </div>
              </div>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-[10px] text-slate-400 font-mono border border-white/5">
                  <FaCalendarAlt className="text-sky-500" size={10} />
                  {selectedWork.duration}
                </div>
                {selectedWork.location && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 rounded-full text-[10px] text-slate-400 font-mono border border-white/5">
                    <FaMapMarkerAlt className="text-sky-500" size={10} />
                    {selectedWork.location}
                  </div>
                )}
                {selectedWork.isCurrent && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 rounded-full text-[10px] text-emerald-400 font-bold border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    ACTIVE
                  </div>
                )}
              </div>

              {/* Contributions */}
              <div className="space-y-2 mb-8">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 mb-2">Key Contributions</p>
                {selectedWork.details.map((detail, i) => (
                  <div key={i} className="flex gap-2 text-slate-300 text-[12px] leading-relaxed bg-white/[0.03] py-2.5 px-4 rounded-xl border border-white/5">
                    <span className="text-sky-500 mt-0.5 shrink-0">▸</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 mb-3">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {selectedWork.stack.map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 bg-sky-500/10 text-sky-400 text-[10px] font-bold uppercase rounded-lg border border-sky-500/10 tracking-widest">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Work;
