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
    <div className="max-w-screen-xl mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full block md:hidden">
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
                  className="w-full h-auto object-cover rounded-lg shadow-md"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* รูปภาพเพิ่มเติม */}
        <div className="hidden md:flex flex-col gap-4 w-1/4">
          {productData?.image?.map((img, index) => (
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
                console.log("Selected Image:", img);
                setSelectedImage(img);
              }}
            />
          ))}
        </div>

        {/* รูปภาพหลัก */}
        <div className="hidden md:block w-full md:w-1/2">
          <img
            src={selectedImage || image}
            alt={productData.name || "Product Image"}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
        </div>
        {/* รายละเอียดสินค้า */}
        <div className="w-full md:w-1/2">
          <h1 className="text-4xl font-bold mb-4">{productData.name}</h1>
          <p className="text-xl mb-4">฿{productData.price}</p>

          <button
            className="w-full py-4 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition"
            onClick={() => addToCart(productData._id)}
          >
            Add to Cart
          </button>
        </div>
      </div>
      {/* Description */}
      <div className="my-20">
        <div className="collapse collapse-plus bg-white border-y border-black rounded-none">
          <input type="checkbox" />
          <div className="collapse-title text-xl font-bold">Description</div>
          <div className="collapse-content">
            <p>
              <p>{productData.description}</p>
            </p>
          </div>
        </div>
      </div>
      {/* <CartConfirm
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        totalAmount={totalAmount}
      /> */}
    </div>
  ) : (
    <div className=" opacity-0"></div>
  );
};
export default ProductPage;

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { ShopContext } from "../Context/ShopContext";
// import CartConfirm from "../components/CartConfirm";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/swiper-bundle.css";

// const ProductPage = () => {
//   const { name } = useParams();
//   const { category, cartItems, addToCart } = useContext(ShopContext);

//   const [product, setProduct] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   useEffect(() => {
//     if (category && category.length > 0) {
//       const foundProduct = category.find((item) => item.name === name);
//       setProduct(foundProduct);
//       if (
//         foundProduct &&
//         foundProduct.images &&
//         foundProduct.images.length > 0
//       ) {
//         setSelectedImage(foundProduct.images[0]); // กำหนดภาพแรกเป็นค่าเริ่มต้น
//       }
//     }
//   }, [name, category]);
//   if (!product) {
//     return <div>Loading...</div>;
//   }
//   const handleQuantityChange = (type) => {
//     if (type === "increment") {
//       setQuantity(quantity + 1);
//     } else if (type === "decrement" && quantity > 1) {
//       setQuantity(quantity - 1);
//     }
//   };
//   const handleAddToCart = () => {
//     const cartItem = { ...product, quantity };
//     addToCart(cartItem); // เพิ่มสินค้าลงในตะกร้า
//     setIsCartOpen(true); // เปิดหน้า cart confirm
//   };
//   const handleCloseCart = () => {
//     setIsCartOpen(false);
//   };
//   const totalAmount = cartItems.reduce(
//     (total, item) => total + item.price * item.quantity,
//     0
//   );

// return (
//   <div className="max-w-screen-xl mx-auto p-8"> ✅
//     <div className="flex flex-col md:flex-row gap-8">
//       <div className="w-full block md:hidden">
//         <Swiper
//           spaceBetween={10}
//           slidesPerView={1}
//           navigation
//           pagination={{ clickable: true }}
//           loop
//         >
//           {product.image.map((img, index) => (
//             <SwiperSlide key={index}>
//               <img
//                 src={img}
//                 alt={`Product Image ${index + 1}`}
//                 className="w-full h-auto object-cover rounded-lg shadow-md"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>

//       {/* รูปภาพเพิ่มเติม */}
//       {/* <div className=" w-full md:w-1/4 flex flex-col gap-4"> */}
//       <div className="hidden md:flex flex-col gap-4 w-1/4">
//         {productData.image.map((item, index) => (    ✅
//           <img
//             key={index}
//             src={item}
//             alt={`Product Image ${index + 1}`}
//             className={`w-full h-24 object-cover rounded-lg cursor-pointer ${
//               selectedImage === img ? "border-2 border-black" : ""
//             }`}
//             onClick={() => setSelectedImage(img)}
//           />
//         ))}
//       </div>

//       {/* รูปภาพหลัก */} ✅
//       {/* <div className="w-full md:w-1/2"> */}
//       <div className="hidden md:block w-full md:w-1/2">
//         <img
//           src={selectedImage || image}
//           alt={product.name}
//           className="w-full h-auto object-cover rounded-lg shadow-md"
//         />
//       </div>
//       {/* รายละเอียดสินค้า */} ✅
//       <div className="w-full md:w-1/2">
//         <h1 className="text-4xl font-bold mb-4">{productData.name}</h1>
//         <p className="text-xl mb-4">฿{productData.price}</p>
//         <div className="mb-6">
//           <label
//             htmlFor="quantity"
//             className="block mb-2 text-lg font-medium"
//           >
//             Quantity
//           </label>
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={() => handleQuantityChange("decrement")}
//               className="px-4 py-2 border border-gray-400 rounded-md"
//             >
//               -
//             </button>
//             <p>{quantity}</p>
//             <button
//               onClick={() => handleQuantityChange("increment")}
//               className="px-4 py-2 border border-gray-400 rounded-md"
//             >
//               +
//             </button>
//           </div>
//         </div>

//         <button
//           className="w-full py-4 bg-black text-white font-bold rounded-md hover:bg-gray-800 transition"
//           onClick={() => addToCart(productData._id)}
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//     {/* Description */}
//     <div className="my-20">
//       <div className="collapse collapse-plus bg-white border-y border-black rounded-none">
//         <input type="checkbox" />
//         <div className="collapse-title text-xl font-bold">Description</div>
//         <div className="collapse-content">
//           <p>
//             {productData.description}
//           </p>
//         </div>
//       </div>
//     </div>
//     <CartConfirm
//       isOpen={isCartOpen}
//       onClose={handleCloseCart}
//       cartItems={cartItems}
//       totalAmount={totalAmount}
//     />
//   </div>
// );
// };
// export default ProductPage;
