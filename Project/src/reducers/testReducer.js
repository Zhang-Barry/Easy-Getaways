export default function testReducer(state=1, action) {
    switch(action.type) {
        case "INCREMENT":
            state = state + 1;
        case "DECREMENT":
            state = state - 1;
        default:
            return state;
    }
}