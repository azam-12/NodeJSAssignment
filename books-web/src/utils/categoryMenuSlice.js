import { createSlice } from "@reduxjs/toolkit";

const categoryMenuSlice = createSlice({
    name: "categoryMenu",
    initialState: null,
    reducers: {
        addCategoryMenu: (state, action) => {
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

export const { addCategoryMenu } = categoryMenuSlice.actions;

export default categoryMenuSlice.reducer;