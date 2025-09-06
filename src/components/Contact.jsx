import React, { useState, useEffect, useRef } from "react";
import { MdMessage, MdClose } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import emailjs from "@emailjs/browser";

const PaperPlaneSvg = (props) => (
  <svg
    {...props}
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const Contact = () => {
  const [open, setOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (open && formRef.current && !formRef.current.contains(e.target)) {
        if (!isSending) setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, isSending]);

  useEffect(() => {
    let timer;
    if (sent) {
      timer = setTimeout(() => {
        setSent(false);
        setOpen(false);
      }, 4000);
    }
    return () => clearTimeout(timer);
  }, [sent]);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSending) return;

  setIsSending(true);

  try {
    await emailjs.sendForm(
      "service_34s1kdn",      
      "template_iuq2cca",      
      e.target,             
      "vEmdZ-MnTINKV4IPf"   
    );

    setTimeout(() => {
      setIsSending(false);
      setSent(true);
      e.target.reset();
    }, 1800);

  } catch (error) {
    setIsSending(false);
    console.error("EmailJS Error:", error);
    alert("Oops! Something went wrong. Please try again.");
  }
};

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!open ? (
        <button
          onClick={() => setOpen(true)}
          className="w-14 h-14 rounded-full flex items-center justify-center bg-[#A35C7A] hover:bg-[#C890A7] text-white text-3xl shadow-xl transition-all"
          aria-label="Open Message Form"
        >
          <MdMessage />
        </button>
      ) : (
        <div
          ref={formRef}
          className="relative bg-white/95 dark:bg-gray-900/95 text-black dark:text-white
            w-[90vw] sm:w-[420px] md:w-[520px] p-6 rounded-2xl shadow-2xl
            backdrop-blur-md border border-gray-200 dark:border-gray-700"
        >

          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold text-xl">📬 Let’s Connect</h1>
            <button
              onClick={() => !isSending && setOpen(false)}
              className={`text-gray-500 hover:text-red-500  dark:hover:text-red-500 transition ${
                isSending ? "pointer-events-none opacity-50" : ""
              }`}
              disabled={isSending}
            >
              <MdClose size={22} />
            </button>
          </div>

          {sent ? (
            <div className="relative h-60 flex flex-col justify-center items-center text-3xl font-semibold text-[#A35C7A] dark:text-[#C890A7]">
              🎉 Message Sent 🎉
              <Confetti
                numberOfPieces={220}
                recycle={false}
                gravity={0.25} 
                colors={[
                  "#A35C7A", "#C890A7", "#6B4B52", "#F2D1C9", 
                  "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#9D4EDD"
                ]}
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4"
            >
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                disabled={isSending}
                className="w-full px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 
                  bg-white dark:bg-gray-800 
                  focus:border-[#A35C7A] focus:ring-2 focus:ring-[#A35C7A] outline-none"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                disabled={isSending}
                className="w-full px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 
                  bg-white dark:bg-gray-800 
                  focus:border-[#A35C7A] focus:ring-2 focus:ring-[#A35C7A] outline-none"
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                disabled={isSending}
                className="w-full px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 
                  bg-white dark:bg-gray-800 
                  focus:border-[#A35C7A] focus:ring-2 focus:ring-[#A35C7A] outline-none"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                required
                disabled={isSending}
                className="w-full px-4 py-2 rounded-md border border-gray-400 dark:border-gray-600 
                  bg-white dark:bg-gray-800 
                  focus:border-[#A35C7A] focus:ring-2 focus:ring-[#A35C7A] outline-none resize-none"
              ></textarea>

              <motion.button
                type="submit"
                disabled={isSending}
                initial={{ width: "100%" }}
                animate={
                  isSending
                    ? {
                        width: 48,
                        borderRadius: 24,
                        background:
                          "linear-gradient(90deg, #A35C7A, #C890A7)",
                        transition: { duration: 0.8 },
                      }
                    : {
                        width: "100%",
                        borderRadius: 8,
                        background:
                          "linear-gradient(90deg, #A35C7A, #C890A7)",
                        transition: { duration: 0.8 },
                      }
                }
                className="relative flex justify-center items-center text-white py-2 font-medium cursor-pointer overflow-hidden"
              >

                {!isSending ? (
                  "Send Message"
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 1,
                    }}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <PaperPlaneSvg width={28} height={28} />
                  </motion.div>
                )}
              </motion.button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default Contact;
