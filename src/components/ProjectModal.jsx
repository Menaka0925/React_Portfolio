import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';
import { RxExternalLink } from "react-icons/rx";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';
import '../modal-animations.css';

const ProjectModal = ({ isOpen, onRequestClose, data }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; 
      setTimeout(() => setShowContent(true), 10);
    } else {
      document.body.style.overflow = "auto"; 
      setShowContent(false);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!data) return null;
  const { title, description, url, technologies, images } = data;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-full max-w-[860px] mx-auto bg-transparent border-none outline-none"
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        className={`transition-all duration-500 transform ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        } 
        w-full bg-white dark:bg-black p-4 sm:p-8 rounded-md shadow-lg relative`}
      >

        <button
          onClick={onRequestClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 z-50"
        >
          <FaTimes size={22} />
        </button>

        <div className="bg-[#e9d5a1] dark:bg-[#d6b975] rounded-md px-2 pt-2 pb-2 mb-5 mx-auto w-full max-w-[620px] shadow-lg">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </div>

          <div className="w-full h-[220px] sm:h-[320px] md:h-[360px] rounded-md overflow-hidden bg-black/5">
            <AwesomeSlider
              bullets={false}
              animation="scaleOutAnimation"
              organicArrows={images.length > 1}
              className="w-full h-full"
            >
              {images.map((src, idx) => (
                <div key={idx} className="flex items-center justify-center w-full h-full bg-white dark:bg-black">
                  <img
                    src={src}
                    alt={`Slide ${idx}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ))}
            </AwesomeSlider>
          </div>
        </div>

        <h3 className="text-xl font-bold text-[#A35C7A] dark:text-[#C890A7]">
          {title}
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block ml-3 text-lg text-[#A35C7A] dark:text-[#C890A7] hover:underline"
            >
              <RxExternalLink className="translate-y-[-1px] inline-block" />
            </a>
          )}
        </h3>

        <p className="text-gray-800 dark:text-gray-300 mb-4 whitespace-pre-line">
          {description}
        </p>

        {technologies?.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-[#A35C7A] dark:text-[#C890A7] mb-2">
              Technologies Used
            </h4>
            <ul className="flex flex-wrap gap-3 justify-start mb-1">
              {technologies.map((tech, i) => (
                <li
                  key={i}
                  className="px-3 py-1 bg-[#A35C7A]/20 dark:bg-[#C890A7]/20 text-[#A35C7A] dark:text-[#C890A7] rounded-full text-sm"
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
