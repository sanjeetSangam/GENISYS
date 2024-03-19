import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";

const store = configureStore({ rootReducer });
