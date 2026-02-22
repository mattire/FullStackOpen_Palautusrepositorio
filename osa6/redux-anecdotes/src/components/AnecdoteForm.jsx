import { useDispatch } from 'react-redux' 
import { createAnecdote } from '../reducers/anecdoteReducer' 

export const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const create = (event) => { 
    event.preventDefault()
    // console.log('event' , event.target)
    // console.log('event' , event.target.anecdoteContent.value)
    const content = event.target.anecdoteContent.value
    event.target.anecdoteContent.value = ''
    dispatch(createAnecdote(content))
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdoteContent" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}
