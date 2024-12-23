const {
  fetchAllCategories,
  fetchCategoryById,
  createCategory,
  modifyCategory,
  removeCategory,
} = require("../services/categoryService");

const getAllCategories = async (req, res) => {
  try {
    const data = await fetchAllCategories();
    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

const getCategoryData = async (req, res) => {
  try {
    const catId = parseInt(req.params.catId);
    const data = await fetchCategoryById(catId);
    res.json({ data });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
};

const addCategory = async (req, res) => {
  try {
    const data = await createCategory(req.body);
    res.json({ message: "Category created successfully!!!", data });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
};

const updateCategory = async (req, res) => {
  try {
    const catId = parseInt(req.params.catId);
    await modifyCategory(catId, req);
    res.json({ message: "Category updated successfully!!!" });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const catId = parseInt(req.params.catId);
    await removeCategory(catId);
    res.json({ message: "Category deleted successfully!!!" });
  } catch (err) {
    res.status(400).send("ERROR !!!!: " + err.message);
  }
};

module.exports = {
  getAllCategories,
  getCategoryData,
  addCategory,
  updateCategory,
  deleteCategory,
};
