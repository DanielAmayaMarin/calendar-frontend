import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers:{
        onOpenDateModal: (state) => {
            state.isDateModalOpen = !state.isDateModalOpen
        },
        
    },
})

export const {onOpenDateModal} = uiSlice.actions
