import { createStore } from "redux";

const initialState = {
    count: 0
}

// Reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREAMENT':
            return { count: state.count + 1 }
        case 'DECREAMENT':
            return { count: state.count - 1 }
        default:
            return state;
    }
}

// create redux store
const store = createStore(counterReducer)

export default store