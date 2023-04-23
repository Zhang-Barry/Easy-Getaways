import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itinReducer from "./itinReducer";

export default combineReducers(
    {
        auth: authReducer,
        itin: itinReducer,
    }
);
