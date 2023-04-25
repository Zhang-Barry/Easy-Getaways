const defaultState = []

export default function itinReducer(state=defaultState, action) {
    switch(action.type) {
        case "GET_FROM_SERVER":
            return [...action.data].reverse();
        case "PURGE_ALL_LOCAL_ITIN":
            return defaultState;
        default:
            return state;
    }
}