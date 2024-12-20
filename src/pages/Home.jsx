import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import backgroundHeroImage from "../images/home/hero-bg-2.jpg";
import leftSide from "../images/home/learnmore-2.png";
import rightSide from "../images/home/learnmore-2.png";
import heroImage from "../images/home/hero-bg-1.jpg";


const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { category } = useContext(ShopContext);
  const [firstProductByCategory, setFirstProductByCategory] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [isClick, setIsClick] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //Group products by category
    const groupedByCategory = category.reduce((acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    }, {});

    //Get the first product for each category
    const firstProducts = Object.values(groupedByCategory).map(products => products[0]);
    setFirstProductByCategory(firstProducts);

    //Set the initial selected item
    const initialProduct = category.find(product => product.category === "Home Decor");
    if (initialProduct) {
      setSelectedItem(initialProduct);
    }

    //Filter best-selling products
    const bestProduct = category.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [category]);

  const [selectedItem, setSelectedItem] = useState();

  const handleSelected = (id) => {
    setSelectedItem(firstProductByCategory.find((item) => item._id === id));
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bestSeller.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bestSeller.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getWrappedIndex = (index) => {
    return (
      ((index % bestSeller.length) + bestSeller.length) % bestSeller.length
    );
  };
  // navigate category ที่เลือก
  const navigateSelected = (category) => {
    if (category) {
      const selectedCategory = category.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
      navigate(`/${selectedCategory}`);
    }
  }

  return (
    <div className="flex flex-col items-center text-black bg-[#FAF7F0]" >

      {/* Hero section */}
      <div className="flex justify-center w-full md:h-screen h-fit" style={{ backgroundImage: `url(${backgroundHeroImage})` }}>
        <div className="flex flex-col md:flex-row items-center p-[84px] mx-auto max-w-[1440px]">
          <div className="flex flex-col items-center w-3/4 mb-8 max-md:pt-8 max-md:pb-4 md:w-1/2 md:mr-8 md:mb-0">
            <h1 className="mb-8 text-5xl font-bold text-center md:text-7xl">
              Choose what&apos;s right for you.
            </h1>
            <Link
              to="/homeallproducts"
              className="bg-black text-white px-5 py-2.5 text-base font-bold text-center"
            >
              Shop now
            </Link>
          </div>
          <div>
            <img
              className="object-cover h-[500px] w-full md:w-[500px]"
              src={heroImage}
            />
          </div>
        </div>
      </div>

      {/* ส่วนหัวข้อและรูปภาพ */}
      <div className="flex justify-center w-full py-16 md:overflow-hidden">
        <div className="flex flex-col px-4 py-8 p-[84px] mx-auto max-w-[1280px] md:px-12">
          {/* ส่วนหัวข้อ */}
          <h1 className="md:text-[96px] max-sm:text-5xl text-7xl max-md:text-center font-bold mb-8">Bestseller</h1>

          <div className="flex flex-col items-center gap-4 mx-auto md:flex-row md:gap-12 md:relative">
            {/* ข้อความโปรโมทสินค้า */}
            <div className="md:absolute top-0 left-1/2 max-w-[400px] md:translate-x-[70px] transform lg:-translate-x-[12%]">
              <p className="text-2xl">
              Don&apos;t Miss Out! Bestselling Products That Everyone&apos;s Talking About.
              </p>
            </div>

            <div className="flex flex-row items-center gap-4 max-md:p-[16px] relative">
              {/* รูปแรก */}
              <Link
                className="relative overflow-hidden lg:w-[700px] lg:h-[700px] w-[70vw] h-[70vw] flex-none"
                to={`/productpage/${bestSeller[currentIndex]?._id}`}
                >
                <img
                  className="object-cover w-full h-full overflow-hidden transition ease-in-out hover:scale-105"
                  src={bestSeller[currentIndex]?.image[0]}
                  alt=""
                />
                <div className="absolute bottom-0 flex items-center bg-[#FAF7F0] w-fit h-fit bg-opacity-60">
                  <h2 className="py-3 pl-4 pr-24 text-2xl">
                    {bestSeller[getWrappedIndex(currentIndex)]?.name}
                  </h2>
                </div>
              </Link>

              {/* รูปสอง */}
              <Link
                className="lg:w-[400px] lg:h-[400px] overflow-hidden w-[40vw] h-[40vw] relative flex-none max-md:hidden"
                to={`/productpage/${bestSeller[getWrappedIndex(currentIndex + 1)]?._id}`}
              >
                <img
                  className="object-cover w-full h-full overflow-hidden transition ease-in-out hover:scale-105"
                  src={bestSeller[getWrappedIndex(currentIndex + 1)]?.image[0]}
                />
                <div className="absolute bottom-0 flex items-center bg-[#FAF7F0] w-fit h-fit bg-opacity-60">
                  <h2 className="py-3 pl-4 pr-24 text-2xl">
                    {bestSeller[getWrappedIndex(currentIndex + 1)]?.name}
                  </h2>
                </div>
              </Link>
              {/* รูปสาม */}
              <Link
                className="lg:w-[400px] lg:h-[400px] overflow-hidden w-[40vw] h-[40vw] relative flex-none max-lg:hidden"
                to={`/productpage/${bestSeller[getWrappedIndex(currentIndex + 2)]?._id}`}
                >
                <img
                  className="object-cover w-full h-full overflow-hidden transition ease-in-out hover:scale-105"
                  src={bestSeller[getWrappedIndex(currentIndex + 2)]?.image[0]}
                />
                <div className="absolute bottom-0 flex items-center bg-[#FAF7F0] w-fit h-fit bg-opacity-60">
                  <h2 className="py-3 pl-4 pr-24 text-2xl">
                    {bestSeller[getWrappedIndex(currentIndex + 2)]?.name}
                  </h2>
                </div>
              </Link>
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
            src={leftSide}
          />

          <img
            className="object-cover w-1/4 md:w-fit"
            src={rightSide}
          />
        </div>

        <div className="absolute flex flex-col items-center justify-center gap-6 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <h2 className="text-3xl text-center text-black">
            Inspiring self-expression by celebrating creativity
          </h2>
          <Link to="/aboutus" className="bg-black text-white px-5 py-2.5 text-base font-bold text-center">
            Learn more
          </Link>
        </div>
      </div>

      {/* ส่วนเลือกสินค้า/รูป ตามปุ่ม */}
      <div className='flex justify-center w-full'>
        <div className='md:p-[84px] p-[16px] h-fit flex flex-col items-center gap-16 md:max-w-[1280px] w-full mx-auto'>
          <h1 className='w-fit max-sm:text-5xl font-bold text-center text-7xl md:text-[96px] md:text-left'>Category</h1>
          {/* mobile */}
          <div className="w-5/6 p-6 space-x-2 md:hidden carousel carousel-center">
            {/* card */}
            {firstProductByCategory.map((item) => (
              <div
                key={item?.id}
                className="flex flex-col items-center gap-4 text-center w-fit h-fit carousel-item"
              >
                <img
                  className="object-cover size-[400px] rounded-lg"
                  src={item?.image[0]}
                  alt="item-image"
                />
                <p className="text-lg">{item?.category}</p>
                <button
                  onClick={() => navigateSelected(item?.category)}
                className='bg-black text-white px-5 py-2.5 text-base font-bold text-center'>Explore more</button>
              </div>
            ))}
          </div>

          {/* desktop */}
          <div className="flex items-center justify-between gap-4 max-md:hidden">
            <div className="flex flex-col gap-6">
              <div className="flex justify-center h-auto">
                {firstProductByCategory.map((item, index) => {

                  return (
                  <button
                    key={item._id}
                    onClick={() => {
                      handleSelected(item._id);
                      setIsClick(item._id);
                    }}
                    className={`px-6 py-2 duration-300 transition ease-in-out bg-white border border-black
                      ${index === 0 && 'rounded-s-full'}
                      ${index === firstProductByCategory.length - 1 && 'rounded-e-full'}
                      ${isClick === item._id ? "!text-white !bg-black" : ""}`
                    }
                  >
                    {item.category}
                  </button>
                )})}
              </div>
              <div className="h-[400px] flex justify-center">
                <img className='object-cover h-full' src={selectedItem?.image[0]} alt="img-container" />
              </div>

            </div>
            <div key={selectedItem?.id } className='h-[460px] w-[300px]'>
              <div className='w-[300px] justify-between flex flex-col'>
                <img className='h-[300px] w-[300px] object-cover' src={selectedItem?.image[1]} alt="selected-img" />
                <p className='w-full p-2 text-lg line-clamp-3'>{selectedItem?.description}</p>
                <button
                onClick={() => navigateSelected(selectedItem?.category)}
                className='bg-black text-white px-5 py-2.5 text-base font-bold text-center'>Explore more</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
