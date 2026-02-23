import { useSelector, useDispatch } from 'react-redux' 
import { voteAnecdote } from '../reducers/anecdoteReducer' 
//import { filterChange } from '../reducers/filterReducer' 

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
    //console.log(a, b);
    return b.votes - a.votes;
  }

  //const  { anecdotes, filter } = useSelector(state => state) 
  //const  state = useSelector(state => state) 
  const anecdotes = useSelector(state => state.anecdotes) 
  const filter = useSelector(state => state.filter) 
  console.log('anecdotes');
  console.log(anecdotes);
  //console.log(filter);

  //console.log('stuff');
  //console.log(stuff);

  return (
      <div>
          {
            anecdotes.slice().filter(a=>a.content.includes(filter))
            //anecdotes.slice()
                .sort(compareAnects)
                .map(anecdote => (
            <Anecdote key={anecdote.id} anecdote={anecdote}></Anecdote>
          ))}
      </div>
  )
};