import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    access: AsyncStorage.getItem("access"),
    refresh: AsyncStorage.getItem("refresh"),
    isAuthenticated: false,
    user: {pk: null, username: null},
}

export default function authReducer(state=initialState, action) {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            console.log("REDUCER CALLED!!");
            return {
                    access: action.data.access,
                    refresh: action.data.refresh,
                    user: action.data.user,
                    isAuthenticated: true,
                }
            ;
        case "LOGOUT":
            // TODO purge local data...

            // reset login state.
            return {
                access: "",
                refresh: "",
                isAuthenticated: false,
                user: {pk: null, username: null},
            }

        default:
            return state;
    }
}