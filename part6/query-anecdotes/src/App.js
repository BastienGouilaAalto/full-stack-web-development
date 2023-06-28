import React, { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests/Communication.js'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { NotificationContext } from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()
  const { notification, setNotification } = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onError: (error) => {
      if (error.response.status === 400) {
        setNotification(error.response.data.error)
      }
      else {
        setNotification('Something went wrong')
      }
    },
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
      setNotification(`you created ${newAnecdote.content}`)
    },
  });
  
  const addNewAnecdote = (content) => {
    newAnecdoteMutation.mutate({ 
      content: content,
      id: `${Math.floor(Math.random() * 100000)}`, 
      votes: 0 
    })
  }

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onError: (error) => {
      setNotification('Something went wrong')
    },
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries('anecdotes')
      setNotification(`you voted ${updatedAnecdote.content}`)
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery('anecdotes', getAnecdotes, {
    refetchOnWindowFocus: false,
    retry: 1
  })

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification message={notification.message} />
      <AnecdoteForm createAnecdote={addNewAnecdote} />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
