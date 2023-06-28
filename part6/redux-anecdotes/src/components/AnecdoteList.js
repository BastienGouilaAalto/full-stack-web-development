import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {

    const anecdotes = useSelector(({ anecdotes, filter }) => {
      return anecdotes
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
    })

    const dispatch = useDispatch()
    
    const vote = (id) => {
      console.log('vote', id)
      dispatch(voteAnecdote(anecdotes.find(anecdote => anecdote.id === id)))
      dispatch(setNotification(`you voted '${anecdotes.find(anecdote => anecdote.id === id).content}'`))
      setTimeout(() => {
        dispatch(removeNotification())
      }
      , 5000)
    }

    return (
      <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        )}
      </div>
    )
}

export default AnecdoteList