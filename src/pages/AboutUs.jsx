import React from 'react';

const AboutUs = () => {
  return (
    <div className="flex flex-col items-center h-screen bg-gray-100">
      {/* Title */}
      <h1 className="text-4xl font-bold my-20">About Us</h1>

      <div className="flex justify-around items-center w-full">
        {/* Profile 1 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden">
            <img src="/Images/ben.jpg" alt="Pattaragon" className="w-full h-full object-cover " />
          </div>
          <p className="mt-5 text-2xl">23_Pattaragon (Ben/เบน)</p>
        </div>

        {/* Profile 2 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden">
            <img src="/Images/mai.jpg" alt="Poramat" className="w-full h-full object-cover object-top" />
          </div>
          <p className="mt-5 text-2xl">26_Poramat (Mai/ไม้)</p>
        </div>

        {/* Profile 3 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden">
            <img src="/Images/tae.jpg" alt="Rattanakul" className="w-full h-full object-cover" />
          </div>
          <p className="mt-5 text-2xl">27_Rattanakul (Tae/เต้)</p>
        </div>

        {/* Profile 4 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto rounded-full overflow-hidden">
            <img src="/Images/tang.jpg" alt="Rawisut" className="w-full h-full object-cover object-top" />
          </div>
          <p className="mt-5 text-2xl">28_Rawisut (Tang Tang/ตั้งตัง)</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
