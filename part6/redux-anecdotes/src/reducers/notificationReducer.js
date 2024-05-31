import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: '',
    reducers: {
        createNotification(state, action) {
            return action.payload
        },
        removeNotification(state) {
            return ''
        }
    }
})

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer