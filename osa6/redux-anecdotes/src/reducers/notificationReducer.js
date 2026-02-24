import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notif',
  //initialState: 'Initial notification',
  initialState: '',
  reducers: {
    notifChange(state, action) {
      return action.payload.payload
    }
  },
})

export const showAct = (content) => { return { type: "SHOW", payload: content } }
export const hideAct = () =>        { return { type: "HIDE", payload: '' } }

export const { notifChange } = notifSlice.actions
export default notifSlice.reducer
