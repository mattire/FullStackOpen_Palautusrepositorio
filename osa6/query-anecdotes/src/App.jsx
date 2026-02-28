import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {getAnecdotes, updateAnecdote} from './requests'

import { useContext } from 'react'
import AnecdoteContext from './AnecdoteContext'



import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


const App = () => {

  const { notificationDispatch } = useContext(AnecdoteContext)

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 3
  })

  const queryClient = useQueryClient()

  const voteAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      console.log(anecdote);
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const modAnecdotes = anecdotes.map(a=>a.id != anecdote.id ? a : anecdote)
      queryClient.setQueryData(['anecdotes'], modAnecdotes)
    },
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    const modAne = {
      "content": anecdote.content,
      "id": anecdote.id,
      "votes": anecdote.votes + 1
    }
    voteAnecdoteMutation.mutate(modAne)
    notificationDispatch({ type:'SHOW', payload: { show: true, msg: `you voted for ${anecdote.content}` } })
  }

  console.log(JSON.parse(JSON.stringify(result)))

  

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  if (result.isLoading) {
    return <div>loading data...</div>
  }
 
  const anecdotes = result.data

  //const [notification, notificationDispatch] = useReducer(notificationReducer, 0)

  return (
    <div>
      <h3>Anecdote app</h3>


      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
