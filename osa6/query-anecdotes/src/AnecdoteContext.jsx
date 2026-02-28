import { createContext, useReducer } from 'react'

export const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      state = { show: true, payload: { msg: action.payload.msg } }
      // setTimeout(function() { 
      //   dispatch(notifChange(''))
      //   }, 5000)
      return state
    case 'HIDE':
      state = { show: false, payload: { msg: '' } }
      return state
    default:
      return state
  }
}

const AnecdoteContext = createContext()

export const AnecdoteContextProvider = (props) => {
  const [notification, notificationDispatch] 
    = useReducer(notificationReducer, { show: false, payload: { show: false, msg: '' } })

  return (
    <AnecdoteContext.Provider value={{ notification, notificationDispatch }}>
      {props.children}
    </AnecdoteContext.Provider>
  )
}

//const [notification, notificationDispatch] = useReducer(notificationReducer, 0)
//const AnecdoteContext = createContext()

export default AnecdoteContext