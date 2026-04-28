import React from 'react';
import { FaCode, FaRocket, FaLightbulb, FaJs, FaReact, FaNodeJs, FaHtml5, FaCss3Alt } from 'react-icons/fa';
import { SiMongodb, SiMysql, SiPhp, SiSupabase, SiTypescript, SiTailwindcss, SiPostman, SiFramer, SiGithub } from 'react-icons/si';
import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML5', icon: <FaHtml5 />, color: 'text-[#E34F26]' },
  { name: 'CSS3', icon: <FaCss3Alt />, color: 'text-[#1572B6]' },
  { name: 'React', icon: <FaReact />, color: 'text-[#61DAFB]' },
  { name: 'TypeScript', icon: <SiTypescript />, color: 'text-[#3178C6]' },
  { name: 'JavaScript', icon: <FaJs />, color: 'text-[#F7DF1E]' },
  { name: 'Tailwind', icon: <SiTailwindcss />, color: 'text-[#06B6D4]' },
  { name: 'Node.js', icon: <FaNodeJs />, color: 'text-[#339933]' },
  { name: 'MongoDB', icon: <SiMongodb />, color: 'text-[#47A248]' },
  { name: 'MySQL', icon: <SiMysql />, color: 'text-[#4479A1]' },
  { name: 'Supabase', icon: <SiSupabase />, color: 'text-[#3ECF8E]' },
  { name: 'PHP', icon: <SiPhp />, color: 'text-[#777BB4]' },
  { name: 'Postman', icon: <SiPostman />, color: 'text-[#FF6C37]' },
  { name: 'Framer', icon: <SiFramer />, color: 'text-white' },
  { name: 'Github', icon: <SiGithub />, color: 'text-white' },
];

const About = () => {
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <section
      id="about"
      className="py-16 px-6 relative bg-[#020617] overflow-hidden select-none"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Behind the <span className="text-gradient">Code</span>
          </h2>
          <div className="h-1 w-20 bg-sky-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-slate-400 text-lg leading-relaxed"
          >
            <p>
              I'm <span className="text-slate-100 font-semibold">Menaka M</span>, a Computer Science Engineering graduate with a deep passion for building high-performance, scalable web applications. Currently, I'm working as a <span className="text-sky-400 font-medium">Full Stack Developer</span> at the international startup, Apt-Aura.
            </p>
            <p>
              My journey is driven by a curiosity for how things work under the hood. I specialize in the <span className="text-slate-100">MERN stack</span>, focusing on creating seamless user experiences and robust backend architectures.
            </p>
            <p>
              Whether it's architecting a complex database or polishing a pixel-perfect UI, I thrive on the challenges that come with modern web development. I'm always eager to learn new technologies and contribute to innovative projects.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {[
                { icon: <FaRocket />, title: "Leadership Access", desc: "Collaborating directly with Founders and Directors to drive product vision." },
                { icon: <FaCode />, title: "Global Sync", desc: "Expertly managing remote workflows across IST and UK (GMT) timezones." },
                { icon: <FaLightbulb />, title: "Direct Impact", desc: "Building core production features in a fast-paced international startup." }
              ].map((item, i) => (
                <div key={i} className="p-4 glass-card rounded-xl border border-white/5 hover:border-sky-500/30 transition-colors">
                  <div className="text-sky-400 text-2xl mb-2">{item.icon}</div>
                  <h4 className="text-slate-100 font-bold mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative glass-card rounded-2xl p-2 overflow-hidden">
                {/* Image Protection Overlay */}
                <div 
                  className="absolute inset-0 z-20 bg-transparent" 
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                />
                <img
                  src="/Img2.jpeg"
                  alt="Menaka M"
                  onContextMenu={(e) => e.preventDefault()}
                  onDragStart={(e) => e.preventDefault()}
                  className="w-full aspect-square object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              {/* Stats/Floating elements */}
              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 glass p-3 md:p-4 rounded-xl border-slate-700 shadow-2xl z-30">
                <div className="text-xl md:text-2xl font-bold text-indigo-400">6+</div>
                <div className="text-[10px] md:text-xs text-slate-300 uppercase tracking-wider font-bold">Months Experience</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Marquee Integrated into About */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="pt-1 border-t border-white/5"
        >
          <div className="relative flex overflow-hidden group">
            <div className="flex gap-10 py-1 marquee-content">
              {duplicatedSkills.map((skill, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 group/item">
                  <div className="w-12 h-12 md:w-14 md:h-14 glass-card rounded-xl flex items-center justify-center transition-all duration-300 group-hover/item:border-sky-500/50 group-hover/item:shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                    <div className={`text-2xl md:text-3xl transition-transform duration-300 group-hover/item:scale-110 ${skill.color}`}>
                      {skill.icon}
                    </div>
                  </div>
                  <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest group-hover/item:text-sky-400 transition-colors">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-20 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .marquee-content {
          display: flex;
          gap: 2.5rem;
          animation: marquee 60s linear infinite;
        }
        .marquee-content:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}} />
    </section>
  );
};

export default About;
