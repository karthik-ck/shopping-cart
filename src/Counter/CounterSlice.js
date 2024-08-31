import { createSlice } from "@reduxjs/toolkit";

//create a slice
const CountetSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0
    },
    reducers: {
        increament: (state) => {
            state.count += 1
        },
        decreament: (state) => {
            state.count -= 1
        },
        increamentbyAmount: (state, action) => {
            state.count += action.payload
        }
    }
})

// export action
export const { increament, decreament, increamentbyAmount } = CountetSlice.actions;

// export reducer
export default CountetSlice.reducer;