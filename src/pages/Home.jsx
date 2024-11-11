import { useState } from 'react';
import { Link } from 'react-router-dom';

const items = [
  {
    id: 1,
    name: "room1",
    description: "From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300"
  },
  {
    id: 2,
    name: "room2",
    description: "From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300"
  },
  {
    id: 3,
    name: "room3",
    description: "From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300"
  },
  {
    id: 4,
    name: "room4",
    description: "From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300"
  }
]

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(items[0]);

  const handleSelected = (id) => {
    setSelectedItem(items.find((item) => item.id === id));
  }

  return (
    <div className='flex flex-col items-center'>
      {/* ส่วนลดสูงสุด 50% */}
      <div className='flex justify-center'>
        <div className='flex flex-col md:flex-row items-center p-[84px] max-w-[1440px]'>
          <div className='mb-8 md:mr-8 md:mb-0'>
            <h1 className='text-5xl font-bold md:text-7xl'>Up to 50% Off</h1>
            <h1 className='text-5xl font-bold md:text-7xl'>Sitewide</h1>
            <p className='py-8 text-lg md:text-xl'>Start Your Holiday Decor & Gifting Now</p>
            <Link to='/homeallproducts' className='px-12 py-3 text-white bg-black'>Shop now</Link>
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
      <div className="max-w-[1440px] p-[84px]">
        {/* ส่วนหัวข้อ */}
        <h1 className="text-[96px] font-bold mb-8">Category</h1>

        <div className='flex gap-4 overflow-hidden justify-stretch'>
          <div className='w-[600px] h-[600px]'>
            <img src="https://via.placeholder.com/624x620" alt="img-container" />
          </div>
          <div className='relative flex flex-col'>
            <div>
              <h2>Title</h2>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='absolute flex gap-4 transform -translate-y-1/2 top-1/2'>
              <img className='w-[400px] h-[400px]' src="https://via.placeholder.com/624x620" alt="img-container" />
              <img className='w-[400px] h-[400px]' src="https://via.placeholder.com/624x620" alt="img-container" />
            </div>
          </div>
        </div>
      </div>

      {/* ส่วน learn more */}
      <div className='relative h-[400px] w-full'>
        <div className='flex justify-between w-full h-full'>
          <img className='object-cover w-1/4 md:w-fit' src="https://via.placeholder.com/192x400" alt="side-img" />
          <img className='object-cover w-1/4 md:w-fit' src="https://via.placeholder.com/192x400" alt="side-img" />
        </div>
        <div className='absolute flex flex-col items-center justify-center gap-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'>
          <h2 className='text-lg text-center'>Inspiring self-expression by celebrating creativity</h2>
          <button className='px-12 py-3 text-white bg-black'>Learn more</button>
        </div>
      </div>

      {/* ส่วนเลือกสินค้า/รูป ตามปุ่ม */}
      <div className='px-[16px] py-[48px] flex flex-col items-center gap-4 max-w-[1280px] md:px-0'>
        <h1 className='text-[96px] text-center w-full font-bold md:text-left md:text-7xl'>Shop by room</h1>
        {/* mobile */}
        <div className='flex w-full py-4 space-x-4 md:hidden carousel'>
          {/* card */}
          {items.map((item) => (
            <div key={item.id} className='carousel-item h-[460px] w-[300px] text-center justify-between flex flex-col'>
            <img src={item.img} alt="img-container" />
            <p className='text-lg'>{item.name}</p>
            <button className='px-12 py-3 text-white bg-black'>Explore more</button>
          </div>
          ))}

        </div>

        {/* desktop */}
        <div className='flex justify-between w-[1280px] max-md:hidden'>
          <div className='flex flex-col gap-6'>
            <div className='flex'>
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleSelected(item.id)}
                  className={`px-6 py-2 bg-white border border-black ${index === 0 && 'rounded-s-full'} ${ index === items.length - 1 && 'rounded-e-full'}`}
                >
                  {item.name}
                </button>
              ))}

            </div>
            <img src="https://via.placeholder.com/756x430" alt="img-container" />
          </div>
          <div key={selectedItem.id} className='h-[460px] w-[400px]'>
            <div className='w-[300px] justify-between flex flex-col'>
              <img className='h-[300px] w-[300px]' src={selectedItem.img} alt="selected-img" />
              <p className='text-lg'>{selectedItem.description}</p>
              <button className='px-12 py-3 text-white bg-black'>Explore more</button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Home;
