import React, { useState } from "react";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";
import CertModal from "./CertModal";
import { motion } from 'framer-motion';

import certImg1 from "../assets/cert_img/IBM-FT.jpg";
import certImg2 from "../assets/cert_img/ibm-js.jpg";
import certImg3 from "../assets/cert_img/NPTEL_certify.jpg";
import certImg4 from "../assets/cert_img/NullClass.png";
import certImg5 from "../assets/cert_img/intern.jpg";
import certImg6 from "../assets/cert_img/Deloite_certify.jpg";
import certImg7 from "../assets/cert_img/Ai certify.png";
import certImg8 from "../assets/cert_img/Guvi.png";
import certImg9 from "../assets/cert_img/mern.png";
import certImg10 from "../assets/cert_img/powerbi.png";
import certImg11 from "../assets/cert_img/rweb.png";
import certImg12 from "../assets/cert_img/javascript.png";

const certData = [
  {
    image: certImg1,
    title: "Frontend Technologies",
    subtitle1: "Certified by:",
    content1: "IBM",
    subtitle2: "Description:",
    content2: "1-Month Course on Frontend Technologies",
  },
  {
    image: certImg2,
    title: "Fundamentals of JavaScript",
    subtitle1: "Certified by:",
    content1: "IBM CognitiveClass",
    subtitle2: "Description:",
    content2: "Fundamentals of JavaScript",
  },
  {
    image: certImg3,
    title: "Web Technology",
    subtitle1: "Certified by:",
    content1: "NPTEL",
    subtitle2: "Description:",
    content2: "Learned web basics and advanced topics",
  },
  {
    image: certImg4,
    title: "Power BI",
    subtitle1: "Certified by:",
    content1: "NullClass",
    subtitle2: "Description:",
    content2: "Data visualization with Power BI",
  },
  {
    image: certImg5,
    title: "Web Development",
    subtitle1: "Certified by:",
    content1: "CodeBind Technologies",
    subtitle2: "Description:",
    content2: "Developed real-time websites",
  },
  {
    image: certImg6,
    title: "Software Technologies",
    subtitle1: "Certified by:",
    content1: "Deloitte Australia",
    subtitle2: "Description:",
    content2: "Technology Job Simulation (Forage)",
  },
  {
    image: certImg7,
    title: "AI Tools",
    subtitle1: "Certified by:",
    content1: "be10X",
    subtitle2: "Description:",
    content2: "Fundamentals of Artificial Intelligence",
  },
  {
    image: certImg8,
    title: "Learnathon",
    subtitle1: "Certified by:",
    content1: "GUVI",
    subtitle2: "Description:",
    content2: "Participated in SAWIT.AI Learnathon",
  },
  {
    image: certImg9,
    title: "MERN Stack Training",
    subtitle1: "Certified by:",
    content1: "Great Learning",
    subtitle2: "Description:",
    content2: "Fundamentals of MongoDB, Express, React, Node",
  },
  {
    image: certImg10,
    title: "Power BI",
    subtitle1: "Certified by:",
    content1: "Great Learning",
    subtitle2: "Description:",
    content2: "Data Visualization with Power BI",
  },
  {
    image: certImg11,
    title: "Responsive Web Design",
    subtitle1: "Certified by:",
    content1: "freeCodeCamp",
    subtitle2: "Description:",
    content2: "HTML, CSS, and Flexbox Projects",
  },
  {
    image: certImg12,
    title: "JavaScript Algorithms and Data Structures",
    subtitle1: "Certified by:",
    content1: "freeCodeCamp",
    subtitle2: "Description:",
    content2: "Gained knowledge on JS Data Structures and Logic",
  },
];

const CARD_WIDTH = 480;
const CARD_SHIFT = 260;

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Certify = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const total = certData.length;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const handlePrev = () => setCurrentIndex(prevIndex);
  const handleNext = () => setCurrentIndex(nextIndex);
  const openModal = (index) => {
    setSelectedIndex(index);
    setModalOpen(true);
  };
  const closeModal = () => setModalOpen(false);

  return (
    <section
      id="certify"
      className="bg-white dark:bg-black flex flex-col justify-center items-center px-4 py-12"
    >
      <motion.h2
className="text-center text-3xl md:text-4xl font-bold 
             text-[#A35C7A] dark:text-[#D9B7C2] mb-3"        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        Professional Credentials
      </motion.h2>
      <motion.p
        className="text-center text-sm font-medium mb-5 text-[#7f5a6b] dark:text-white tracking-wide"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        Verified certifications that reflect my skills and commitment to continuous learning.
      </motion.p>

      <div
        className="relative hidden sm:flex flex-col justify-center items-center w-full"
        style={{ height: 400 }}
      >

        <button
          onClick={handlePrev}
          className="z-40 absolute left-10 top-[48%] -translate-y-1/2 p-2 md:p-3 rounded-full bg-[#A35C7A] text-white dark:bg-[#D9B7C2] dark:text-gray-900"
          aria-label="Previous certificate"
        >
          <GrCaretPrevious size={20} />
        </button>

        <div className="relative w-full" style={{ height: 320 }}>
          {[prevIndex, currentIndex, nextIndex].map((idx) => {
            const cert = certData[idx];
            let tx = 0;
            let scale = 1;
            let z = 20;
            let op = 1;
            if (idx === prevIndex) {
              tx = -CARD_SHIFT;
              scale = 0.8;
              z = 10;
              op = 0.7;
            } else if (idx === nextIndex) {
              tx = CARD_SHIFT;
              scale = 0.8;
              z = 10;
              op = 0.7;
            }
            return (
              <div
                key={idx}
                className="absolute top-1/2 left-1/2 transition-transform duration-700"
                style={{
                  width: CARD_WIDTH,
                  height: 320,
                  transform: `translate(-50%, -50%) translateX(${tx}px) scale(${scale})`,
                  zIndex: z,
                  opacity: op,
                }}
                aria-hidden={idx !== currentIndex}
              >
                <div className="bg-[#cf909d] dark:bg-white/10 dark:bg-opacity-20 text-[#212121] dark:text-gray-100 border border-[#e0d4d9] dark:border-gray-600 rounded-xl shadow-xl w-[320px] md:w-[480px] h-[320px] flex items-center justify-center relative mx-auto backdrop-blur-sm">
                  <div className="bg-white dark:bg-transparent dark:border-gray-600 dark:border-2 w-[90%] md:w-[430px] h-[240px] flex rounded-lg shadow-inner relative mx-auto">

                    <div className="w-1/2 flex items-center justify-center p-2">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="h-full w-full object-contain rounded"
                      />
                    </div>

                    <div className="w-1/2 flex flex-col justify-center p-2 text-left">
                      <h2 className="text-md font-bold text-[#A35C7A] dark:text-[#D9B7C2]">
                        {cert.title}
                      </h2>
                      <div className="text-sm font-semibold">{cert.subtitle1}</div>
                      <div className="text-sm">{cert.content1}</div>
                      <div className="text-sm font-semibold mt-2">{cert.subtitle2}</div>
                      <div className="text-sm">{cert.content2}</div>
                    </div>

                    <button
                      onClick={() => openModal(idx)}
                      className="absolute bottom-2 right-2 px-4 py-1 rounded-full bg-white bg-opacity-30 backdrop-blur-md text-sm font-semibold text-[#A35C7A] dark:text-[#D9B7C2] border border-[#A35C7A] dark:border-[#D9B7C2] hover:bg-[#A35C7A] hover:text-white dark:hover:bg-[#D9B7C2] dark:hover:text-gray-900 transition"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex space-x-3 justify-center w-full z-50">
          {certData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-4 h-4 rounded-full border-2 cursor-pointer border-[#A35C7A] dark:border-[#D9B7C2] focus:outline-none transition ${
                currentIndex === idx
                  ? "bg-[#A35C7A] dark:bg-[#D9B7C2]"
                  : "bg-transparent"
              }`}
              aria-label={`Go to certificate slide ${idx + 1}`}
              aria-current={currentIndex === idx}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="z-40 absolute right-10 top-[48%] -translate-y-1/2 p-2 md:p-3 rounded-full bg-[#A35C7A] text-white dark:bg-[#D9B7C2] dark:text-gray-900"
          aria-label="Next certificate"
        >
          <GrCaretNext size={20} />
        </button>
      </div>

      <div className="w-full max-w-xl sm:hidden flex flex-col items-center">
        <div
          className="w-full flex justify-center items-center relative"
          style={{ height: 320 }}
        >
          <div
            className="w-full flex flex-col items-center"
            style={{ width: "100%", maxWidth: 400 }}
            aria-live="polite"
          >
            <div className="bg-[#cf909d] dark:bg-white/10 dark:bg-opacity-20 text-[#212121] dark:text-gray-100 border border-[#e0d4d9] dark:border-gray-600 rounded-xl shadow-xl w-full h-[320px] flex items-center justify-center relative mx-auto backdrop-blur-sm">
              <div className="bg-white dark:bg-transparent dark:border-gray-600 dark:border-2 w-[95%] h-[240px] flex rounded-lg shadow-inner relative mx-auto">

                <div className="w-1/2 flex items-center justify-center p-2">
                  <img
                    src={certData[currentIndex].image}
                    alt={certData[currentIndex].title}
                    className="h-full w-full object-contain rounded"
                  />
                </div>

                <div className="w-1/2 flex flex-col justify-center p-2 text-left">
                  <h2 className="text-md font-bold text-[#A35C7A] dark:text-[#D9B7C2]">
                    {certData[currentIndex].title}
                  </h2>
                  <div className="text-sm font-semibold">
                    {certData[currentIndex].subtitle1}
                  </div>
                  <div className="text-sm">{certData[currentIndex].content1}</div>
                  <div className="text-sm font-semibold mt-2">
                    {certData[currentIndex].subtitle2}
                  </div>
                  <div className="text-sm">{certData[currentIndex].content2}</div>
                </div>

                <button
                  onClick={() => openModal(currentIndex)}
                  className="absolute bottom-2 right-2 px-4 py-1 rounded-full bg-white bg-opacity-30 backdrop-blur-md text-sm font-semibold text-[#A35C7A] dark:text-[#D9B7C2] border border-[#A35C7A] dark:border-[#D9B7C2] hover:bg-[#A35C7A] hover:text-white dark:hover:bg-[#D9B7C2] dark:hover:text-gray-900 transition"
                >
                  View
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex space-x-3 justify-center w-full z-50">
          {certData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full border-2 cursor-pointer border-[#A35C7A] dark:border-[#D9B7C2] focus:outline-none transition ${
                currentIndex === idx
                  ? "bg-[#A35C7A] dark:bg-[#D9B7C2]"
                  : "bg-transparent"
              }`}
              aria-label={`Go to certificate slide ${idx + 1}`}
              aria-current={currentIndex === idx}
            />
          ))}
        </div>

        <div className="mt-6 flex flex-row gap-6 justify-center">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-[#A35C7A] text-white dark:bg-[#D9B7C2] dark:text-gray-900"
            aria-label="Previous certificate"
          >
            <GrCaretPrevious size={24} />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-[#A35C7A] text-white dark:bg-[#D9B7C2] dark:text-gray-900"
            aria-label="Next certificate"
          >
            <GrCaretNext size={24} />
          </button>
        </div>
      </div>
      <CertModal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        images={certData.map((cert) => cert.image)}
        startIndex={selectedIndex}
      />
    </section>
  );
};

export default Certify;
