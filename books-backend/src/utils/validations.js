
const validateAddCategoryData = (req) => {
    const { CategoryName, CategoryDescription, CategoryImage } = req.body;

    if(!CategoryName || !CategoryDescription){
        throw new Error("Category Name and Category Description are required feilds!");
    }
}

const validateEditCategoryData = (req) => {
    const allowedFields = ["CategoryDescription", "CategoryImage"];
    const isAllowedEdit = Object.keys(req.body).every((field) => allowedFields.includes(field));
    return isAllowedEdit;
}


const validateAddBookData = (req) => {
    const { Title, Author, Price, Quantity } = req.body;
    if(!Title || !Author || !Price || !Quantity){
        throw new Error("Title, Author, Price, Quantity are required fields!");
    }
}

const validateEditBookData = (req) => {
    const allowedFields = ["ISBN", "Year", "Publisher", "Language", "Description", "CoverImageUrl"];
    const isAllowedEdit = Object.keys(req.body).every((field) => allowedFields.includes(field));
    return isAllowedEdit;
}

module.exports = { 
    validateAddCategoryData,
    validateEditCategoryData,
    validateAddBookData,
    validateEditBookData
 }
