import { useState } from 'react'

const Button = (props) => {
  return (
      <button onClick={props.onClick}>
        {props.text}
      </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  
  let initPoints = new Array(anecdotes.length).fill(0)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initPoints)
  
  const nextAnecdote = () => {
    let next = Math.floor((Math.random() * (anecdotes.length)))
    console.log(next)
    setSelected(next)
  }

  const voteAnecdote = (incrementIndex) =>{
    let copy = [...votes]
    copy[incrementIndex] += 1
    setVotes(copy)
  }

  console.log(votes)

  return (
    <div>
      <h2>
        Anecdote of the day
      </h2>
        <p>{anecdotes[selected]}</p>
        <p>has {votes[selected]} votes</p>
        <Button
          onClick={() => voteAnecdote(selected)}        
          text='vote'
          />
        <Button
            onClick={() => nextAnecdote()}        
            text='next anecdote'
          />
      <h2>
        Anecdote with most votes
      </h2>
        <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
        <p>has {Math.max(...votes)} votes</p>
    </div>
  )
}

export default App