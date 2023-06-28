import { useQuery, useMutation, useQueryClient } from 'react-query'
import React, { getAnecdotes, createAnecdote, updateAnecdote } from './requests/Communication.js'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote));
    },
  });
  
  const addNewAnecdote = (content) => {
    newAnecdoteMutation.mutate({ 
      content: content,
      id: Math.floor(Math.random() * 10000), 
      votes: 0 
    })
  }

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
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
    
      <Notification />
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
