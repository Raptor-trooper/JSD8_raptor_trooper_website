/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { assets } from "../../assets/admin/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../../Context/ShopContext";

const Add = () => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const { Api } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Home Decor");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      console.log(formData)

      const response = await axios.post(
        `${Api}/product/add`,
        formData,
        // { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add Product</h1>
      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Upload Images */}
        <div>
          <p className="text-sm font-medium mb-2">Upload Images</p>
          <div className="flex gap-4 flex-wrap">
            {[image1, image2, image3, image4].map((image, index) => (
              <label key={index} htmlFor={`image${index + 1}`} className="cursor-pointer">
                <img
                  src={!image ? assets.upload_area : URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className="w-20 h-20 object-cover border rounded-md"
                />
                <input
                  type="file"
                  id={`image${index + 1}`}
                  hidden
                  onChange={(e) =>
                    [
                      setImage1,
                      setImage2,
                      setImage3,
                      setImage4,
                    ][index](e.target.files[0])
                  }
                />
              </label>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter product price"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
            placeholder="Enter product description"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="Home Decor">Home Decor</option>
            <option value="Bath & Body">Bath & Body</option>
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-700 transition"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
