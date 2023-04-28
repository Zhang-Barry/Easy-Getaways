import { combineReducers } from "redux";
import authReducer from "./authReducer";
import itinReducer from "./itinReducer";
import placesReducer from "./placesReducer";

export default combineReducers(
    {
        auth: authReducer,
        itin: itinReducer,
        places: placesReducer,
    }
);
