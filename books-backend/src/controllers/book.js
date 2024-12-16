const connectDB = require("../config/database");
const { validateAddBookData, validateEditBookData } = require("../utils/validations");
const { DEFAULT_BOOK_IMG, DEFAULT_PUBLISHER, DEFAULT_ISBN } = require("../utils/constants");



const getTotalRecords = (catId) => {
    return new Promise((resolve, reject) => {
        const q = `select count(*) as totalRecords from books where CategoryId = ?`;
        connectDB.query(q, [catId], async(err, results) => {
            if(err) return res.json({ message: "Faile to get the total number of records", data: err });
            resolve(results[0].totalRecords);
        });
    });
}


const getBooksOfCategory = async(req, res) => {
    try {
        const catId = parseInt(req.params.catId);
        const direction = req.query.direction;
        let pageNumber = parseInt(req.query.page) || 1;
        const titleCursor = req.query.titleCursor || '';
        const bookIdCursor = parseInt(req.query.bookIdCursor) || '';
        let limit = parseInt(req.query.limit) || 8;
        limit > 8 ? 8 : limit;
        let query, queryParams;

        const totalRecords = await getTotalRecords(catId);
        const totalPages = Math.ceil(totalRecords / limit);

        if(titleCursor && bookIdCursor){
            if(direction === "next"){
                query = `select books.BookId, books.Title, books.Author, books.CategoryId, books.ISBN, books.PublishedYear, books.Price, books.Quantity, 
                    books.Publisher, books.Language, books.Description, books.CoverImageUrl, categories.CategoryName 
                    from books inner join categories on books.CategoryId = categories.CategoryId 
                    where books.CategoryId = ? and (books.Title > ? or (books.Title = ? and books.BookId > ?)) 
                    order by books.Title, books.BookId limit ?`;
                pageNumber++;    
            }else if (direction === 'prev') {
                query = `select books.BookId, books.Title, books.Author, books.CategoryId, books.ISBN, books.PublishedYear, books.Price, books.Quantity, 
                    books.Publisher, books.Language, books.Description, books.CoverImageUrl, categories.CategoryName 
                    from books 
                    inner join categories on books.CategoryId = categories.CategoryId 
                    where books.CategoryId = ? and (books.Title < ? or (books.Title = ? and books.BookId < ?)) 
                    order by books.Title desc, books.BookId desc limit ?`;
                pageNumber--;
            }

            queryParams = [catId, titleCursor, titleCursor, bookIdCursor ];

        }else{
            query = `select books.BookId, books.Title, books.Author, books.CategoryId, books.ISBN, books.PublishedYear, books.Price, books.Quantity, 
                books.Publisher, books.Language, books.Description, books.CoverImageUrl, categories.CategoryName 
                from books inner join categories on books.CategoryId = categories.CategoryId 
                where books.CategoryId = ? 
                order by books.Title, books.BookId 
                limit ?`;
            queryParams = [catId];
        }

        connectDB.query(query, [...queryParams, limit], (err, results) => {
            if(err) return res.json({ message: "Failed to get books for clicked category!", data: err });

            if (direction === "prev") {
                results.reverse();
            }

            let nextCursorValue = null;
            if(pageNumber < totalPages){
                const lastRecord = results[results.length - 1];
                nextCursorValue = { titleCursor: lastRecord.Title, bookIdCursor: lastRecord.BookId };
            }
            
            let prevCursorValue = null;
            if(pageNumber !== 1){
                const firstRecord = results[0];
                prevCursorValue = { titleCursor: firstRecord.Title, bookIdCursor: firstRecord.BookId };
            }

            res.json({ 
                records: results,
                page: pageNumber, 
                nextCursor: nextCursorValue, 
                prevCursor: prevCursorValue,
                limit: limit
            });
        });

    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
}



const getBookData = async(req, res) => {
    try {
        const bookId = req.params.bookId;
        const q = `select * from books where BookId = ?`

        connectDB.query(q, [bookId], (err, data) => {
            if(err) return res.json({ message: "Failed to get the book details!", data: err });
            res.json({ message: "Book Data read successfully!!!", data });
        });
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
}


const addBook = async(req, res) => {
    try {
        const catId = parseInt(req.params.catId);
        validateAddBookData(req);
        const { Title, Author, Price, Quantity } = req.body;
        const q = "INSERT INTO books (Title, Author, CategoryId, Price, Quantity) VALUES(?)";
        const values = [Title, Author, catId, Price, Quantity];

        connectDB.query(q, [values], (err, data) => {
            if(err) return res.json({ message: "Failet to add the book!", data: err });
            res.json({ message: "Book added Successfully!!!" });
        });

    } catch (err) {
        res.status(400).send("Error while creating book: " + err.message + "\n");
    }
}


const updateBook = async(req, res) => {
    try {
        const BookId = parseInt(req.params.bookId);
        const isAllowedEdit = validateEditBookData(req);

        if(!isAllowedEdit){
            throw new Error("Invalid Edit operation!");
        }

        const { Year, Language, Description } = req.body;
        let { CoverImageUrl, ISBN, Publisher } = req.body;
        if(!CoverImageUrl || !ISBN || !Publisher){
            CoverImageUrl = DEFAULT_BOOK_IMG;
            Publisher = DEFAULT_PUBLISHER;
            ISBN = DEFAULT_ISBN;
        }
        const PublishedYear = parseInt(Year);
        const values = [ISBN, PublishedYear, Publisher, Language, Description, CoverImageUrl ];

        const q = "update books set `ISBN` = ?, `PublishedYear` = ?, `Publisher` = ?, `Language` = ?, `Description` = ?, `CoverImageUrl` = ?, UpdatedAt = CURRENT_TIMESTAMP where BookId = ?"; 

        connectDB.query(q, [...values, BookId], (err, data) => {
            if(err) return res.json({ message: "Failed to update the book!", data: err });
            res.json({ message: "Book details updated successfully!" })
        });

    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
}


const deleteBook = async(req, res) => {
    try {
        const bookId = parseInt(req.params.bookId);
        const q = `delete from books where BookId = ?`;
        
        connectDB.query(q, [bookId], (err, data) => {
            if(err) return res.json({ message: "Failed to delete!", data: err});
            res.json({ message: "Delete Successful!" });
        });

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