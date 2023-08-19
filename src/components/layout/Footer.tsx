import React from 'react';

const Footer = () => {
  return (
    <footer className="dark:bg-[#1e1e2d] dark:text-gray-500 py-5 px-7 flex items-center justify-between">
      <div className="flex gap-2 text-sm dark:text-gray-200">
        <span className="dark:text-gray-500">2023@</span>
        Keenthemes
      </div>

      <div className="dark:text-gray-500 flex gap-2 text-sm">
        <span className="">About</span>
        <span className="">Support</span>
        <span className="">Purchase</span>
      </div>
    </footer>
  );
};

export default Footer;
