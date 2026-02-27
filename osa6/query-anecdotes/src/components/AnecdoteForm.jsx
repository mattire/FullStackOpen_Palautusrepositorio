//import { useQuery, useMutation } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {createAnecdote} from '../requests'


const getId = () => (100000 * Math.random()).toFixed(0)

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
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
