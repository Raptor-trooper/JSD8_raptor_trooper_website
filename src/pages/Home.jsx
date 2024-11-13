import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataCategory } from '../Context/CategoryProvider';

/* Mockup data */
const items = [
  {
    id: 1,
    name: "room1",
    description: "11111From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300"
  },
  {
    id: 2,
    name: "room2",
    description: "222222From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300"
  },
  {
    id: 3,
    name: "room3",
    description: "333333From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300"
  },
  {
    id: 4,
    name: "room4",
    description: "4444444From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300"
  }
]

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = useContext(DataCategory);

  const handleSelected = (id) => {
    setSelectedItem(items.find((item) => item.id === id));
  }

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? data.length - 1 : prevIndex - 1);
  }

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === data.length - 1 ? 0 : prevIndex + 1);
  }

  const getWrappedIndex = (index) => {
    return ((index % data.length) + data.length) % data.length;
  };

  return (
    <div className='flex flex-col items-center text-black bg-[#FAF7F0]'>
      {/* ส่วนลดสูงสุด 50% */}
      <div className='flex justify-center w-full h-screen'>
        <div className='flex flex-col md:flex-row items-center p-[84px] mx-auto max-w-[1440px]'>
          <div className='mb-8 md:mr-8 md:mb-0'>
            <h1 className='text-5xl font-bold md:text-7xl'>Up to 50% Off</h1>
            <h1 className='text-5xl font-bold md:text-7xl'>Sitewide</h1>
            <p className='py-8 text-lg md:text-xl'>Start Your Holiday Decor & Gifting Now</p>
            <Link
              to='/homeallproducts'
              className='px-12 py-3 text-white bg-black'
            >
              Shop now
            </Link>
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
      <div className='flex justify-center w-full overflow-hidden'>

        <div className="flex flex-col p-[84px] max-w-[1280px]">
          {/* ส่วนหัวข้อ */}
          <h1 className="text-[96px] font-bold mb-8">Category</h1>

          <div className='relative flex flex-row items-center gap-12 mx-auto'>

            {/* รูปแรก */}
            <div className='relative w-[700px] h-[700px] flex-none'>
              <img
                className="object-cover w-full h-full rounded-lg"
                src={data[currentIndex]?.image}
                alt= ""
              />
              <div className="w-[300px] h-[50px] bg-opacity-60 bg-white absolute bottom-0 flex items-center">
                <h2 className='pl-4'>{data[getWrappedIndex(currentIndex)]?.category}</h2>
              </div>
            </div>

            {/* รูปสอง */}
            <div className='w-[400px] h-[400px] relative flex-none'>
              <img
                className="object-cover w-full h-full"
                src={data[getWrappedIndex(currentIndex + 1)]?.image}
                alt= ""
              />
              <div className="w-[250px] h-[50px] bg-opacity-60 bg-white absolute bottom-0 flex items-center">
                <h2 className='pl-4'>{data[getWrappedIndex(currentIndex + 1)]?.category}</h2>
              </div>
            </div>
            {/* รูปสาม */}
            <div className='w-[400px] h-[400px] relative flex-none'>
              <img
                className="object-cover w-full h-full"
                src={data[getWrappedIndex(currentIndex + 2)]?.image}
                alt= ""
              />
              <div className="w-[250px] h-[50px] bg-opacity-60 bg-white absolute bottom-0 flex items-center">
                <h2 className='pl-4'>{data[getWrappedIndex(currentIndex + 2)]?.category}</h2>
              </div>
            </div>



              {/* ข้อความโปรโมทสินค้า */}
              <div className='absolute top-0 left-1/2 max-w-[400px] transform -translate-x-[12%]'>
                <h2 className='text-3xl'>Title</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum aperiam quidem rerum, ipsam ullam culpa tempora repellat corporis quia vero iste cum odit ducimus suscipit nihil dolore commodi perspiciatis assumenda.</p>
              </div>

              {/* ปุ่มเลื่อนรูป */}
              <div className='absolute bottom-0 left-1/2 w-[400px] transform -translate-x-[12%]'>
                <div className='flex justify-between w-full'>
                  <button onClick={handlePrevClick} className='text-black border-black btn btn-outline btn-circle'> ❮ </button>
                  <button onClick={handleNextClick} className='text-black border-black btn btn-outline btn-circle'> ❯ </button>
                </div>
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
          <Link to='/aboutus' className='px-12 py-3 text-white bg-black'>Learn more</Link>
        </div>
      </div>

      {/* ส่วนเลือกสินค้า/รูป ตามปุ่ม */}
      <div className='flex justify-center w-full'>
        <div className='p-[84px] h-screen flex flex-col gap-4 max-w-[1280px] mx-auto'>
          <h1 className='w-full font-bold text-center text-[96px] md:text-left md:text-7xl'>Shop by room</h1>
          {/* mobile */}
          <div className='flex w-full py-4 space-x-4 md:hidden carousel carousel-center'>
            {/* card */}
            {items.map((item) => (
              <div key={item.id} className='carousel-item h-[460px] w-[300px] text-center justify-between flex flex-col'>
                <img
                  className="object-cover w-full rounded-lg h-3/4"
                  src={item.img}
                  alt="img-container"
                />
                <p className='text-lg'>{item.name}</p>
                <button className='px-12 py-3 text-white bg-black'>Explore more</button>
              </div>
            ))}
          </div>

          {/* desktop */}
          <div className='flex justify-between w-full gap-8 max-md:hidden'>
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
            <div key={selectedItem?.id} className='h-[460px] w-[300px]'>
              <div className='w-[300px] justify-between flex flex-col'>
                <img className='h-[300px] w-[300px]' src={selectedItem?.img} alt="selected-img" />
                <p className='text-lg'>{selectedItem?.description}</p>
                <button className='px-12 py-3 text-white bg-black'>Explore more</button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Home;
