import { configureStore } from "@reduxjs/toolkit";
import categoryMenuReducer from "./categoryMenuSlice";
import bookMenuReducer from "./bookMenuSlice";
import categoryReducer from "./categorySlice";
import bookReducer from "./bookSlice";

const appStore = configureStore({
    reducer: {
        categoryMenu: categoryMenuReducer,
        bookMenu: bookMenuReducer,
        category: categoryReducer,
        book: bookReducer,
    }
});

export default appStore;