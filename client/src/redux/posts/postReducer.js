import { FETCH_POST_FAILURE, FETCH_POST_REQUEST, FETCH_POST_SUCCESS } from "./postTypes";

const initialPostState = {
	loading: false,
	data: [],
	error: "",
};

const postReducer = (state = initialPostState, action) => {
	switch (action.type) {
		case FETCH_POST_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_POST_SUCCESS:
			return {
				loading: false,
				data: action.payload,
				error: "",
			};
		case FETCH_POST_FAILURE:
			return {
				loading: false,
				data: [],
				error: action.payload,
			};

		default:
			return state;
	}
};

export default postReducer;
