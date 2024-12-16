import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import CategoryItem from "./CategoeyItem";
import { useDispatch, useSelector } from "react-redux";
import { addCategoryMenu } from "../utils/categoryMenuSlice";
 
const CategoryPage = () => {

    const navigate = useNavigate();
    const categories = useSelector((store) => store.categoryMenu);
    const dispatch = useDispatch();
    
    const getCategories = async() => {
        const res = await fetch(BASE_URL);
        const json = await res.json();
        dispatch(addCategoryMenu(json.data));
    }
    
    useEffect(() => {
        getCategories();
    },[categories]);


    return (
        <div className="mx-12">
            <h1 className="text-4xl font-semibold text-center my-6 text-gray-700">Discover your next favorite read! Which category excites you today?</h1>
            <button 
                className="font-semibold text-center mb-6 mx-12 bg-green-400 text-gray-700 py-2 px-5 rounded-lg"
                onClick={() => navigate("/addcategory")}>
                Add Category to your Collection
            </button>
            <div className="flex flex-wrap mx-12 justify-between">
                {categories?.map((category) => (
                    <div key={category.CategoryId}>
                        <CategoryItem info={category}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CategoryPage;