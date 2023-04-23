const defaultState = {
    access: "",
    refresh: "",
    isAuthenticated: false,
    user: {pk: null, username: null},
}

export default function authReducer(state=defaultState, action) {
    switch(action.type) {
        case "LOGIN_SUCCESS":
            // set local login state...
            return {
                    access: action.data.access_token,
                    refresh: action.data.refresh_token,
                    user: action.data.user,
                    isAuthenticated: true,
                }
            ;
        case "LOGOUT":
            alert("You've been successfully logged out.");
            // reset login state.
            return {
                access: "",
                refresh: "",
                user: {pk: null, username: null},
                isAuthenticated: false,
            };

        case "LOGOUT_EXPIRED":
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