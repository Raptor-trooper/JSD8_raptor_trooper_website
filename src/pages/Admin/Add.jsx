import { useContext, useState } from "react";
import { assets } from "../../assets/admin/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../../Context/ShopContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

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
  const [bestseller, setBestseller] = useState(false);

  const MySwal = withReactContent(Swal);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(`${Api}/product/add`, formData);

      if (response.data.success) {
        // SweetAlert2 แสดงผลเมื่อเพิ่มสินค้าสำเร็จ
        MySwal.fire({
          title: "Success!",
          text: "Product added successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Reset ฟอร์ม
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
    <div className="container max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-4xl font-bold">Add Product</h1>
      <form onSubmit={onSubmitHandler} className="space-y-6">
        {/* Upload Images */}
        <div>
          <p className="mb-2 text-sm font-medium">Upload Images</p>
          <div className="flex flex-wrap gap-4">
            {[image1, image2, image3, image4].map((image, index) => (
              <label
                key={index}
                htmlFor={`image${index + 1}`}
                className="cursor-pointer"
              >
                <img
                  src={!image ? assets.upload_area : URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  className="object-cover w-20 h-20 border rounded-md"
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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Product Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter product price"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter product description"
            rows="4"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="Home Decor">Home Decor</option>
            <option value="Bath & Body">Bath & Body</option>
            <option value="Apparel">Apparel</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <div className="flex gap-2 mt-2">
          <input
            onChange={() => setBestseller((prev) => !prev)}
            checked={bestseller}
            type="checkbox"
            id="bestseller"
          />
          <label className="cursor-pointer" htmlFor="bestseller">
            Add to bestseller
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="button"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;