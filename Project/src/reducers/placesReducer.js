const defaultState = []

export default function placesReducer(state=defaultState, action) {
    switch(action.type) {
        case "GET_PLACES_FROM_SERVER":
            return [...action.data];
        case "PURGE_ALL_LOCAL_PLACES":
            return defaultState;
        default:
            return state;
    }
}