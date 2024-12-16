const express = require("express");
const bookRouter = express.Router();
const { getBooksOfCategory, getBookData, addBook, updateBook, deleteBook } = require("../controllers/book");


bookRouter.get("/category/books/:catId", getBooksOfCategory);

bookRouter.get("/category/book/:bookId", getBookData);

bookRouter.post("/category/addbooks/:catId", addBook);

bookRouter.post("/category/editbooks/:bookId", updateBook);

bookRouter.delete("/category/books/:bookId", deleteBook);


module.exports = bookRouter;
