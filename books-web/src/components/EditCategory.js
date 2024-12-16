import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


const EditCategory = () => {
    const selectedCategory = useSelector((store) => store.category);
    const params = useParams();
    const catId = params.catId;
    
    const [desc, setDesc] = useState(selectedCategory?.CategoryDescription);
    const [imageUrl, setImageUrl] = useState(selectedCategory?.CategoryImage);
    const [error, setError] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    
    const saveCategory = async() => {
        try {
            await axios.post(BASE_URL + `/editcategory/${catId}`, {
                CategoryDescription: desc,
                CategoryImage: imageUrl
            });
            setShowSuccess(true);
        } catch (err) {
            setError(err.response.data);
        }
    }
    

    return (   
        selectedCategory && (
            <div className="flex flex-col items-center mx-auto flex-grow gap-5 w-full pt-14">
                <h1 className="font-bold text-3xl mb-5">Edit Existing Category</h1>
                <label
                    className="text-gray-600 font-semibold text-2xl"
                    >
                    {selectedCategory.CategoryName}
                </label>
                <textarea 
                    className="border border-gray-400 rounded-md w-1/4 py-1 px-2" 
                    onChange={(e) => setDesc(e.target.value)} 
                    value={desc}
                    placeholder="Category Description"
                    rows={5}
                />
                <input 
                    className="border border-gray-400 rounded-md h-8 w-1/4 py-1 px-2" 
                    onChange={(e) => setImageUrl(e.target.value) } 
                    value={imageUrl}
                    placeholder="Category Image Url"
                />
                <span className="text-red-600">{error}</span>
                {showSuccess && <span className="text-green-600">Category Updated Successfully!</span>}
                <button 
                    className="font-semibold text-center bg-green-400 text-gray-700 px-5 rounded-lg h-8 w-1/4" 
                    onClick={() => saveCategory()}>
                    Save</button>
            </div>
        )
    );
}

export default EditCategory;