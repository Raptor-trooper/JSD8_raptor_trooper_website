import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-5 text-white bg-black ">
      <div className="container mx-auto text-center">
        <Link to='/aboutus' className="text-lg underline">About us</Link>
        <p className="mt-2 mb-3 text-lg ">
          &quot;Handy haven with love, bringing unique creations to your home. &quot;
        </p>
      </div>
      <div className="container mx-auto text-right ">
        <p className="mr-3 text-sm ">
          © 2024 Handy Haven. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
