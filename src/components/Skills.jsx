import React from 'react';
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython } from 'react-icons/fa';
import { SiMongodb, SiMysql, SiPhp } from 'react-icons/si';
import { BiBarChartAlt2 } from 'react-icons/bi';
import { motion } from 'framer-motion';

// Skills data
const skills = [
  { name: 'HTML5', icon: <FaHtml5 /> },
  { name: 'CSS3', icon: <FaCss3Alt /> },
  { name: 'JavaScript', icon: <FaJs /> },
  { name: 'React', icon: <FaReact /> },
  { name: 'Node.js', icon: <FaNodeJs /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'MySQL', icon: <SiMysql /> },
  { name: 'PHP', icon: <SiPhp /> },
  { name: 'Python', icon: <FaPython /> },
  { name: 'Power BI', icon: <BiBarChartAlt2 /> },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
};

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40, rotate: -10, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 120, damping: 15 },
  },
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="py-20 px-6 bg-[#e9d5a1] dark:bg-black text-black dark:text-white transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-2 text-[#A35C7A] dark:text-[#C890A7]"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Tech Stack
        </motion.h2>

        <motion.p
          className="text-center text-sm font-medium mb-12 text-[#7f5a6b] dark:text-white tracking-wide"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          Technologies I use to craft innovative applications.
        </motion.p>

        <motion.ul
          className="flex flex-wrap justify-center gap-10 sm:gap-14"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {skills.map((skill, idx) => (
            <motion.li
              key={idx}
              variants={item}
              className="flex flex-col items-center transition-transform duration-300 hover:scale-115"
            >
              <div className="text-[2.5rem] sm:text-[3rem] text-[#A35C7A] dark:text-[#C890A7]">
                {skill.icon}
              </div>
              <p className="mt-2 text-sm font-medium text-[#212121] dark:text-[#FFFCFB] tracking-wide">
                {skill.name}
              </p>
            </motion.li>
          ))}
        </motion.ul>

      </div>
    </section>
  );
};

export default Skills;
