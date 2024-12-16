import { createSlice } from "@reduxjs/toolkit";

const bookMenuSlice = createSlice({
    name: "bookMenu",
    initialState: {
        selectedCategory: null,
        books: null,
    },
    reducers: {
        addBooks: (state, action) => {
            state.books = action.payload;
        },
        selectCategory: (state, action) => {
            state.selectedCategory = action.payload;
        },
        removeBook: (state, action) => {
            const bookId = action.payload;
            state.books = state.books.filter(item => item.BookId !== bookId);
        },
        clearBookMenu: (state, action) => {
            return null;
        }
    }   
});

export const { addBooks, removeBook, selectCategory, clearBookMenu } = bookMenuSlice.actions;

export default bookMenuSlice.reducer;