import React, { useEffect, useState, useRef } from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { motion, useMotionValue, useTransform } from "framer-motion";

const typingTexts = [
  "Computer Science Graduate",
  "A Passionate Web Developer",
  "Active Listener & Problem Solver",
];

const codeLines = [
  "// Always eager to learn new things",
  "const attitude = 'growth mindset';",
  "const eagerToLearn = true;",
  "function improve() {",
  "  if (eagerToLearn) {",
  "    practice.daily();",
  "    build.projects();",
  "    seek.feedback();",
  "    stay.humble();",
  "  }",
  "}",
  "",
  "improve();",
  "// Ready to contribute & grow!",
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const letterDrop = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 12, stiffness: 200 },
  },
};

const Hero = () => {
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    x.set((offsetX / (rect.width / 2)) * 100);
    y.set((offsetY / (rect.height / 2)) * 100);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };


  useEffect(() => {
    const currentText = typingTexts[textIndex];
    const typeSpeed = isDeleting ? 40 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1000);
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
        className="min-h-screen flex flex-col md:flex-row items-center justify-center text-left px-6 bg-[#e9d5a1] text-black dark:bg-black dark:text-white transition-colors duration-300 pt-32 md:pt-0 pb-12 md:pb-0"
      >
      <motion.div
        className="flex-1 max-w-xl"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 flex flex-wrap gap-2"
          variants={container}
        >
          {"Hi,".split("").map((char, index) => (
            <motion.span key={index} variants={letterDrop}>
              {char}
            </motion.span>
          ))}
          {"I'm".split("").map((char, index) => (
            <motion.span key={`im-${index}`} variants={letterDrop}>
              {char}
            </motion.span>
          ))}
          {"Menaka".split("").map((char, index) => (
            <motion.span
              key={`menaka-${index}`}
              className="text-[#A35C7A] dark:text-[#C890A7]"
              variants={letterDrop}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-pink-200 h-10 transition-all duration-300"
          variants={letterDrop}
        >
          {displayText}
        </motion.p>

        <motion.div
          ref={cardRef}
          className="mt-8 font-mono text-sm md:text-base bg-[#18181b] dark:bg-[#232336] border border-[#A35C7A] dark:border-[#C890A7] rounded-xl p-5 shadow-lg w-fit"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <pre className="text-gray-300">
            <span className="text-green-400">// Want to know more?</span>
            <br />
            <span className="text-pink-400">const</span> resume ={" "}
            <motion.a
              href="https://drive.google.com/file/d/1ywkzmenIPN0Sdv0T0imuVo-7Jm9qxtam/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-400 underline"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              "View Resume"
            </motion.a>
            ;
          </pre>
        </motion.div>

        <div className="flex gap-6 mt-12 text-2xl md:text-3xl lg:text-4xl text-[#A35C7A] dark:text-[#C890A7]">
          {[
            {
              icon: <FaLinkedin />,
              href: "https://www.linkedin.com/in/menakamohanraj",
              label: "MenakaMohanraj",
            },
            {
              icon: <MdEmail />,
              href: "mailto:menakamohanraj2003@gmail.com",
              label: "menakamohanraj2003@gmail.com",
            },
            {
              icon: <FaGithub />,
              href: "https://github.com/Menaka0411",
              label: "Menaka0411",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.3 }}
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#7e3f5e] dark:hover:text-pink-300 transition-colors"
              >
                {item.icon}
              </a>
              <div
                className="absolute top-full mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10
                          left-6 sm:left-1/2 sm:-translate-x-1/2"
              >
                <div className="relative bg-[#A35C7A] text-white text-xs md:text-sm px-4 py-2 rounded-lg shadow-md font-medium whitespace-nowrap">
                  {item.label}
                  <div
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 
                    border-l-8 border-r-8 border-b-8 border-transparent border-b-[#A35C7A]"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="flex-1 max-w-md flex justify-center items-center">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", duration: 1, delay: 0.5 }}
          className="relative w-[360px] h-[380px] bg-[#18181b] border-4 border-[#A35C7A] dark:bg-[#232336] dark:border-[#C890A7] rounded-3xl shadow-xl flex flex-col overflow-hidden"
        >
        
          <div className="flex items-center gap-2 p-3 bg-[#232336]">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
          </div>
         
          <div className="p-6 overflow-y-auto flex-1 font-mono text-sm text-gray-200">
            {codeLines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 + idx * 0.17, duration: 0.5 }}
                style={{ whiteSpace: "pre" }}
                className={
                  line.startsWith("//")
                    ? "text-green-400"
                    : line.includes("const")
                    ? "text-blue-300"
                    : line.includes("[") || line.includes("]")
                    ? "text-yellow-300"
                    : line.includes("deploy")
                    ? "text-pink-400"
                    : "text-gray-200"
                }
              >
                {line}
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-black/25" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
