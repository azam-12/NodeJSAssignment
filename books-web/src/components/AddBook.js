import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryMenu } from "../utils/categoryMenuSlice";
import { addBooks, selectCategory } from "../utils/bookMenuSlice";

const AddBook = () => {
  const selectedcategory = useSelector(
    (store) => store.bookMenu.selectedCategory
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const catId = params.catId;

  const [title, setTitle] = useState("");
  const [author, setIAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  /**
   * Will execute when page is refreshed manually
   */
  const getAllData = async () => {
    try {
      const resMenu = await fetch(BASE_URL);
      const json = await resMenu.json();
      dispatch(addCategoryMenu(json.data));
      const resCat = await axios.get(BASE_URL + "/" + catId);
      dispatch(selectCategory(resCat.data.data[0]));
      const res = await axios.get(BASE_URL + "/books/" + catId);
      dispatch(addBooks(res.data.records));
    } catch (err) {
      console.log("Error!" + err);
    }
  };

  useEffect(() => {
    getAllData();
  }, []);

  const saveBook = async () => {
    try {
      const res = await axios.post(BASE_URL + `/addbooks/${catId}`, {
        Title: title,
        Author: author,
        Price: price,
        Quantity: quantity,
      });
      setShowSuccess(true);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    selectedcategory && (
      <div className="flex flex-grow flex-col">
        <div>
          <button
            className="font-semibold bg-green-400  text-gray-700 py-2 px-5 rounded-lg mt-5 ml-12"
            onClick={() => navigate(`/books/${selectedcategory.CategoryId}`)}
          >
            {`Back to ${selectedcategory.CategoryName} Category`}
          </button>
        </div>
        <div className="flex flex-col gap-5 w-full items-center">
          <h1 className="font-bold text-3xl mb-5 mt-8">{`Add a New Book to ${selectedcategory.CategoryName} Category`}</h1>
          <div className="w-1/4  flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">Title: </span>
            <input
              className="border border-gray-400 rounded-md h-8 py-1 px-2 flex-1"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              placeholder="Title"
            />
          </div>
          <div className="w-1/4 flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">
              Author:{" "}
            </span>
            <input
              className="border border-gray-400 rounded-md h-8 py-1 px-2 flex-1"
              onChange={(e) => setIAuthor(e.target.value)}
              value={author}
              placeholder="Author"
            />
          </div>
          <div className="w-1/4 flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">Price: </span>
            <input
              className="border border-gray-400 rounded-md h-8 py-1 px-2 flex-1"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder="Price"
            />
          </div>
          <div className="w-1/4 flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">
              Quantity:{" "}
            </span>
            <input
              className="border border-gray-400 rounded-md h-8 py-1 px-2 flex-1"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
              placeholder="Quantity"
            />
          </div>
          <span className="text-red-600">{error}</span>
          {showSuccess && (
            <span className="text-green-600">Book added Successfully!</span>
          )}
          <button
            className="font-semibold text-center bg-green-400 text-gray-700 px-5 rounded-lg h-8 w-1/4 mb-10"
            onClick={() => saveBook()}
          >
            Save
          </button>
        </div>
      </div>
    )
  );
};

export default AddBook;
