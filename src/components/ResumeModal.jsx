import React from 'react';
import Modal from 'react-modal';
import { FaTimes, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '../utils/analytics';

const ResumeModal = ({ isOpen, onRequestClose, resumeUrl, title = "Resume" }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  // Convert standard Google Drive link to preview link if necessary
  const getPreviewUrl = (url) => {
    if (url.includes('drive.google.com')) {
      if (url.includes('/view')) {
        return url.replace('/view', '/preview');
      }
      if (!url.includes('/preview') && url.includes('/d/')) {
        const fileId = url.match(/\/d\/(.+?)\//)?.[1] || url.match(/\/d\/(.+)$/)?.[1];
        if (fileId) return `https://drive.google.com/file/d/${fileId.split('?')[0]}/preview`;
      }
    }
    return url;
  };

  // Convert standard Google Drive link to download link
  const getDownloadUrl = (url) => {
    if (url.includes('drive.google.com')) {
      const fileId = url.match(/\/d\/(.+?)\//)?.[1] || url.match(/\/d\/(.+)$/)?.[1];
      if (fileId) return `https://drive.google.com/uc?export=download&id=${fileId.split('?')[0]}`;
    }
    return url;
  };

  const previewUrl = getPreviewUrl(resumeUrl);
  const downloadUrl = getDownloadUrl(resumeUrl);

  // Reset loading state and prevent background scroll
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setIsLoading(true);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, resumeUrl]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="w-full max-w-5xl mx-auto bg-transparent border-none outline-none p-4"
      overlayClassName="fixed inset-0 bg-slate-950/90 backdrop-blur-md flex justify-center items-center z-[300]"
      closeTimeoutMS={300}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full h-[90vh] bg-slate-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl relative"
      >
        {/* Header */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900/50 backdrop-blur-sm z-10">
          <div className="flex items-center gap-3">
            <h3 className="text-white font-bold tracking-tight">{title}</h3>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <a 
              href={downloadUrl} 
              onClick={() => trackEvent("RESUME_DOWNLOAD", title)}
              className="p-2 text-slate-400 hover:text-sky-400 transition-colors"
              title="Download"
            >
              <FaDownload size={18} />
            </a>
            <a 
              href={resumeUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-400 hover:text-sky-400 transition-colors"
              title="Open Original"
            >
              <FaExternalLinkAlt size={16} />
            </a>
            <button
              onClick={onRequestClose}
              className="p-2 text-slate-400 hover:text-white transition-colors border-l border-white/10 pl-4 ml-2"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>

        {/* Content - PDF Iframe */}
        <div className="flex-1 bg-white relative overflow-hidden">
          {/* Full Page Horizontal Wave Loading State */}
          {isLoading && (
            <div className="absolute inset-0 bg-slate-950 z-20 p-12 overflow-hidden">
              <div className="w-full h-full flex flex-col gap-6 max-w-4xl mx-auto">
                {[...Array(15)].map((_, rowIndex) => {
                  // Create a varied width pattern
                  const widths = ["w-full", "w-[92%]", "w-[85%]", "w-[95%]", "w-[70%]", "w-[88%]", "w-[60%]"];
                  const widthClass = widths[rowIndex % widths.length];
                  
                  return (
                    <motion.div
                      key={rowIndex}
                      initial={{ opacity: 0.1 }}
                      animate={{ opacity: [0.1, 0.35, 0.1] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        delay: rowIndex * 0.12,
                        ease: "easeInOut"
                      }}
                      className={`h-3 bg-slate-800 rounded-full ${widthClass} relative overflow-hidden`}
                    >
                      {/* Subtle shimmer moving across each bar */}
                      <motion.div 
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          delay: rowIndex * 0.12 
                        }}
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                      />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          <iframe
            src={previewUrl}
            className={`w-full h-full border-none transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
            title="Resume Preview"
            allow="autoplay"
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
      </motion.div>
    </Modal>
  );
};

export default ResumeModal;
