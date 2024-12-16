const express = require("express");
const categoryRouter = express.Router();
const { getAllCategories, getCategoryData, addCategory, updateCategory, deleteCategory } = require("../controllers/category");


categoryRouter.get("/category", getAllCategories);

categoryRouter.get("/category/:catId", getCategoryData);

categoryRouter.post("/category/addcategory", addCategory);

categoryRouter.post("/category/editcategory/:catId", updateCategory);

categoryRouter.delete("/category/:catId", deleteCategory);


module.exports = categoryRouter;