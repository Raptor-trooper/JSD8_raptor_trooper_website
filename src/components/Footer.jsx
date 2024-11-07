import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#4a4947] text-white py-10 font-maitree">
      <div className="container mx-auto text-center">
        <a 
          href="/about" 
          className="text-[24px] font-lato underline"
        >
          About us
        </a>
        <p className="mt-2 text-[24px] font-lato ">
          "Handy haven with love, bringing unique creations to your home."
        </p>
        <p className="mt-4 text-[24px] font-lato">
          JSD 8
        </p>
      </div>
      <div className="container mx-auto text-right mt-6 font-maitree">
        <p className="text-[16px] font-lato">
          © 2024 Handy Haven. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
