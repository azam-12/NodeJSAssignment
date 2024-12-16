import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const EditBook = () => {
  const selectedBook = useSelector((store) => store?.book);
  const selectedcategory = useSelector((store) => store?.bookMenu?.selectedCategory);
  const navigate = useNavigate();
  const params = useParams();
  const bookId = params.bookId;

  const [desc, setDesc] = useState(selectedBook?.Description);
  const [imageUrl, setImageUrl] = useState(selectedBook?.CoverImageUrl);
  const [year, setYear] = useState(selectedBook?.PublishedYear);
  const [language, setLanguage] = useState(selectedBook?.Language);
  const [publisher, setPublisher] = useState(selectedBook?.Publisher);
  const [isbn, SetIsbn] = useState(selectedBook?.ISBN);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);


  const saveBook = async () => {
    try {
      await axios.post(BASE_URL + `/editbooks/${bookId}`, {
        ISBN: isbn,
        Year: year,
        Language: language,
        Publisher: publisher,
        Description: desc,
        CoverImageUrl: imageUrl,
      });
      setShowSuccess(true);
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    selectedBook && (
      <div className="flex flex-grow flex-col">
        <div>
          <button
            className="font-semibold bg-green-400  text-gray-700 py-2 px-5 rounded-lg mt-5 ml-12"
            onClick={() => navigate(`/books/${selectedcategory.CategoryId}?page=${1}&titleCursor=${""}&bookIdCursor=${""}&limit=${8}`)}
          >
            {`Back to ${selectedcategory.CategoryName} Category`}
          </button>
        </div>
        <div className="flex flex-col flex-grow gap-5 w-full items-center">
          <h1 className="font-bold text-3xl mb-2 pt-8">Edit Existing Book</h1>
          <div className="w-1/3 flex gap-3 items-center">
            <span className="text-gray-600 font-semibold text-xl">Title: </span>
            <span className="text-gray-600 font-bold text-2xl">
              {selectedBook.Title}
            </span>
          </div>
          <div className="w-1/3 flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">
              Publisher:{" "}
            </span>
            <input
              className="border border-gray-400 rounded-md h-8 py-1 px-2 flex-1"
              onChange={(e) => setPublisher(e.target.value)}
              value={publisher}
              placeholder="Publisher"
            />
          </div>
          <div className="w-1/3 flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">
              Published Year:{" "}
            </span>
            <input
              className="border border-gray-400 rounded-md h-8 py-1 px-2 flex-1"
              onChange={(e) => setYear(e.target.value)}
              value={year}
              placeholder="Published Year"
            />
          </div>
          <div className="w-1/3 flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">
              ISBN Number:{" "}
            </span>
            <input
              className="border border-gray-400 rounded-md h-8 py-1 px-2 flex-1"
              onChange={(e) => SetIsbn(e.target.value)}
              value={isbn}
              placeholder="ISBN Number"
            />
          </div>
          <div className="w-1/3 flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">
              Language:{" "}
            </span>
            <input
              className="border border-gray-400 rounded-md h-8 py-1 px-2 flex-1"
              onChange={(e) => setLanguage(e.target.value)}
              value={language}
              placeholder="Language"
            />
          </div>
          <div className="w-1/3 flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">
              Description:{" "}
            </span>
            <textarea
              className="border border-gray-400 rounded-md py-1 px-2 flex-1"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              placeholder="Book Description"
              rows={5}
            />
          </div>
          <div className="w-1/3 flex gap-3">
            <span className="text-gray-600 font-semibold text-xl">
              Cover Image Url:{" "}
            </span>
            <input
              className="border border-gray-400 rounded-md h-8 py-1 px-2 flex-1"
              onChange={(e) => setImageUrl(e.target.value)}
              value={imageUrl}
              placeholder="Cover Image Url"
            />
          </div>
          <span className="text-red-600">{error}</span>
          {showSuccess && (
            <span className="text-green-600">
              Book details Updated Successfully!
            </span>
          )}
          <button
            className="font-semibold text-center bg-green-400 text-gray-700 px-5 rounded-lg h-8 w-1/3 mb-10"
            onClick={() => saveBook()}
          >
            Save
          </button>
        </div>
      </div>
    )
  );
};

export default EditBook;
