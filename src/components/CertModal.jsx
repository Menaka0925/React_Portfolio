import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import 'react-awesome-slider/dist/custom-animations/scale-out-animation.css';
import '../modal-animations.css';

Modal.setAppElement('#root');

const CertModal = ({ isOpen, onRequestClose, images, startIndex }) => {
  const [showContent, setShowContent] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(startIndex || 0);

  // Prevent body scroll + reset modal state
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; 
      setTimeout(() => setShowContent(true), 10);
      setCurrentIndex(startIndex || 0);
    } else {
      document.body.style.overflow = "auto";
      setShowContent(false);
    }
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [isOpen, startIndex]);

  // 🔹 Preload all images for smoother next/prev navigation
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const sliderProps = {
    animation: 'scaleOutAnimation',
    bullets: false,
    selected: currentIndex,
    organicArrows: images.length > 1,
    media: images.map((src) => ({
      source: src,
      style: {
        objectFit: 'contain',
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        display: 'block',
        backgroundColor: 'transparent',
      },
    })),
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-full max-w-[950px] mx-auto bg-transparent border-none outline-none"
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <div
        className={`transition-all duration-500 transform ${
          showContent ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'
        } w-full my-auto max-h-[95vh] overflow-hidden 
          bg-white dark:bg-[#1e1e1e] rounded-md shadow-lg relative`}
      >

        <div className="bg-gray-200 dark:bg-gray-700 px-3 py-2 flex items-center justify-between rounded-t-md">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full" />
            <span className="w-3 h-3 bg-yellow-400 rounded-full" />
            <span className="w-3 h-3 bg-green-500 rounded-full" />
          </div>
          <button
            onClick={onRequestClose}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Desktop slider */}
        <div className="hidden sm:flex w-full h-[70vh] sm:h-[80vh] mx-auto rounded-b-md items-center justify-center">
          <AwesomeSlider
            {...sliderProps}
            className="w-full h-full cert-slider"
            cssModule={[]}
          />
        </div>

        {/* Mobile view with manual navigation */}
        <div className="sm:hidden w-full flex flex-col">
          <div className="flex-1 min-h-0 flex items-stretch justify-center" style={{ height: '60vh' }}>
            <img
              src={images[currentIndex]}
              alt="certificate"
              className="w-full h-full object-contain"
              style={{ margin: 0, border: 0, padding: 0 }}
            />
          </div>
          {images.length > 1 && (
            <div className="flex justify-center items-center gap-7 py-2">
              <button
                onClick={prevSlide}
                className="px-3 py-2 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 flex items-center justify-center"
              >
                <FaChevronLeft size={22} />
              </button>
              <button
                onClick={nextSlide}
                className="px-3 py-2 rounded-full bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 flex items-center justify-center"
              >
                <FaChevronRight size={22} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CertModal;
