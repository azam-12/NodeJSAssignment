import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const AddCategory = () => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);


  const addCategory = async () => {
    try {
      const res = await axios.post(BASE_URL + "/addcategory", {
        CategoryName: title,
        CategoryDescription: desc,
        CategoryImage: cover,
      });
      setTitle("");
      setCover("");
      setDesc("");
      setShowSuccess(res.data);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
      <div className="flex flex-col items-center mx-auto flex-grow gap-5 w-full pt-14">
        <h1 className="font-bold text-3xl mb-5">Add New Category</h1>
        <div className="w-1/4 flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">Title: </span>
        <input
          className="border border-gray-400 rounded-md h-8 py-1 px-2 flex-1"
          required=""
          type="text"
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          placeholder="Category Title"
        />
        </div>
        <div className="w-1/4  flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">Description: </span>
        <textarea
          className="border border-gray-400 rounded-md py-1 px-2 flex-1"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          placeholder="Category Description"
          rows={5}
        />
        </div>
        <div className="w-1/4  flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">Image Url: </span>
        <input
          className="border border-gray-400 rounded-md h-8 py-1 px-2 flex-1"
          onChange={(e) => setCover(e.target.value)}
          value={cover}
          placeholder="Category Image Url"
        />
        </div>
        <span className="text-red-600">{error}</span>
        {showSuccess && (
          <span className="text-green-600">Category added Successfully!</span>
        )}
        <button
          className="font-semibold text-center bg-green-400 text-gray-700 px-5 rounded-lg h-8 w-1/4"
          onClick={() => addCategory()}
        >
          Add Category
        </button>
      </div>
  );
};

export default AddCategory;
