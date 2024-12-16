import { useNavigate } from "react-router-dom";
import { removeBook } from "../utils/bookMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeSelectedBook, selectBook } from "../utils/bookSlice";

const BookItem = ({info}) => {
    const navigate = useNavigate();
    const books = useSelector((store) => store.bookMenu.books);
    const dispatch = useDispatch();

    const deleteBook = async(bookId) => {
        try {
            await axios.delete(BASE_URL + "/books/" + bookId);
            dispatch(removeBook(bookId));
            dispatch(removeSelectedBook(bookId));
        } catch (err) {
            console.log("Error: ", err);
        }
    } 

    const editBook = (bookId) => {
        const filterData =  books?.filter((book) => book.BookId === bookId);
        dispatch(selectBook(filterData[0]));
        navigate(`/editbooks/${bookId}`);
    }

    return (
        <div className="w-[340px] mb-10 flex flex-col">          
            <div className="flex gap-2">
                <img 
                    className="w-36 h-[218px] rounded-lg"
                    alt="category_Iamge" 
                    src={info.CoverImageUrl}
                />
                <div className="flex flex-col">
                    <div>
                        <span className="text-base text-gray-600">Title: </span><span className="text-lg font-semibold text-gray-600">{info.Title}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Category Id: </span><span className="text-sm text-gray-600 font-semibold">{info.CategoryId}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Category: </span><span className="text-sm text-gray-600 font-semibold">{info.CategoryName}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Product Id: </span><span className="text-sm text-gray-600 font-semibold">{info.CategoryId}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Author: </span><span className="text-sm text-gray-600 font-semibold">{info.Author}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Language: </span><span className="text-sm text-gray-600 font-semibold">{info.Language}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Published Year: </span><span className="text-sm text-gray-600 font-semibold">{info.PublishedYear}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Quantity: </span><span className="text-sm text-gray-600 font-semibold">{info.Quantity}</span>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600">Price: </span><span className="text-sm text-gray-600 font-semibold">{info.Price}</span>
                    </div>
                </div>    
            </div>
            <div className="mx-1">
                <div>
                    <span className="text-sm text-gray-600">Description: </span><span className="text-gray-700 text-sm font-semibold">{info.Description}</span>
                </div>
            </div>
            <div className="flex gap-10 mt-2">
                <button 
                    className="px-3 text-blue-600 border border-blue-600 rounded-md text-sm"
                    onClick={() => editBook(info.BookId)}
                >Update</button>
                <button 
                    className="py-1 px-5 rounded-md text-red-600 border border-red-600 text-sm"
                    onClick={() => deleteBook(info.BookId)}
                >Delete</button>
            </div>
        </div>
    );
}

export default BookItem;