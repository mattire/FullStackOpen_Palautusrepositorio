import { useSelector, useDispatch } from 'react-redux' 
//import { voteAnecdote } from '../reducers/anecdoteReducer' 
import { anecdoteVote } from '../reducers/anecdoteReducer' 
//import { filterChange } from '../reducers/filterReducer' 
import { notifChange } from '../reducers/notificationReducer'
//import {showAct, hideAct} from '../reducers/notificationReducer'

export const Anecdote = ({anecdote}) => { 
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    console.log('vote', anecdote.id)
    //dispatch(voteAnecdote(anecdote.id))
    dispatch(anecdoteVote(anecdote.id, anecdote))
    
    const notifMsg = `You voted for ${anecdote.content}`
    //dispatch(notifChange(showAct(notifMsg)))
    dispatch(notifChange(notifMsg))
    //setTimeout(function() { dispatch(notifChange(hideAct()))}, 5000)
    setTimeout(function() { dispatch(notifChange(''))}, 5000)
  }

  return (
    <div key={anecdote.id}>
    <div>{anecdote.content}</div>
    <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
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