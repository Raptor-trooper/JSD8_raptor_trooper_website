import React from 'react';

const Home = () => {
  return (
    <div className='w-full'>
      {/* ส่วนลดสูงสุด 50% */}
      <div className='flex justify-center'>
        <div className='flex flex-col md:flex-row items-center p-[84px] max-w-[1440px]'>
          <div className='md:mr-8 mb-8 md:mb-0'>
            <h1 className='text-5xl md:text-7xl font-bold'>Up to 50% Off</h1>
            <h1 className='text-5xl md:text-7xl font-bold'>Sitewide</h1>
            <p className='text-lg md:text-xl py-8'>Start Your Holiday Decor & Gifting Now</p>
            <button className='px-12 py-3 bg-black text-white'>Shop now</button>
          </div>
          <div>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt=""
              className='object-cover h-[463px] w-full md:w-[624px]' />
          </div>
        </div>
      </div>

      {/* ส่วนหัวข้อและรูปภาพ */}
      <div className="max-w-screen-xl mx-auto p-4">
        {/* ส่วนหัวข้อ */}
        <h1 className="text-[96px] font-bold mb-8">Category</h1>

        {/* กล่องรูปใหญ่และรูปเล็ก ๆ ในบรรทัดเดียวกัน */}
        <div className="flex gap-8">
          {/* รูปภาพใหญ่ */}
          <div className="w-[624px] h-[620px] bg-gray-300 rounded-lg shadow-md">
            <img
              src="https://via.placeholder.com/624x620"
              alt="Large"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          

          {/* รูปภาพเล็กเลื่อนซ้ายขวา */}
          <div className="sticky flex-1 overflow-x-auto">
          <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Title</h2>
          <p className="text-gray-600">
            Body text for whatever you'd like to say. Add main takeaway points, quotes,
            anecdotes, or even a very very short story.
          </p>
          </div>


            <div className="flex space-x-4">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className="w-[408px] h-[408px] bg-gray-300 rounded-lg shadow-md flex-shrink-0"
                >
                  <img
                    src="https://via.placeholder.com/408x408"
                    alt={`Small ${index + 1}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
