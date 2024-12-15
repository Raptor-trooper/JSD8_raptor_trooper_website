import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import backgroundImage from "../assets/home/Screenshot 2567-12-15 at 21.32.00.png";
import backgroundHeroImage from "../assets/home/d3e0bfb3b74e47b44423484b2a204b6f.jpg";
import newCollection from "../assets/home/8f373b630427ed0396c2423c40925614.jpg";

/* Mockup data */
const items = [
  {
    id: 1,
    name: "room1",
    description:
      "11111From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300",
  },
  {
    id: 2,
    name: "room2",
    description:
      "222222From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300",
  },
  {
    id: 3,
    name: "room3",
    description:
      "333333From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300",
  },
  {
    id: 4,
    name: "room4",
    description:
      "4444444From shower curtains to bath towels to bath mats, we've got you covered",
    img: "https://via.placeholder.com/300x300",
  },
];

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { category } = useContext(ShopContext);

  const handleSelected = (id) => {
    setSelectedItem(items.find((item) => item.id === id));
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? category.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === category.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getWrappedIndex = (index) => {
    return ((index % category.length) + category.length) % category.length;
  };

  return (
    <div className="flex flex-col items-center text-black bg-[#FAF7F0]" >

      {/* ส่วนลดสูงสุด 50% */} 
      <div className="flex justify-center w-full md:h-screen h-fit" style={{ backgroundImage: `url(${backgroundHeroImage})` }}>    
        <div className="flex flex-col md:flex-row items-center p-[84px] mx-auto max-w-[1440px]">
          <div className="mb-8 md:mr-8 md:mb-0">
            <h1 className="text-5xl font-bold md:text-7xl">Up to 50% Off</h1>
            <h1 className="text-5xl font-bold md:text-7xl">Sitewide</h1>
            <p className="py-8 text-lg md:text-xl">
              Start Your Holiday Decor & Gifting Now
            </p>
            <Link
              to="/homeallproducts"
              className="px-12 py-3 text-white bg-black"
            >
              Shop now
            </Link>
          </div>
          <div>
            <img
              src="src/assets/home/8f373b630427ed0396c2423c40925614.jpg"
              alt=""
              className="object-cover h-[500px] w-full md:w-[500px]"
            />
          </div>
        </div>
      </div>

      {/* ส่วนหัวข้อและรูปภาพ */}
      <div className="flex justify-center w-full md:overflow-hidden">
        <div className="flex flex-col px-4 py-8 p-[84px] mx-auto max-w-[1280px] md:px-12">
          {/* ส่วนหัวข้อ */}
          <h1 className="text-[96px] max-md:text-center font-bold mb-8">
            Category
          </h1>

          <div className="flex flex-col items-center gap-4 mx-auto md:flex-row md:gap-12 md:relative">
            {/* ข้อความโปรโมทสินค้า */}
            <div className="md:absolute top-0 left-1/2 max-w-[400px] md:translate-x-[70px] transform lg:-translate-x-[12%]">
              <p className="text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>

            <div className="flex flex-row items-center gap-4 max-md:p-[16px]">
              {/* รูปแรก */}
              <div className="relative lg:w-[700px] lg:h-[700px] w-[70vw] h-[70vw] flex-none">
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={category[currentIndex]?.image[0]}
                  alt=""
                />
                <div className="absolute bottom-0 flex items-center bg-[#FAF7F0] w-fit h-fit bg-opacity-60">
                  <h2 className="py-3 pl-4 pr-24 text-2xl">
                    {category[getWrappedIndex(currentIndex)]?.category}
                  </h2>
                </div>
              </div>

              {/* รูปสอง */}
              <div className="lg:w-[400px] lg:h-[400px] w-[40vw] h-[40vw] relative flex-none max-md:hidden">
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={category[getWrappedIndex(currentIndex + 1)]?.image[0]}
                  alt=""
                />
                <div className="absolute bottom-0 flex items-center bg-[#FAF7F0] w-fit h-fit bg-opacity-60">
                  <h2 className="py-3 pl-4 pr-24 text-2xl">
                    {category[getWrappedIndex(currentIndex + 1)]?.category}
                  </h2>
                </div>
              </div>
              {/* รูปสาม */}
              <div className="lg:w-[400px] lg:h-[400px] w-[40vw] h-[40vw] relative flex-none max-lg:hidden">
                <img
                  className="object-cover w-full h-full rounded-lg"
                  src={category[getWrappedIndex(currentIndex + 2)]?.image[0]}
                  alt=""
                />
                <div className="absolute bottom-0 flex items-center bg-[#FAF7F0] w-fit h-fit bg-opacity-60">
                  <h2 className="py-3 pl-4 pr-24 text-2xl">
                    {category[getWrappedIndex(currentIndex + 2)]?.category}
                  </h2>
                </div>
              </div>
            </div>

            {/* ปุ่มเลื่อนรูป */}
            <div className="md:absolute p-4 bottom-0 md:left-1/2 lg:w-[400px] md:w-[40vw] w-full transform lg:-translate-x-[12%] md:translate-x-[70px]">
              <div className="flex justify-between w-full">
                <button onClick={handlePrevClick} className="button">
                  {" "}
                  ❮{" "}
                </button>
                <button onClick={handleNextClick} className="button">
                  {" "}
                  ❯{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ส่วน learn more */}
      <div className="relative h-[400px] w-full">
        <div className="flex justify-between w-full h-full">
          <img
            className="object-cover w-1/4 md:w-fit"
            src="src/assets/home/Screenshot 2567-12-15 at 20.34.54.png"
            alt="left-side-img"
          />

          <div
            className="h-full w-full bg-cover bg-center relative flex flex-col items-center justify-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}>    
          </div>

          <img
            className="object-cover w-1/4 md:w-fit"
            src="src/assets/home/Screenshot 2567-12-15 at 20.32.20.png"
            alt="right-side-img"
          />
        </div>

        <div className="absolute flex flex-col items-center justify-center gap-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <h2 className="text-3xl text-white bg-black bg-opacity-70 text-center">
            Inspiring self-expression by celebrating creativity
          </h2>
          <Link to="/aboutus" className="px-12 py-3 text-white bg-black">
            Learn more
          </Link>
        </div>
      </div>

      {/* ส่วนเลือกสินค้า/รูป ตามปุ่ม */}
      <div className="flex justify-center w-full">
        <div className="md:p-[84px] p-[16px] h-fit flex flex-col items-center gap-4 md:max-w-[1280px] w-full mx-auto">
          <h1 className="w-fit font-bold text-center text-[96px] md:text-left md:text-7xl">
            Shop by room
          </h1>
          {/* mobile */}
          <div className="w-5/6 p-6 space-x-2 md:hidden carousel carousel-center">
            {/* card */}
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center gap-4 text-center w-fit h-fit carousel-item"
              >
                <img
                  className="object-cover rounded-lg"
                  src={item.img}
                  alt="item-image"
                />
                <p className="text-lg">{item.name}</p>
                <button className="button">Explore more</button>
              </div>
            ))}
          </div>

          {/* desktop */}
          <div className="flex justify-between w-full gap-8 max-md:hidden">
            <div className="flex flex-col gap-6">
              <div className="flex">
                {items.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelected(item.id)}
                    className={`px-6 py-2 bg-white border border-black ${
                      index === 0 && "rounded-s-full"
                    } ${index === items.length - 1 && "rounded-e-full"}`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <img
                src="https://via.placeholder.com/756x430"
                alt="img-container"
              />
            </div>
            <div key={selectedItem?.id} className="h-[460px] w-[300px]">
              <div className="w-[300px] justify-between flex flex-col">
                <img
                  className="h-[300px] w-[300px]"
                  src={selectedItem?.img[0]}
                  alt="selected-img"
                />
                <p className="text-lg">{selectedItem?.description}</p>
                <button className="button">Explore more</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
