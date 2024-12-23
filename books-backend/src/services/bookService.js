const connectDB = require("../config/database");
const { validateAddBookData, validateEditBookData } = require("../utils/validations");
const { DEFAULT_BOOK_IMG, DEFAULT_PUBLISHER, DEFAULT_ISBN } = require("../utils/constants");


const fetchBookById = (bookId) => {
    return new Promise((resolve, reject) => {
        const query = "select * from books where BookId = ?";
        connectDB.query(query, [bookId], (err, data) => {
            if(err) return reject(new Error("Error fetching book by ID."));
            resolve(data);
        });
    });
}

const createBook = (catId, req) => {
    validateAddBookData(req);
    return new Promise((resolve, reject) => {
        const { Title, Author, Price, Quantity } = req.body;
        const query = "INSERT INTO books (Title, Author, CategoryId, Price, Quantity) VALUES(?)";
        const values = [Title, Author, catId, Price, Quantity];
        connectDB.query(query, [values], (err, data) => {
            if(err) return reject(new Error("Error creating book."));
            resolve(data);
        });
    });
}


const modifyBook = (BookId, req) => {
    const isAllowedEdit = validateEditBookData(req);

    if(!isAllowedEdit){
        throw new Error("Invalid Edit operation!");
    }

    return (new Promise((resolve, reject) => {
        const { Year, Language, Description } = req.body;
        let { CoverImageUrl, ISBN, Publisher } = req.body;
        if(!CoverImageUrl || !ISBN || !Publisher){
            CoverImageUrl = DEFAULT_BOOK_IMG;
            Publisher = DEFAULT_PUBLISHER;
            ISBN = DEFAULT_ISBN;
        }
        const PublishedYear = parseInt(Year);
        const values = [ISBN, PublishedYear, Publisher, Language, Description, CoverImageUrl ];
        const query = "update books set `ISBN` = ?, `PublishedYear` = ?, `Publisher` = ?, `Language` = ?, `Description` = ?, `CoverImageUrl` = ?, UpdatedAt = CURRENT_TIMESTAMP where BookId = ?"; 
        connectDB.query(query, [...values, BookId], (err, data) => {
            if(err) return reject(new Error("Error updating book."));
            resolve(data);
        });
    }));
}


const removeBook = (bookId) => {
    return new Promise((resolve, reject) => {
        const q = `delete from books where BookId = ?`;
        connectDB.query(q, [bookId], (err, data) => {
            if(err) return reject(new Error("Error deleting book."));
            resolve(data);
        });
    });
}

const getTotalBooksOfCategory = (catId) => {
    return new Promise((resolve, reject) => {
        const q = `select count(*) as totalRecords from books where CategoryId = ?`;
        connectDB.query(q, [catId], async(err, results) => {
            if(err) return res.json({ message: "Faile to get the total number of records", data: err });
            resolve(results[0].totalRecords);
        });
    });
}


const fetchBooksOfCategory = async(catId, req) => {

    return new Promise(async(resolve, reject) => {
        const direction = req.query.direction;
        let pageNumber = parseInt(req.query.page) || 1;
        const titleCursor = req.query.titleCursor || '';
        const bookIdCursor = parseInt(req.query.bookIdCursor) || '';
        let limit = parseInt(req.query.limit) || 8;
        limit > 8 ? 8 : limit;
        let query, queryParams;
    
        const totalRecords = await getTotalBooksOfCategory(catId);
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
            if(err) return reject(new Error("Failed to get books for clicked category!"));

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

            let data = { 
                records: results,
                page: pageNumber, 
                nextCursor: nextCursorValue, 
                prevCursor: prevCursorValue,
                limit: limit
            }
            
            resolve(data);
        });
    });
}


module.exports = {
    fetchBookById,
    createBook,
    modifyBook,
    removeBook,
    fetchBooksOfCategory
}