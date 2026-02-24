import { useDispatch } from 'react-redux' 
import { createAnecdote } from '../reducers/anecdoteReducer' 
import { notifChange } from '../reducers/notificationReducer'
//import {showAct, hideAct} from '../reducers/notificationReducer'


export const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const create = (event) => { 
    event.preventDefault()
    const content = event.target.anecdoteContent.value
    event.target.anecdoteContent.value = ''
    dispatch(createAnecdote(content))

    const notifMsg = `You created anecdote ${content}`
    //dispatch(notifChange(showAct(notifMsg)))
    dispatch(notifChange(notifMsg))
    //setTimeout(function() { dispatch(notifChange(hideAct()))}, 5000)
    setTimeout(function() { dispatch(notifChange(''))}, 5000)
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
