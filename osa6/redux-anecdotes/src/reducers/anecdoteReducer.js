import { createSlice } from '@reduxjs/toolkit'
import { current } from '@reduxjs/toolkit'

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
  initialState: initialState,
  reducers: {
    voteAnecdote(state, action) {
      try {
          console.log(action.payload);
          const anecdote = state.find(a => a.id === action.payload)
          //console.log(current(anecdote));
          const changedAnecdote = { ...anecdote, votes: anecdote.votes+1 }
          //const changedAnecdote = { ...anecdote, votes: 10 }
          console.log(changedAnecdote);
          return state.map(a => (a.id !== action.payload ? a : changedAnecdote))
      } catch (error) {
        console.log(error);        
      }    
    },
    createAnecdote(state, action) {
      const newState = state.concat(action.payload)
      return newState
    }
  }
})

export const { voteAnecdote, createAnecdote  } = anecdoteSlice.actions
export default anecdoteSlice.reducer



// const anecReducer = (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch (action.type) {
//     case 'VOTE':
//       const anecdote = state.find(a => a.id === action.payload.id)
//       const changedAnecdote = { ...anecdote, votes: anecdote.votes+1 }
//       return state.map(a => (a.id !== action.payload.id ? a : changedAnecdote))
//     case 'NEW_ANECDOTE':
//       const newState = state.concat(action.payload)
//       return newState
//     default: // jos ei mikään ylläolevista tullaan tänne
//       return state
//   }

//   return state
// }

// export const voteAnecdote = (anecdoteId) => {
//   return {
//     type: 'VOTE',
//     payload: {
//       id: anecdoteId
//     }
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }


// export default anecReducer
