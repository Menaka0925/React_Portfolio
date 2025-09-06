import React, { useState, useEffect } from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaBriefcase, FaHourglassStart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import certImg1 from "../assets/pub_img/survey.jpg";
import certImg2 from "../assets/pub_img/journal.jpg";

// Work data
const workData = [
  {
    title: "Frontend Technologies Intern",
    company: "IBM",
    duration: "Mar – May 2025",
    stack: ["MERN Stack"],
    details: [
      "Hands-on training in React.js, Node.js, Express.js, and MongoDB.",
      "Exposure to Python and PHP for backend integration.",
    ],
  },
  {
    title: "Data Analytics Intern",
    company: "NullClass Edtech – Dharmapuri",
    duration: "Nov – Dec 2024",
    stack: ["Power BI"],
    details: [
      "Analyzed datasets and generated actionable insights using Power BI.",
      "Improved team reporting and visualization techniques.",
    ],
  },
  {
    title: "Web Development Intern",
    company: "CodeBind Technologies – Trichy",
    duration: "Jun 2023",
    stack: ["HTML", "CSS", "JavaScript"],
    details: [
      "Built responsive interfaces with HTML, CSS, and JavaScript.",
      "Enhanced UI/UX with interactive design elements.",
    ],
  },
];

const publications = [
  {
    title: "Cyberbullying Detection on Social Media using Machine Learning",
    journal:
      "International Journal of Research Publication and Reviews (IJRPR), Vol. 6, Issue 3, March 2025",
    imgSrc: certImg1,
    abstract: `Cyberbullying threatens user well-being as social media usage increases, yet manual and 
    keyword-based detection methods often miss evolving online language. This study proposes a machine 
    learning system using Random Forest, TF-IDF, and bag-of-words to automatically detect and block harmful 
    messages, adapt to new slang, and reduce false positives by distinguishing bullying from casual chats. 
    The approach enables effective, real-time prevention on social platforms.`,
    keywords: `Cyberbullying Detection; Machine Learning; Random Forest; Social Media; TF-IDF; Bag-of-Words; SVM; Natural Language Processing (NLP)`,
    pdfLink: "https://drive.google.com/file/d/1ra2UTmqid98fc7-hszMSMGsNlc01JQTN/view?usp=sharing", 
  },
  {
    title:
      "Cyberbullying Detection on Social Media using Machine Learning with React Chat Application Features",
    journal:
      "International Journal of Scientific Research in Computer Science, Engineering and Information Technology (IJSRCSEIT), Vol. 11, Issue 3, May 2025",
    imgSrc: certImg2,
    abstract: `Cyberbullying is a rising problem, especially among teens using social media, and manual moderation or keyword filters often miss its complexities. 
    This study introduces a real-time detection system using Random Forest with TF-IDF and Bag-of-Words for text analysis, integrated into a React chat app and Flask 
    backend. Messages from unknown users are automatically flagged, distinguishing cyberbullying from casual chat to reduce false positives and improve online safety.`,
    keywords: `Random Forest; TF-IDF; Bag-of-Words; Natural Language Processing`,
    pdfLink: "https://drive.google.com/file/d/1eWCNIiwtGbw5oHWjFkpl2vi8zlOxCJaL/view?usp=sharing",
  },
];

const slideVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
};

const Work = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const [selectedPub, setSelectedPub] = useState(null);

  useEffect(() => {
  if (selectedPub) {
    document.body.style.overflow = "hidden"; 
  } else {
    document.body.style.overflow = "auto"; 
  }
  return () => {
    document.body.style.overflow = "auto";
  };
}, [selectedPub]);

  return (
    <section
      id="experience"
      className="relative py-12 px-4 bg-[#e9d5a1] dark:bg-black text-black dark:text-white transition-colors duration-300"
    >
      <div className="flex justify-center mb-12">
        <div className="relative flex w-[360px] h-[64px] rounded-full p-1 
          bg-white/10 dark:bg-white/5 
          backdrop-blur-xl border border-white/20 shadow-lg">
          <motion.div
            className="absolute top-1 bottom-1 w-1/2 rounded-full 
              bg-gradient-to-r from-[#A35C7A]/70 to-[#C890A7]/70 
              backdrop-blur-lg border border-white/30 shadow-md"
            layout
            initial={false}
            animate={{
              x: activeTab === "experience" ? 0 : "100%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          />
          <button
            className={`relative z-10 flex-1 text-center text-lg md:text-xl font-bold transition-colors ${
              activeTab === "experience"
                ? "text-white drop-shadow-md"
                : "text-[#A35C7A] dark:text-[#C890A7]"
            }`}
            onClick={() => setActiveTab("experience")}
          >
            Track Record
          </button>
          <button
            className={`relative z-10 flex-1 text-center text-lg md:text-xl font-bold transition-colors ${
              activeTab === "publications"
                ? "text-white drop-shadow-md"
                : "text-[#A35C7A] dark:text-[#C890A7]"
            }`}
            onClick={() => setActiveTab("publications")}
          >
            Publications
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "experience" ? (
          <motion.div
            key="experience"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl mx-auto"
          >
            <VerticalTimeline>
              {workData.map((work, index) => (
                <VerticalTimelineElement
                  key={index}
                  date={work.duration}
                  dateClassName="text-[#A35C7A] dark:text-[#aaa] lg:dark:text-white/85"
                  iconStyle={{
                    background: "#A35C7A",
                    color: "#fff",
                    textAlign: "center",
                  }}
                  icon={<FaBriefcase />}
                  contentStyle={{
                    background: "#fef6e4",
                    color: "#333",
                  }}
                  contentArrowStyle={{ borderRight: "7px solid #fef6e4" }}
                >
                  <h3 className="text-lg font-semibold text-[#A35C7A] dark:text-[#A35C7A]">
                    {work.title}
                  </h3>
                  <h4 className="text-sm font-medium text-black dark:text-black">
                    {work.company}
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {work.stack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-[#A35C7A]/20 dark:bg-[#C890A7]/20 text-[#A35C7A] dark:text-[#C890A7] rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <ul className="list-disc pl-5 mt-3 text-sm text-black dark:text-black">
                    {work.details.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </VerticalTimelineElement>
              ))}
              <VerticalTimelineElement
                iconStyle={{
                  background: "#A35C7A",
                  color: "#fff",
                  textAlign: "center",
                }}
                icon={<FaHourglassStart />}
              />
            </VerticalTimeline>
          </motion.div>
        ) : (
          <motion.div
            key="publications"
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="max-w-4xl mx-auto px-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {publications.map((pub, idx) => (
                <motion.div
                  key={idx}
                  className="rounded-lg p-6 shadow-lg cursor-pointer hover:shadow-2xl transition"
                  style={{
                    background: "#fef6e4",
                    color: "#333",
                  }}
                  onClick={() => setSelectedPub(pub)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2 }}
                >
                  {pub.imgSrc && (
                    <img
                      src={pub.imgSrc}
                      alt={pub.title}
                      className="w-full h-48 object-contain rounded-md mb-4 mx-auto"
                    />
                  )}
                  <h3 className="text-xl font-semibold text-[#A35C7A] dark:text-[#A35C7A] mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-black dark:text-black">
                    {pub.journal}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedPub && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPub(null)} 
          >
            <motion.div
              className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-6xl w-full mx-4 h-[85vh] overflow-hidden flex flex-col"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPub(null)}
                className="absolute top-3 right-3 bg-[#A35C7A] text-white p-2 rounded-full shadow-md hover:bg-[#C890A7] transition block md:hidden"
              >
                ✕
              </button>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 overflow-y-auto">
                {/* Left Image */}
                <div className="flex items-center justify-center bg-black/5 dark:bg-white/5 p-4">
                  <img
                    src={selectedPub.imgSrc}
                    alt={selectedPub.title}
                    className="max-h-[70vh] w-full object-contain rounded"
                  />
                </div>

                {/* Right Content */}
                <div className="p-6 flex flex-col h-full">
                  <h2 className="text-2xl font-bold text-[#A35C7A] dark:text-[#C890A7] mb-4">
                    {selectedPub.title}
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                    {selectedPub.journal}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 md:mb-0 md:flex-1">
                    {selectedPub.abstract}
                  </p>

                  <div className="mt-4 md:mt-auto">
                    <p className="text-gray-800 dark:text-gray-200 text-sm font-semibold mb-1">
                      Keywords:
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                      {selectedPub.keywords}
                    </p>
                    <a
                      href={selectedPub.pdfLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 rounded-md bg-[#A35C7A] text-white hover:bg-[#C890A7] transition"
                    >
                      View Full Paper
                    </a>
                  </div>
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
