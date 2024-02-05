import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        selected: false,
        messages: null,
        userInfo: null,
        userSelected: false,
        groupSelected: false,
        contactId: null
    },
    reducers: {
        setChatValue: (state, action) => {

            // state.messages = action.payload.messages,
            state.userInfo = action.payload.userInfo
        },
        setSelectedTrue: (state, action) => {
            state.selected = action.payload.selected
        },
        setUserSelectedTrue: (state, action) => {

            state.userSelected = action.payload.userSelected
        },
        setGroupSelectedTrue: (state, action) => {

            state.groupSelected = action.payload.groupSelected
        },
        setContactInfoId: (state, action) => {

            state.contactId = action.payload.contactId
        },
        // decrement: (state) => {
        //     state.value -= 1
        // },
        // incrementByAmount: (state, action) => {
        //     state.value += action.payload
        // },
    },
})

// Action creators are generated for each case reducer function
export const { setChatValue, setSelectedTrue, setGroupSelectedTrue, setUserSelectedTrue, setContactInfoId } = chatSlice.actions

export default chatSlice.reducer