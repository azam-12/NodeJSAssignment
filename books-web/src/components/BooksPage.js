import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addBooks, selectCategory } from "../utils/bookMenuSlice";
import { addCategoryMenu } from "../utils/categoryMenuSlice";
import BookItem from "./BookItem";

const BooksPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const catId = params.catId;
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (store) => store.bookMenu.selectedCategory
  );
  const booksOfCategory = useSelector((store) => store.bookMenu.books);
  const location = useLocation();

  const [pageNumber, setPageNumber] = useState("");
  const [limit, setLimit] = useState("");
  const [cursors, setCursors] = useState({
    nextCursor: null,
    prevCursor: null,
  });

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

  /**
   *
   * Destructure and construct the url here
   */
  const fetchData = async (queryParams) => {
    try {
      const res = await axios.get(BASE_URL + "/books/" + catId, {
        params: queryParams,
      });

      const { records, page, nextCursor, prevCursor } = res.data;
      setCursors({ nextCursor, prevCursor });
      setLimit(limit);
      setPageNumber(page);
      dispatch(addBooks(records));
    } catch (err) {
      console.error("Error fetching data!" + err);
    } finally {
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const directionValue = searchParams.get("direction");
    const pageNumberValue = searchParams.get("page");
    const titleCursorValue = searchParams.get("titleCursor");
    const bookIdCursorValue = searchParams.get("bookIdCursor");
    const limitValue = searchParams.get("limit");

    fetchData({
      direction: directionValue,
      page: pageNumberValue,
      titleCursor: titleCursorValue,
      bookIdCursor: bookIdCursorValue,
      limit: limitValue,
    });
  }, [location.search]);

  const handlePrev = async () => {
    if (cursors.prevCursor) {
        const url = `/books/${catId}?direction=prev&page=${pageNumber}&titleCursor=${cursors.prevCursor.titleCursor}&bookIdCursor=${cursors.prevCursor.bookIdCursor}&limit=${limit}`;
        navigate(url);
    }
  };

  const handleNext = async () => {
    if (cursors.nextCursor) {
    const url = `/books/${catId}?direction=next&page=${pageNumber}&titleCursor=${cursors.nextCursor.titleCursor}&bookIdCursor=${cursors.nextCursor.bookIdCursor}&limit=${limit}`;
    navigate(url);
    }
  };

  return (
    <div className="flex-grow">
      <h1 className="text-4xl font-semibold text-center my-6 text-gray-700">{`We have following Books for ${selectedCategory?.CategoryName} Category`}</h1>
      <button
        className="font-semibold text-center mb-6 mx-12 bg-green-400 text-gray-700 py-2 px-5 rounded-lg"
        onClick={() => navigate(`/addbooks/${catId}`)}
      >
        {`Add New Book to ${selectedCategory?.CategoryName} Category`}
      </button>
      <div className="flex flex-wrap mx-12 gap-5">
        {booksOfCategory?.map((book) => (
          <div key={book.BookId}>
            <BookItem info={book} />
          </div>
        ))}
      </div>
      <div className="flex gap-12 justify-center mb-5">
        <button
          className={`text-blue-600 font-semibold`}
          onClick={() => handlePrev()}
        >
          {cursors.prevCursor ? "<< Prev" : ""}
        </button>
        <button
          className={`text-blue-600 font-semibold`}
          onClick={() => handleNext()}
        >
          {cursors.nextCursor ? "Next >>" : ""}
        </button>
      </div>
    </div>
  );
};

export default BooksPage;
