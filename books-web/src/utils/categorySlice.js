import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: null,
    reducers: {
        addCategory: (state, action) => {
            return action.payload;
        },
        clearCategory: (state, action) => {
            return null;
        },
        filterCategory: (state, action) => {
            const categoryId = action.payload;
            return state.filter(item => item.CategoryId === categoryId );
        }
    }
});

export const { addCategory, clearCategory, filterCategory } = categorySlice.actions;

export default categorySlice.reducer;