import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const ProductPage = () => {
  const { productId } = useParams();
  const { category, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchProductData = async () => {
    category.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        setSelectedImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, category]);

  return productData ? (
    <div className="max-w-screen-xl p-8 mx-auto">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="block w-full md:hidden">
          {/* Swiper สำหรับมือถือ */}
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            loop
          >
            {productData.image.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Product Image ${index + 1}`}
                  className="object-cover w-full h-auto rounded-lg shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* รูปภาพเพิ่มเติม */}
        <div className="flex-col hidden w-1/4 gap-4 md:flex">
          {productData.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product Image ${index + 1}`}
              className={`w-full h-24 object-cover rounded-lg cursor-pointer ${
                selectedImage && selectedImage === img
                  ? "border-2 border-black"
                  : ""
              }`}
              onClick={() => {
                setSelectedImage(img);
              }}
            />
          ))}
        </div>

        {/* รูปภาพหลัก */}
        <div className="hidden w-full md:block md:w-1/2">
          <img
            src={selectedImage || image}
            alt={productData.name || "Product Image"}
            className="object-cover w-full h-auto rounded-lg shadow-md"
          />
        </div>
        {/* รายละเอียดสินค้า */}
        <div className="w-full md:w-1/2">
          <h1 className="mb-4 text-4xl font-bold">{productData.name}</h1>
          <p className="mb-4 text-xl">฿{productData.price}</p>

          <button
            className="button"
            onClick={() => addToCart(productData._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {/* Description */}
      <div className="my-20">
        <div className="bg-white border-black rounded-none collapse collapse-plus border-y">
          <input type="checkbox" />
          <div className="text-xl font-bold collapse-title">Description</div>
          <div className="collapse-content">
            <p>
              <p>{productData.description}</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0 "></div>
  );
};
export default ProductPage;