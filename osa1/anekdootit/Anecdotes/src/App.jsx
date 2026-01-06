import { act, useState } from 'react'

const Button = ({content, onClick}) => <button onClick={onClick}>{content}</button>

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
  'The only way to go fast, is to go well.'
]

function App() {
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))


  const NextAnectDote = () =>{
    const nextAD = Math.floor(Math.random() * anecdotes.length);
    setSelected(nextAD)
  }
  const Vote = () =>{
    console.log(selected)
    console.log(votes)
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  const AnecdoteWithMaxVotes = () => {
    const maxVal = Math.max(...votes)
    
    const ind = votes.indexOf(maxVal)
    return [ind,maxVal]
  }

  const [maxAnecInd, maxCount] = AnecdoteWithMaxVotes()
  var maxAn = anecdotes[maxAnecInd]
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <br/>
      {anecdotes[selected]}
      <br/>
      <p>has {votes[selected]} votes</p>
      <Button content="Vote"          onClick={()=> Vote()}/>
      <Button content="Next anecdote" onClick={()=> NextAnectDote()}/>
      <h1>Anecdote with most votes!!</h1>
      <p>{maxAn}</p>
      <p>{maxCount}</p>
    </div>
  )}

export default App
