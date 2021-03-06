import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const [majority, setMajority] = useState(0)

  const handleVote = (selected) => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    if(newVotes[selected]>newVotes[majority]) {
      setMajority(selected)
    }
  } 
  

  return (
    <div>
      <h1> Anecdote of the day</h1>
      {props.anecdotes[selected]} <br />
      <i> has {votes[selected]} votes </i> <br />
      <button onClick = {() => handleVote(selected)}> vote </button>
      <button onClick={()=>setSelected(Math.floor(Math.random()*anecdotes.length))}> next anecdote </button> 

      <h1> Anecdote with most votes </h1>
      {props.anecdotes[majority]} <br />
      <i> has {votes[majority]} votes </i> <br /> 
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)