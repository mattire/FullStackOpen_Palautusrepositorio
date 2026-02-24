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

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer

