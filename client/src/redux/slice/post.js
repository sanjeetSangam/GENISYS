import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getPosts } from "../../routes/routes";

export const fetchPosts = createAsyncThunk("fetchPosts", async () => {
	const { data } = await axios.get(getPosts);
	return data;
});

const postSlice = createSlice({
	name: "post",
	initialState: {
		isLoading: false,
		posts: null,
		isError: false,
		errorMsg: null,
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchPosts.fulfilled, (state, action) => {
			state.isLoading = false;
			state.posts = action.payload;
		});
		builder.addCase(fetchPosts.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.errorMsg = action.payload;
			state.posts = null;
		});
	},
});

export default postSlice.reducer;
