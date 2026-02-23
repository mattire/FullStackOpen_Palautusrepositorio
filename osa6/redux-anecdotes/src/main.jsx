import ReactDOM from 'react-dom/client'
//import { createStore } from 'redux'
//import { createStore, combineReducers } from 'redux'

import { Provider } from 'react-redux'


import App from './App'
import store from './store'
// import anecReducer from './reducers/anecdoteReducer'
// import filterRed from './reducers/filterReducer'

// const reducer = combineReducers({
//     anecdotes: anecReducer, 
//     filter: filterRed
//   }
// )
// const store = createStore(reducer)

//const store = createStore(anecReducer)
//const store = createStore(reducer)

console.log(store.getState())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <div/> */}
    <App />
  </Provider>
)
