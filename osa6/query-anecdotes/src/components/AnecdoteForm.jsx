//import { useQuery, useMutation } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {createAnecdote} from '../requests'

import { useContext } from 'react'
import AnecdoteContext from '../AnecdoteContext'


const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const { notificationDispatch } = useContext(AnecdoteContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({ 
        type:'SHOW', 
        payload: { 
          show: true, 
          msg: `You created anecdote ${newAnecdote.content}` 
        } } )
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAne = {
      "content": content,
      "id": getId(),
      "votes": 0
    }
    newAnecdoteMutation.mutate(newAne)  
    //createAnecdote(newAne)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
