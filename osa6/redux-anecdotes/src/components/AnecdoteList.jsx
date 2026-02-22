import { useSelector, useDispatch } from 'react-redux' 
import { voteAnecdote } from '../reducers/anecdoteReducer' 

export const Anecdote = ({anecdote}) => { 
  const dispatch = useDispatch()

  const vote = id => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
  }

  return (
    <div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
    </div>
    </div>
  )
};

export const AnecdoteList = () => {  

  function compareAnects(a, b) {
    return b.votes - a.votes;
  }

  const anecdotes = useSelector(state => state) 
  
  return (
      <div>
          <h2>Anecdotes</h2>
          {anecdotes.sort(compareAnects).map(anecdote => (
            <Anecdote anecdote={anecdote}></Anecdote>
          ))}
      </div>
  )
};