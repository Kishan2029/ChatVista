import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        value: false
    },
    reducers: {
        setLoader: (state, action) => {
            // console.log("action", action);
            state.value = action.payload
        },

    },
})

// Action creators are generated for each case reducer function
export const { setLoader } = loaderSlice.actions

export default loaderSlice.reducer