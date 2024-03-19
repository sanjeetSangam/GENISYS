import { FETCH_POST_FAILURE, FETCH_POST_REQUEST, FETCH_POST_SUCCESS } from "./postTypes";

export const fetchPostsRequest = () => {
	return {
		type: FETCH_POST_REQUEST,
	};
};

export const fetchPostsSuccess = (posts) => {
	return {
		type: FETCH_POST_SUCCESS,
		payload: posts,
	};
};

export const fetchPostsFailure = (error) => {
	return {
		type: FETCH_POST_FAILURE,
		payload: error,
	};
};
