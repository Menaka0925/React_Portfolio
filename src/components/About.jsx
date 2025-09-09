import React from 'react';
import { FaReact, FaNodeJs, FaHtml5 } from 'react-icons/fa';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: 'easeOut' 
    } 
  },
};

const About = () => {
  return (
    <section
      id="about"
      className="pt-20 pb-24 px-6 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 overflow-x-hidden"
    >
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
      >
        <h2 className="text-4xl font-bold text-center mb-2 text-[#A35C7A] dark:text-[#C890A7]">
          Behind the Code
        </h2>
        <p className="text-center text-sm font-medium mb-12 text-[#7f5a6b] dark:text-white tracking-wide">
          Crafting elegant solutions, one line of code at a time.
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">

          <motion.div
            className="flex justify-center md:w-1/3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ delay: 0.15 }}
          >
            <div className="bg-white dark:bg-white/10 shadow-xl border border-gray-300 dark:border-white/20 rounded-md px-4 pt-4 pb-6 text-center w-[270px]">
              <img
                src= "/menaka.jpg"
                alt="Menaka M"
                className="w-full h-[260px] object-cover rounded"
              />
              <div className="mt-6 flex justify-center gap-6 text-[2.2rem] text-[#C890A7] dark:text-rose-300">
                <FaHtml5 />
                <FaReact />
                <FaNodeJs />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full mt-4 md:w-2/3 bg-gray-50 dark:bg-gray-900 rounded-md shadow-md border border-gray-200 dark:border-gray-700"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >

            <div className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 rounded-t-md">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="w-3 h-3 bg-yellow-400 rounded-full" />
              <span className="w-3 h-3 bg-green-500 rounded-full" />
            </div>

            <div className="px-6 py-6 font-mono text-base leading-loose text-gray-800 dark:text-gray-300">
              <p className="text-lg">
                <span className="font-semibold text-black dark:text-white">Hello :)</span>
              </p>
              <p className="mt-4">
                I’m <span className="font-semibold text-black dark:text-white">Menaka M</span>, 
                a 2025 B.E. graduate in Computer Science Engineering with 7.9 CGPA.
                I’m passionate about learning, exploring new technologies, 
                and turning ideas into impactful digital experiences.
              </p>
              <p className="mt-4">
                I specialize in the MERN stack and enjoy blending design and logic 
                to build user-friendly web applications.
                I’m known for being adaptable, collaborative, 
                and always excited to solve real-world problems through code.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
