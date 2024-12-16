import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center bg-gray-100 py-20">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-10">About Us</h1>

      <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-10 w-full">
        {/* Profile 1 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
            <img src="/Images/ben.jpg" alt="Pattaragon" className="w-full h-full object-cover" />
          </div>
          <p className="mt-5 text-2xl">23 Pattaragon (Ben/เบน)</p>
        </div>

        {/* Profile 2 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
            <img src="/Images/mai.jpg" alt="Poramat" className="w-full h-full object-cover object-top" />
          </div>
          <p className="mt-5 text-2xl">26 Poramat (Mai/ไม้)</p>
        </div>

        {/* Profile 3 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
            <img src="/Images/tae.jpg" alt="Rattanakul" className="w-full h-full object-cover" />
          </div>
          <p className="mt-5 text-2xl">27 Rattanakul (Tae/เต้)</p>
        </div>

        {/* Profile 4 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-gray-300">
            <img src="/Images/tang.jpg" alt="Rawisut" className="w-full h-full object-cover object-top" />
          </div>
          <p className="mt-5 text-2xl">28 Rawisut (Tang Tang/ตั้งตัง)</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
