import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  //initialState: initialState,
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      try {
          const anecdote = state.find(a => a.id === action.payload)
          const changedAnecdote = { ...anecdote, votes: anecdote.votes+1 }
          // console.log(changedAnecdote);
          return state.map(a => (a.id !== action.payload ? a : changedAnecdote))
      } catch (error) {
        console.log(error);        
      }    
    },
    // createAnecdote(state, action) {
    //   console.log(action);
      
    //   const newState = state.concat({
    //       content: action.payload,
    //       id: getId(),
    //       votes: 0
    //     })
    //   return newState
    // },
    setAnecdotes(state, action) {
      console.log(action);      
      return action.payload
    },
    addAnecdote(state, action) {
      state.push(action.payload);      
    },
    updateAnecdote(state, action) {
      const anecdote = action.payload
      // console.log('action.payload');
      // console.log(action.payload);
      return state.map(a => (a.id !== action.payload.id ? a : anecdote))
    },

  }
})

const { setAnecdotes, addAnecdote, updateAnecdote, createAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  console.log('createNewAnecdote');
  console.log(content);
  
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    console.log('anecdote');
    console.log(anecdote);  
    dispatch(addAnecdote(anecdote))
  }
}

export const anecdoteVote = (id, anecdote) => {
  console.log('anecdoteVote');
  const updatedAnecdote = {
    'id' : anecdote.id,
    'content': anecdote.content,
    'votes': anecdote.votes + 1
  }
  return async (dispatch) => {
    const resp = await anecdoteService.update(id, updatedAnecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}


//export const { voteAnecdote, createAnecdote, setAnecdotes2  } = anecdoteSlice.actions
export const { voteAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer



