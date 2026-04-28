import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { RxExternalLink } from "react-icons/rx";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import '../modal-animations.css';

const ProjectModal = ({ isOpen, onRequestClose, data }) => {
  const [showContent, setShowContent] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; 
      setActiveIndex(0);
      setTimeout(() => setShowContent(true), 10);
    } else {
      document.body.style.overflow = "auto"; 
      setShowContent(false);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && data?.images) {
      data.images.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [isOpen, data]);

  if (!data) return null;
  const { title, description, url, technologies, images } = data;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-full max-w-[860px] mx-auto bg-transparent border-none outline-none"
      overlayClassName="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-center items-center z-[200]"
    >
      <div
        className={`transition-all duration-500 transform ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        } 
        w-full glass-card p-4 sm:p-8 rounded-3xl shadow-2xl relative glow-border`}
      >

        <button
          onClick={onRequestClose}
          className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-white/10 text-slate-400 hover:text-white transition-all z-50"
        >
          <FaTimes size={20} />
        </button>

        <div className="bg-slate-900/80 border border-white/5 rounded-2xl px-2 pt-2 pb-2 mb-6 mx-auto w-full max-w-[780px] shadow-lg">
          <div className="flex items-center gap-2 mb-3 px-1 pt-1">
            <span className="w-3 h-3 bg-[#ff5f56] rounded-full shadow-[0_0_8px_rgba(255,95,86,0.3)]" />
            <span className="w-3 h-3 bg-[#ffbd2e] rounded-full shadow-[0_0_8px_rgba(255,189,46,0.3)]" />
            <span className="w-3 h-3 bg-[#27c93f] rounded-full shadow-[0_0_8px_rgba(39,201,63,0.3)]" />
          </div>

          <div className="w-full h-[220px] sm:h-[320px] md:h-[360px] rounded-xl overflow-hidden bg-slate-950/50">
            <AwesomeSlider
              key={title}  
              bullets={false}
              organicArrows={images.length > 1}
              onTransitionEnd={({ currentIndex }) => setActiveIndex(currentIndex)}
              className="w-full h-full"
            >
              {images.map((src, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center w-full h-full bg-slate-900"
                >
                  <img
                    src={src}
                    alt={`Slide ${idx}`}
                    className="max-h-full max-w-full object-contain p-2"
                  />
                </div>
              ))}
            </AwesomeSlider>
          </div>

          {/* Dot Indicators */}
          {images.length > 1 && (
            <div className="flex justify-center gap-1.5 mt-3 mb-1">
              {images.map((_, i) => (
                <div 
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    activeIndex === i ? 'bg-sky-500 scale-110' : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <h3 className="text-2xl font-bold text-slate-100">
          {title}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block ml-3 text-sky-400 hover:text-sky-300 transition-colors"
            >
              <RxExternalLink className="translate-y-[-1px] inline-block" />
            </a>
          )}
        </h3>

        <p className={`text-slate-400 mt-2 mb-2 whitespace-pre-line font-medium leading-relaxed ${description.split('\n').length > 3 || description.length > 200 ? 'text-xs md:text-sm' : 'text-sm md:text-base'}`}>
          {description}
        </p>

        {technologies?.length > 0 && (
          <div className="mt-2 pt-3 border-t border-white/5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-sky-500 mb-2">
              Technologies Used
            </h4>
            <ul className="flex flex-wrap gap-2 justify-start mb-1">
              {technologies.map((tech, i) => (
                <li
                  key={i}
                  className="px-3 py-1 bg-sky-500/10 text-sky-400 rounded-full text-[10px] font-bold border border-sky-500/20"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ProjectModal;
