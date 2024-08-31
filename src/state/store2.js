import { configureStore } from "@reduxjs/toolkit";
import CounterSlice from "../Counter/CounterSlice";

// Create the redux store
const store2 = configureStore({
    reducer : {
        counter : CounterSlice
    }
})

export default store2