import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#4a4947] text-white py-10">
      <div className="container mx-auto text-center">
        <a
          href="/about"
          className="text-[24px] underline"
        >
          About us
        </a>
        <p className="mt-2 text-[24px]  ">
          "Handy haven with love, bringing unique creations to your home."
        </p>
        <p className="mt-4 text-[24px]">
          JSD 8
        </p>
      </div>
      <div className="container mx-auto text-right ">
        <p className="text-[16px]">
          © 2024 Handy Haven. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
