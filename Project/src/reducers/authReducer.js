import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
    access: AsyncStorage.getItem("access"),
    refresh: AsyncStorage.getItem("refresh"),
    isAuthenticated: true,
    user: 1,
}

export default function authReducer(state=initialState, action) {
    switch(action.type) {
        case "LOGIN":
            break;
        case "LOGOUT":
            break;
        default:
            return state;
    }
}