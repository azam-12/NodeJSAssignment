const connectDB = require("../config/database");
const { validateAddCategoryData, validateEditCategoryData } = require("../utils/validations");
const { DEFAULT_CATEGORY_IMG } = require("../utils/constants");


const getAllCategories = async(req, res) => {
    try {
        const q = "select * from categories";
        await connectDB.query(q, (err, data) => {
            if(err) return  res.json({ message: "Error getting data", data: err });
            return res.json({ data });
        })
        
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);      
    }
}


const getCategoryData = async(req,res) => {
    try {
        const catId = parseInt(req.params.catId);
        const q = "select * from categories where CategoryId = ?";
        await connectDB.query(q, [catId], (err, data) => {
            if(err) return  res.json({ message: "Error getting data", data: err });
            return res.json({ data });
        })
        
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);      
    }
}


const addCategory = async(req, res) => {
    try {
        const { CategoryName, CategoryDescription } = req.body;
        validateAddCategoryData(req);

        let { CategoryImage } = req.body;
        if(!CategoryImage){
            CategoryImage = DEFAULT_CATEGORY_IMG;
        }
        const q = "INSERT INTO categories (`CategoryName`, `CategoryDescription`, `CategoryImage`) VALUES (?)";
        const values = [CategoryName, CategoryDescription, CategoryImage];
        
        await connectDB.query(q, [values], (err, data) => {
            if(err) return  res.json({ message: "Cannot insert data", data: err });
            return res.json({ message: "Category created successfully!!!" });
        })

    } catch (err) {
        res.status(400).send("Error: " + err.message + "\n");
    }
}


const updateCategory = async(req, res) => {
    try {
        const catId = parseInt(req.params.catId);
        const isAllowedEdit = validateEditCategoryData(req);
        if(!isAllowedEdit){
            throw new Error("Invalid Edit Request!!!");
        }
        const { CategoryDescription, CategoryImage } = req.body;

        const q = `UPDATE categories SET CategoryDescription = ?, CategoryImage = ?, 
            UpdatedAt = CURRENT_TIMESTAMP WHERE CategoryId = ?`;   
        
        connectDB.query(q, [CategoryDescription, CategoryImage, catId], (err, data) => {
            if(err) return res.json({ message: "Category Update failed!", data: err });
            res.json({ message: "Category updated successfully!!!" });
        });

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
}


const deleteCategory = async(req, res) => {
    try {
        const catId = parseInt(req.params.catId);
        const q = "delete from categories where CategoryId = ?";

        connectDB.query(q, [catId], (err, data) => {
            if(err) return res.json({ message: "Delete failed!", data: err })
                res.json({ message: "Category deleted successfully!!!" })
        });
        
    } catch (err) {
        res.json({ message: "Somwthing went wrong!", data: err});    
    }
}


module.exports = { 
    getAllCategories,
    getCategoryData,
    addCategory,
    updateCategory,
    deleteCategory
 }