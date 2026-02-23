import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notif',
  initialState: 'Initial notification',
  reducers: {
    notifChange(state, action) {
      const content = action.payload
      state = content
      return state
    }
  },
})

export const { notifChange } = notifSlice.actions
export default notifSlice.reducer
