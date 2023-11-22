import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selected: false,
        messages: null,
        userInfo: null
    },
    reducers: {
        setChatValue: (state, action) => {

            state.messages = action.payload.messages,
                state.userInfo = action.payload.userInfo
        },
        setSelectedTrue: (state, action) => {
            state.selected = action.payload.selected
        }
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { setChatValue, setSelectedTrue } = chatSlice.actions

export default chatSlice.reducer