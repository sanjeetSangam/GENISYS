import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slice/post";

const store = configureStore({
	reducer: {
		post: postReducer,
	},
});

export default store;
