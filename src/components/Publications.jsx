import React, { useState, useEffect } from "react";
import { FaExternalLinkAlt, FaTimes, FaBookOpen, FaQuoteLeft } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import ResumeModal from "./ResumeModal";
import { trackEvent } from "../utils/analytics";
import certImg1 from "../assets/pub_img/survey.jpg";
import certImg2 from "../assets/pub_img/journal.jpg";

const publications = [
  {
    id: 1,
    title: "Cyberbullying Detection on Social Media using Machine Learning",
    journal: "International Journal of Research Publication and Reviews (IJRPR)",
    volume: "Vol. 6, Issue 3, March 2025",
    imgSrc: certImg1,
    abstract: "Cyberbullying threatens user well-being as social media usage increases, yet manual and keyword-based detection methods often miss evolving online language. This study proposes a machine learning system using Random Forest, TF-IDF, and bag-of-words to automatically detect and block harmful messages, adapt to new slang, and reduce false positives by distinguishing bullying from casual chats. The approach enables effective, real-time prevention on social platforms.",
    keywords: ["Cyberbullying Detection", "Machine Learning", "Random Forest", "Social Media", "TF-IDF", "Bag-of-Words", "SVM", "Natural Language Processing (NLP)"],
    pdfLink: "https://drive.google.com/file/d/1ra2UTmqid98fc7-hszMSMGsNlc01JQTN/view?usp=sharing",
    teaser: "ML-powered real-time detection of harmful social media interactions"
  },
  {
    id: 2,
    title: "Cyberbullying Detection on Social Media using Machine Learning with React Chat Application Features",
    journal: "International Journal of Scientific Research in Computer Science, Engineering and Information Technology (IJSRCSEIT)",
    volume: "Vol. 11, Issue 3, May 2025",
    imgSrc: certImg2,
    abstract: "Cyberbullying is a rising problem, especially among teens using social media, and manual moderation or keyword filters often miss its complexities. This study introduces a real-time detection system using Random Forest with TF-IDF and Bag-of-Words for text analysis, integrated into a React chat app and Flask backend. Messages from unknown users are automatically flagged, distinguishing cyberbullying from casual chat to reduce false positives and improve online safety.",
    keywords: ["Random Forest", "TF-IDF", "Bag-of-Words", "Natural Language Processing"],
    pdfLink: "https://drive.google.com/file/d/1eWCNIiwtGbw5oHWjFkpl2vi8zlOxCJaL/view?usp=sharing",
    teaser: "Real-time detection integrated into a React chat application"
  },
];

const Publications = () => {
  const [selectedPub, setSelectedPub] = useState(null);
  const [paperModal, setPaperModal] = useState({ isOpen: false, url: "", title: "" });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPub) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPub]);

  return (
    <section id="publications" className="pt-24 pb-24 px-6 bg-[#020617] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Research <span className="text-gradient">& Publications</span>
          </h2>
          <p className="text-slate-600 font-mono text-[9px] uppercase tracking-[0.5em]">Academic Contributions</p>
        </motion.div>

        {/* Publication Cards — No images, clean & intriguing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {publications.map((pub, idx) => (
            <motion.div
              key={pub.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="group cursor-pointer relative"
              onClick={() => setSelectedPub(pub)}
            >
              <div className="bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 hover:border-sky-500/30 transition-all duration-500 h-full flex flex-col relative overflow-hidden">

                {/* Paper Number & Title */}
                <div className="flex items-start gap-4 mb-5">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-base font-black">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-bold text-slate-200 group-hover:text-sky-400 transition-colors leading-snug tracking-tight">
                    {pub.title}
                  </h3>
                </div>

                {/* Journal */}
                <p className="text-[10px] text-slate-600 font-mono uppercase tracking-widest mb-4 leading-relaxed">
                  {pub.journal}
                </p>

                {/* Teaser */}
                <div className="mt-auto pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-4">
                    <FaQuoteLeft size={10} className="text-sky-500/50" />
                    <span className="italic">{pub.teaser}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sky-400 text-[10px] font-black uppercase tracking-widest group-hover:gap-3 transition-all">
                    View Details
                    <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-500/5 to-transparent rounded-bl-[3rem] pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detailed Publication Modal */}
      <AnimatePresence>
        {selectedPub && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 bg-black/30 backdrop-blur-sm"
            onClick={() => setSelectedPub(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="bg-slate-950/90 backdrop-blur-2xl border border-sky-500/10 max-w-6xl w-full max-h-[90vh] overflow-y-auto rounded-xl p-6 md:p-8 relative shadow-[0_0_100px_rgba(56,189,248,0.05)]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPub(null)}
                className="absolute top-6 right-6 text-slate-600 hover:text-white transition-colors z-10"
              >
                <FaTimes size={18} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 md:gap-12 items-center">
                
                {/* Left: Certificate Image */}
                <div className="lg:col-span-2 w-full">
                  <div className="bg-slate-900/50 overflow-hidden border border-white/5 shadow-2xl max-h-[70vh] flex items-center justify-center select-none">
                    <img 
                      src={selectedPub.imgSrc} 
                      alt={selectedPub.title} 
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                      className="w-full h-full object-contain" 
                    />
                  </div>
                </div>

                {/* Right: Content */}
                <div className="lg:col-span-3 flex flex-col justify-center">
                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-black text-white leading-tight tracking-tight mb-3">
                    {selectedPub.title}
                  </h2>

                  {/* Journal & Volume */}
                  <p className="text-sky-400/70 text-[11px] font-mono uppercase tracking-widest mb-1">{selectedPub.journal}</p>
                  <p className="text-slate-600 text-[10px] font-mono mb-8">{selectedPub.volume}</p>

                  {/* Abstract */}
                  <div className="mb-8">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 mb-3">Abstract</p>
                    <p className="text-slate-400 text-[13px] leading-[1.8] border-l-2 border-sky-500/30 pl-5">
                      {selectedPub.abstract}
                    </p>
                  </div>

                  {/* Keywords */}
                  <div className="mb-6">
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 mb-3">Keywords</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedPub.keywords.map((kw, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 text-slate-400 text-[10px] rounded-lg border border-white/5 font-mono">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Read Full Paper Button */}
                  <div className="mt-2 md:mt-2">
                    <button
                      onClick={() => {
                        setPaperModal({
                          isOpen: true,
                          url: selectedPub.pdfLink,
                          title: "Published Paper"
                        });
                        trackEvent("PAPER_VIEW", selectedPub.title);
                      }}
                      className="inline-flex items-center gap-2 px-6 py-2 bg-sky-500 text-slate-950 font-black rounded-lg hover:bg-white transition-all uppercase tracking-widest text-[10px] shadow-xl shadow-sky-500/20 cursor-pointer"
                    >
                      Read Full Paper <FaBookOpen size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeModal 
        isOpen={paperModal.isOpen}
        onRequestClose={() => setPaperModal({ ...paperModal, isOpen: false })}
        resumeUrl={paperModal.url}
        title={paperModal.title}
      />
    </section>
  );
};

export default Publications;
