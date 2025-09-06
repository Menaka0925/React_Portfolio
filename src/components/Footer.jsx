import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-[#e9d5a1] dark:bg-[#0f0f0f] text-black dark:text-white transition-colors duration-300 pt-3 pb-2 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center z-10 relative">
        <p className="text-sm">
          © {new Date().getFullYear()}{' '}
          <span className="font-semibold text-[#A35C7A] dark:text-[#C890A7]">Menaka Mohanraj </span>| All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
