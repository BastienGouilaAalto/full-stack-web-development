import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newUrl, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
            title:
          <input
            type="text"
            value={newTitle}
            onChange={({ target }) => setTitle(target.value)}
            id='title-input'
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={newAuthor}
            onChange={({ target }) => setAuthor(target.value)}
            id='author-input'
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={newUrl}
            onChange={({ target }) => setUrl(target.value)}
            id='url-input'
          />
        </div>
        <button type="submit" id='submit-button'>create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
