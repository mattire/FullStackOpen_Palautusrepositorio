import { useSelector, useDispatch } from 'react-redux' 
import { voteAnecdote, createAnecdote } from './reducers/anecdoteReducer' 

const App = () => {
  
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  function compareAnects(a, b) {
    return b.votes - a.votes;
  }

  const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }
  const create = (event) => { 
    event.preventDefault()
    console.log('event' , event.target)
    console.log('event' , event.target.anecdoteContent.value)
    const content = event.target.anecdoteContent.value
    event.target.anecdoteContent.value = ''
    //console.log('sender', sender)
    dispatch(createAnecdote(content))
   };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort(compareAnects).map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <h2>create new</h2>
      <form onSubmit={create}>
        <div>
          <input name="anecdoteContent" />
        </div>
        <button>create</button>
        {/* <button onClick={(e) => { create(e)} }>create</button> */}
      </form>
    </div>
  )
}

export default App
