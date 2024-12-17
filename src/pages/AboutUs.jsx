import Ben from "../images/aboutus/ben.jpg"
import Mai from "../images/aboutus/mai.jpg"
import Tae from "../images/aboutus/tae.jpg"
import Tang from "../images/aboutus/tang.jpg"


const AboutUs = () => {
  return (
    <div className="flex flex-col items-center py-20 bg-gray-100">
      {/* Title */}
      <h1 className="mb-10 text-4xl font-bold">About Us</h1>

      <div className="flex flex-col flex-wrap items-center justify-center w-full gap-10 md:flex-row">
        {/* Profile 1 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto overflow-hidden border-4 border-gray-300 rounded-full">
            <img src={Ben} alt="Pattaragon" className="object-cover w-full h-full" />
          </div>
          <p className="mt-5 text-2xl">23 Pattaragon (Ben/เบน)</p>
        </div>

        {/* Profile 2 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto overflow-hidden border-4 border-gray-300 rounded-full">
            <img src={Mai} alt="Poramat" className="object-cover object-top w-full h-full" />
          </div>
          <p className="mt-5 text-2xl">26 Poramat (Mai/ไม้)</p>
        </div>

        {/* Profile 3 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto overflow-hidden border-4 border-gray-300 rounded-full">
            <img src={Tae} alt="Rattanakul" className="object-cover w-full h-full" />
          </div>
          <p className="mt-5 text-2xl">27 Rattanakul (Tae/เต้)</p>
        </div>

        {/* Profile 4 */}
        <div className="text-center">
          <div className="w-48 h-48 mx-auto overflow-hidden border-4 border-gray-300 rounded-full">
            <img src={Tang} alt="Rawisut" className="object-cover object-top w-full h-full" />
          </div>
          <p className="mt-5 text-2xl">28 Rawisut (Tang Tang/ตั้งตัง)</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
