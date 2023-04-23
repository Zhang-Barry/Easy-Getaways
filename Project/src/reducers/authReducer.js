import AsyncStorage from '@react-native-async-storage/async-storage';


const defaultState = {
    access: "",
    refresh: "",
    isAuthenticated: false,
    user: {pk: null, username: null},
}

_loadSaved = async () => {
    try {
        return await AsyncStorage.getItem(
            "auth"
        );
      } catch (error) {
        return defaultState
    }
}

const initialState = loadInitial()

export default function authReducer(state=_loadSaved(), action) {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            // TODO save to local data...

            // set local login state...
            return {
                    access: action.data.access,
                    refresh: action.data.refresh,
                    user: action.data.user,
                    isAuthenticated: true,
                }
            ;
        case "LOGOUT":
            alert("You've been successfully logged out.");
            // TODO purge local data...

            // reset login state.
            return {
                access: "",
                refresh: "",
                user: {pk: null, username: null},
                isAuthenticated: false,
            };

        case "LOGOUT_EXPIRED":
            // TODO purge local data...

            // reset login state.
            alert("Token expired. Please log in again.");
            return {
                access: "",
                refresh: "",
                user: {pk: null, username: null},
                isAuthenticated: false,
            };    

        default:
            return state;
    }
}