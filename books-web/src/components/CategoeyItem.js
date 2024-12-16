import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addBooks, selectCategory } from "../utils/bookMenuSlice";
import { addCategory } from "../utils/categorySlice";

const CategoryItem = ({info}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * set the selected category and its respective books in the store then navigate to BookPage
     */
    const handleClick = async(e) => {
        try {
            const catResult = await axios.get(BASE_URL + "/" + info.CategoryId);
            const res = await axios.get(BASE_URL + "/books/" + info.CategoryId);
            const { records } = res.data;
            dispatch(selectCategory(catResult.data.data[0]));
            dispatch(addBooks(records));
            const url = `books/${info.CategoryId}?direction=next&page=${1}&titleCursor=${""}&bookIdCursor=${""}&limit=${8}`;
            navigate(url);
        } catch (err) {
            console.log("ERROR"+err)
        }
    }

    const editCategory = async(catId) => {
        const res = await axios.get(BASE_URL + "/" + catId);
        dispatch(addCategory(res.data.data[0]));
        navigate(`/editcategory/${catId}`);
    }

    const deleteCategory = async(catId) => {
        try {
            await axios.delete(BASE_URL + "/" + catId);
        } catch (err) {
            console.log("Error"+ err);
        }
    }

    

    return (
        <div className="w-96 mb-10 flex flex-col items-center">
            <div onClick={(e) => handleClick(e)}>
            <span className="text-2xl font-bold text-gray-700">{info.CategoryName}</span>
            <img 
                className="w-96 h-60 rounded-lg"
                alt="category_Iamge" 
                src={info.CategoryImage}
            />
            </div>
            <div className="mx-2">
                <span className="font-semibold text-gray-700">{info.CategoryDescription}</span>
            </div>
            <div className="flex gap-10 mt-2">
                <button 
                    className="py-1 px-5 text-blue-600 border border-blue-600 rounded-md"
                    onClick={() => editCategory(info.CategoryId)}
                >Update</button>
                <button 
                    className="py-1 px-5 rounded-md text-red-600 border border-red-600"
                    onClick={() => deleteCategory(info.CategoryId)}
                >Delete</button>
            </div>
        </div>
    );
}

export default CategoryItem;