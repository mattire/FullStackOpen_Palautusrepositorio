import { useSelector, useDispatch } from 'react-redux' 

import { filterChange } from '../reducers/filterReducer' 

const Filter = () => {
  const dispatch = useDispatch()
  const handleChange = (event) => {
    dispatch(filterChange(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  const filterTxt = useSelector(state => state.filter) 
  
  return (
    <div style={style}>
      filter <input onChange={handleChange} value = {filterTxt}/>
    </div>
  )
}

export default Filter