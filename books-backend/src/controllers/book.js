const connectDB = require("../config/database");
const { validateAddBookData, validateEditBookData } = require("../utils/validations");
const { DEFAULT_BOOK_IMG, DEFAULT_PUBLISHER, DEFAULT_ISBN } = require("../utils/constants");

const { fetchBookById, createBook, modifyBook, removeBook, fetchBooksOfCategory } = require("../services/bookService");


const getBooksOfCategory = async(req, res) => {
    try {
        const catId = parseInt(req.params.catId);
        const data = await fetchBooksOfCategory(catId, req);

        res.json(data);

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
}



const getBookData = async(req, res) => {
    try {
        const bookId = req.params.bookId;
        const data = await fetchBookById(bookId);
        res.json({ data });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
}


const addBook = async(req, res) => {
    try {
        const catId = parseInt(req.params.catId);
        const data = await createBook(catId, req);
        res.json({ message: "Book added Successfully!!!", data });
    } catch (err) {
        res.status(400).send("Error while creating book: " + err.message);
    }
}


const updateBook = async(req, res) => {
    try {
        const BookId = parseInt(req.params.bookId);
        await modifyBook(BookId, req);
        res.json({ message: "Book details updated successfully." });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
}


const deleteBook = async(req, res) => {
    try {
        const bookId = parseInt(req.params.bookId);
        await removeBook(bookId);
        res.json({ message: "Delete Successful!" });
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
}


module.exports = {
    getBooksOfCategory,
    getBookData,
    addBook,
    updateBook,
    deleteBook
}