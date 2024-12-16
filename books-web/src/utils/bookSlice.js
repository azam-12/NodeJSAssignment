import { createSlice } from "@reduxjs/toolkit";

const bookSlice = createSlice({
    name: "bookSlice",
    initialState: null,
    reducers: {
        selectBook: (state, action) => {
            return action.payload;
        },
        removeSelectedBook: (state, action) => {
            return null;
        }
    }   
});

export const { selectBook, removeSelectedBook } = bookSlice.actions;

export default bookSlice.reducer;