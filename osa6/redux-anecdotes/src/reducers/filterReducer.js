import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  //initialState,
  initialState: '',
  reducers: {
    filterChange(state, action) {
      const content = action.payload
      state = content
      return state
    }
  },
})

//export const { filterChange: setFilter } = filterSlice.actions
export const { filterChange } = filterSlice.actions
export default filterSlice.reducer

// const filterReducer = (state = '', action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const filterChange = filterTxt => {
//   return {
//     type: 'SET_FILTER',
//     payload: filterTxt
//   }
// }

//export default filterReducer

