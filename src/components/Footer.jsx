import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-5 ">
      <div className="container mx-auto text-center">
        <Link to='/aboutus' className="text-lg underline">About us</Link>
        <p className="mt-2 mb-3 text-lg  ">
          "Handy haven with love, bringing unique creations to your home. "
        </p>
      </div>
      <div className="container  mx-auto text-right ">
        <p className="text-sm mr-3 ">
          © 2024 Handy Haven. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
