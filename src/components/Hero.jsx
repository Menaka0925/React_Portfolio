import React, { useEffect, useState } from "react";
import { FaLinkedin, FaGithub, FaTwitter, FaFileDownload } from "react-icons/fa";
import { MdEmail, MdArrowForward } from "react-icons/md";
import { motion } from "framer-motion";
import NeuralWeb from "./NeuralWeb";
import ValueStack from "./ValueStack";
import ResumeModal from "./ResumeModal";
import { trackEvent } from "../utils/analytics";

const typingTexts = [
  "Full Stack Developer",
  "Building Production-Ready Applications",
  "Crafting Seamless Digital Experiences",
];

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [resumeModal, setResumeModal] = useState({ isOpen: false, url: "", title: "" });

  useEffect(() => {
    const currentText = typingTexts[textIndex];
    const typeSpeed = isDeleting ? 40 : 80;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center px-6 py-10 overflow-hidden bg-[#020617]"
    >
      {/* Cinematic Intro Flash */}
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        animate={{ scale: 100, opacity: 0 }}
        transition={{ duration: 1.2, ease: "circIn", delay: 0.2 }}
        className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
      >
        <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_50px_20px_white]" />
      </motion.div>

      {/* Background Neural Web */}
      <div className="absolute inset-0 z-0 opacity-30">
        <NeuralWeb />
      </div>

      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-between z-10">
        {/* Left Side Content - Swipe from Left */}
        <motion.div 
          className="flex-1 max-w-2xl text-center lg:text-left mt-12 lg:mt-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        >
          <div>
            <h2 className="text-sky-400 font-mono mb-4 tracking-[0.2em] uppercase text-xs md:text-sm font-bold">
              Full Stack Developer @Apt-Aura
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.1] text-white overflow-hidden">
              <motion.span 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="inline-block mr-4"
              >
                Building
              </motion.span>
              <motion.span 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
                className="inline-block mr-4"
              >
                Digital
              </motion.span>
              <br />
              <motion.span 
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                className="text-gradient inline-block"
              >
                Experiences.
              </motion.span>
            </h1>
          </div>

          <motion.div
            className="text-lg md:text-2xl text-slate-400 font-medium mb-10 h-8 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <span className="text-sky-500 mr-2">&gt;</span>
            {displayText}
            <span className="animate-pulse ml-1 inline-block w-1 h-6 bg-sky-500 align-middle" />
          </motion.div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-6 justify-center lg:justify-start items-center">
            {/* Sleek Minimalist Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setResumeModal({ 
                    isOpen: true, 
                    url: "https://drive.google.com/file/d/1-LIDoXYL7K4BP176gJgT5_0bnQONlMzB/view?usp=sharing",
                    title: "Resume" 
                  });
                  trackEvent("RESUME_VIEW", "Resume");
                }}
                className="px-5 py-2.5 border border-sky-500/50 text-sky-400 hover:bg-sky-500 hover:text-slate-950 text-xs font-bold uppercase tracking-widest rounded-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <FaFileDownload className="text-sm" />
                Resume
              </button>
            </div>

            {/* Minimalist Social Dock Overlay */}
            <div className="flex items-center gap-1">
              {[
                { icon: <FaGithub />, href: "https://github.com/Menaka0411", label: "GitHub", hover: "hover:text-white" },
                { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/menakamohanraj", label: "LinkedIn", hover: "hover:text-[#38bdf8]" },
                { icon: <MdEmail />, href: "https://mail.google.com/mail/?extsrc=mailto&url=mailto:menakamohanraj2003@gmail.com", label: "Email", hover: "hover:text-[#ea4335]" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  onClick={() => trackEvent("SOCIAL_CLICK", social.label)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 text-slate-500 ${social.hover} transition-all duration-300 hover:scale-110 relative group`}
                >
                  <div className="text-xl">{social.icon}</div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-[10px] text-white rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-tighter">
                    {social.label}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Side Content - Professional Value Stack Zoom In */}
        <motion.div 
          className="flex-1 w-full lg:max-w-xl h-[500px] lg:h-[600px] mt-12 lg:mt-0"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <ValueStack />
        </motion.div>
      </div>
      <ResumeModal 
        isOpen={resumeModal.isOpen} 
        onRequestClose={() => setResumeModal({ ...resumeModal, isOpen: false })}
        resumeUrl={resumeModal.url}
        title={resumeModal.title}
      />
    </section>
  );
};

export default Hero;
