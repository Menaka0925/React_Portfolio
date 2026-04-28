import React, { useState, useEffect, useRef } from "react";
import { MdMessage, MdClose, MdSubdirectoryArrowLeft } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxfWxwgbCY7LvA4kww9PP_aepXDWRSTpt6Q8c4ezu5Scb2Z1JN5LBH1uwvqlYLT0ZSHbw/exec";

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [history, setHistory] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendStage, setSendStage] = useState(0);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const formRef = useRef();
  const inputRef = useRef();
  const scrollRef = useRef();

  const steps = [
    { key: "name", label: "Enter your name", placeholder: "Your Name", type: "text" },
    { key: "email", label: "Enter your email", placeholder: "your@email.com", type: "email" },
    { key: "subject", label: "Inquiry Subject", type: "select", options: ["Job Opportunity", "Project Collaboration", "General Networking", "Just Saying Hi!"] },
    { key: "message", label: "Your message", placeholder: "Type here...", type: "textarea" }
  ];

  // Auto-focus and Auto-scroll
  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [open, step, history]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && formRef.current && !formRef.current.contains(e.target)) {
        if (!isSending) setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, isSending]);

  const handleNext = (e) => {
    if (e) e.preventDefault();
    const currentKey = steps[step].key;
    const value = formData[currentKey].trim();

    if (!value) return;

    // Email Validation
    if (currentKey === "email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(value)) {
        setHistory([...history, {
          label: steps[step].label,
          value: value + " [ERROR: INVALID_EMAIL_FORMAT]"
        }]);
        setFormData({ ...formData, email: "" });
        return;
      }
    }

    // Add to history
    setHistory([...history, { label: steps[step].label, value }]);

    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      submitForm();
    }
  };

  const submitForm = async () => {
    setIsSending(true);
    setSendStage(0);
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(formData)
      });

      // Sequence: Transmitting (0s) -> Please Wait (0.8s) -> Success (1.8s)
      setTimeout(() => setSendStage(1), 800);
      
      setTimeout(() => {
        setIsSending(false);
        setSent(true);
      }, 1800);

    } catch (error) {
      setIsSending(false);
      console.error("API Error:", error);
      alert("Oops! Something went wrong with the transmission.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [steps[step].key]: e.target.value });
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {!open ? (
          <motion.button
            layoutId="terminal-container"
            onClick={() => { setOpen(true); setStep(0); setHistory([]); setSent(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center bg-[#0d1117] border border-[#30363d] text-sky-400 text-2xl sm:text-3xl shadow-2xl hover:scale-105 transition-all duration-300"
          >
            <MdMessage />
          </motion.button>
        ) : (
          <motion.div
            layoutId="terminal-container"
            ref={formRef}
            className="relative bg-[#0d1117] w-[calc(100vw-2rem)] sm:w-[550px] rounded-xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border border-[#30363d] overflow-hidden flex flex-col"
          >
            {/* Terminal Header */}
            <div className="bg-[#161b22] px-4 py-3 border-b border-[#30363d] flex justify-between items-center shrink-0">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Let's Connect</span>
              <button onClick={() => !isSending && setOpen(false)} className="text-slate-500 hover:text-white transition-colors"><MdClose size={18} /></button>
            </div>

            {/* Terminal Body */}
            <div
              ref={scrollRef}
              className="p-6 font-mono text-sm max-h-[450px] overflow-y-auto custom-scrollbar"
            >
              <div className="mb-4">
                <p className="text-slate-600 text-[10px] uppercase tracking-widest mb-4">
                  [ System: Fill the prompts and press ENTER or ⏎ to advance ]
                </p>
              </div>

              {/* History Items */}
              {history.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx}
                  className="mb-4"
                >
                  <div className="flex gap-2 mb-1">
                    <span className="text-sky-500">guest@menaka:~$</span>
                    <span className="text-slate-400">{item.label}</span>
                  </div>
                  <div className="flex gap-2 text-green-500 pl-4">
                    <span>{">"}</span>
                    <span>{item.value}</span>
                  </div>
                </motion.div>
              ))}

              {/* Current Prompt or Status */}
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-6 border-t border-white/10 mt-4"
                  >
                    <p className="text-green-400 mb-2 font-bold tracking-tighter">✔ SUCCESS: MESSAGE_RECEIVED</p>
                    <p className="text-slate-500 text-xs mb-6">Transmission completed. Standby for response.</p>
                    <button
                      onClick={() => setOpen(false)}
                      className="bg-white/5 border border-white/10 text-white px-6 py-2 rounded text-xs hover:bg-white/10 transition-all uppercase tracking-widest"
                    >
                      Exit Terminal
                    </button>
                    <Confetti numberOfPieces={40} recycle={false} width={500} height={400} gravity={0.2} className="absolute inset-0 pointer-events-none" />
                  </motion.div>
                ) : isSending ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-4 flex flex-col gap-1">
                    <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-sky-500 animate-pulse">[ system: transmitting message... ]</motion.p>
                    {sendStage >= 1 && (
                      <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-slate-600 text-[10px] uppercase tracking-widest">[ system: please wait... ]</motion.p>
                    )}
                  </motion.div>
                ) : step < steps.length && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-10"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2">
                        <span className="text-sky-500">guest@menaka:~$</span>
                        <span className="text-white">{steps[step].label} <span className="animate-pulse">_</span></span>
                      </div>

                      <div className="flex items-start gap-2 pl-4">
                        <span className="text-green-500 font-bold">{">"}</span>

                        {steps[step].type === "select" ? (
                          <div className="relative flex-1">
                            <select
                              value={formData.subject}
                              onChange={handleChange}
                              onKeyDown={(e) => e.key === "Enter" && handleNext(e)}
                              className="w-full bg-transparent border-none text-green-400 focus:ring-0 outline-none p-0 appearance-none cursor-pointer"
                            >
                              <option value="" disabled className="bg-[#0d1117]">-- choose_option --</option>
                              {steps[step].options.map(opt => <option key={opt} value={opt} className="bg-[#0d1117]">{opt}</option>)}
                            </select>
                          </div>
                        ) : steps[step].type === "textarea" ? (
                          <textarea
                            ref={inputRef}
                            value={formData[steps[step].key]}
                            onChange={handleChange}
                            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleNext(e)}
                            placeholder={steps[step].placeholder}
                            rows={3}
                            className="w-full bg-transparent border-none text-green-400 focus:ring-0 outline-none p-0 placeholder:text-slate-800 resize-none"
                          />
                        ) : (
                          <input
                            ref={inputRef}
                            type={steps[step].type}
                            value={formData[steps[step].key]}
                            onChange={handleChange}
                            onKeyDown={(e) => e.key === "Enter" && handleNext(e)}
                            placeholder={steps[step].placeholder}
                            className="w-full bg-transparent border-none text-green-400 focus:ring-0 outline-none p-0 placeholder:text-slate-800"
                          />
                        )}

                        <button
                          onClick={handleNext}
                          disabled={!formData[steps[step].key] || isSending}
                          className={`shrink-0 transition-all ${formData[steps[step].key] ? "text-green-400 scale-125" : "text-slate-800"}`}
                        >
                          {isSending ? (
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full" />
                          ) : (
                            <MdSubdirectoryArrowLeft size={20} />
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Status Bar */}
            {!sent && (
              <div className="bg-[#161b22] px-4 py-1 border-t border-[#30363d] flex justify-between items-center text-[9px] font-mono text-slate-600 shrink-0">
                <span>{step === steps.length - 1 ? "FINAL LINE" : `LINE: ${step + 1}`}</span>
                <span className="animate-pulse">● LIVE_SESSION</span>
                <span>UTF-8</span>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;
