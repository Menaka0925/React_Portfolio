import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="py-4 px-6 bg-[#050505] border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-y-6">
        
        {/* Copyright  */}
        <div className="w-full md:w-1/3 flex justify-center order-1 md:order-2">
          <p className="text-slate-500 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] text-center">
            © 2026 <span className="text-slate-300 font-bold">Menaka Mohanraj</span>
          </p>
        </div>

        {/* Social Icons */}
        <div className="w-1/2 md:w-1/3 flex justify-start order-2 md:order-1">
          <div className="flex items-center gap-1">
            {[
              { icon: <FaGithub />, href: "https://github.com/Menaka0411", label: "GitHub", hover: "hover:text-white" },
              { icon: <FaLinkedin />, href: "https://www.linkedin.com/in/menakamohanraj", label: "LinkedIn", hover: "hover:text-[#38bdf8]" },
              { icon: <MdEmail />, href: "https://mail.google.com/mail/?extsrc=mailto&url=mailto:menakamohanraj2003@gmail.com", label: "Email", hover: "hover:text-[#ea4335]" }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.href} 
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 text-slate-500 ${social.hover} transition-all duration-300 hover:scale-110 relative group`}
                title={social.label}
              >
                <div className="text-lg">{social.icon}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Location  */}
        <div className="w-1/2 md:w-1/3 flex justify-end order-3 md:order-3">
          <div className="flex items-center gap-2 group cursor-default">
            <div className="text-lg text-sky-500/80 group-hover:text-sky-400 transition-colors">
              <MdLocationOn />
            </div>
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest text-right">Ariyalur, TN</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
