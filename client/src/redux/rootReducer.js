import postReducer from "./posts/postReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ posts: postReducer });

export default rootReducer;
