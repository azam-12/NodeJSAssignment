const connectDB = require("../config/database");
const {
  validateAddCategoryData,
  validateEditCategoryData,
} = require("../utils/validations");
const { DEFAULT_CATEGORY_IMG } = require("../utils/constants");

const fetchAllCategories = () => {
  return new Promise((resolve, reject) => {
    const query = "select * from categories";
    connectDB.query(query, (err, data) => {
      if (err) return reject(new Error("Error fetching categories."));
      resolve(data);
    });
  });
};

const fetchCategoryById = (catId) => {
  return new Promise((resolve, reject) => {
    const query = "select * from categories where CategoryId = ?";
    connectDB.query(query, [catId], (err, data) => {
      if (err) return reject(new Error("Error fetching category by ID."));
      resolve(data);
    });
  });
};

const createCategory = ({
  CategoryName,
  CategoryDescription,
  CategoryImage,
}) => {
  validateAddCategoryData(CategoryName, CategoryDescription);
  if (!CategoryImage) {
    CategoryImage = DEFAULT_CATEGORY_IMG;
  }

  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO categories (`CategoryName`, `CategoryDescription`, `CategoryImage`) VALUES (?)";
    const values = [CategoryName, CategoryDescription, CategoryImage];
    connectDB.query(query, [values], (err, data) => {
      if (err) return reject(new Error("Error creating category."));
      resolve(data);
    });
  });
};

const modifyCategory = (catId, req) => {
  const isAllowedEdit = validateEditCategoryData(req);
  const { CategoryDescription, CategoryImage } = req.body;
  if (!isAllowedEdit) {
    throw new Error("Invalid Category Edit Request!!!");
  }

  return new Promise((resolve, reject) => {
    const query = `UPDATE categories SET CategoryDescription = ?, CategoryImage = ?, 
            UpdatedAt = CURRENT_TIMESTAMP WHERE CategoryId = ?`;

    connectDB.query(
      query,
      [CategoryDescription, CategoryImage, catId],
      (err, data) => {
        if (err) return reject(new Error("Error updating category."));
        resolve(data);
      }
    );
  });
};

const removeCategory = (catId) => {
  return new Promise((resolve, reject ) => {
    const query = "delete from categories where CategoryId = ?";
    connectDB.query(query, [catId], (err, data) => {
      if (err) return reject(new Error("Error deleting category."));
      resolve(data);
    });
  });
};

module.exports = {
  fetchAllCategories,
  fetchCategoryById,
  createCategory,
  modifyCategory,
  removeCategory,
};
