import { createSlice } from '@reduxjs/toolkit'

const notifSlice = createSlice({
  name: 'notif',
  //initialState: 'Initial notification',
  initialState: '',
  reducers: {
    notifChange(state, action) {
      //return action.payload.payload
      return action.payload
    }
  },
})

const { notifChange } = notifSlice.actions

export const showNotification = (msg) => {
    return async (dispatch) => { 
      console.log('msg');
      console.log(msg);  
      dispatch(notifChange(msg))
      setTimeout(function() { dispatch(notifChange(''))}, 5000)
    }  
}

//export const showAct = (content) => { return { type: "SHOW", payload: content } }
//export const hideAct = () =>        { return { type: "HIDE", payload: '' } }

//export const { notifChange } = notifSlice.actions
export default notifSlice.reducer
