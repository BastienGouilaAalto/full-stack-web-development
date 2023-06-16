import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const blogFormRef = useRef()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage(['wrong username or password', 'ERROR'])
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">logout</button>
    </form>
  )

  const addNewBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(returnedBlog => {
        returnedBlog.user = user
        console.log(`Added: ${returnedBlog}`)
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage([`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'NOTIFICATION'])
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.message)
        console.log(error.response.data.error)
        setBlogs(blogs.filter(blog => blog.id !== blogObject.id))
        setErrorMessage([`information of ${blogObject.title} failed to be added to server`, 'ERROR'])
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      )
  }

  const updatedBlog = (updatedBlog) => {
    blogService.update(updatedBlog.id, updatedBlog)
      .then(returnedBlog => {
        returnedBlog.user = updatedBlog.user
        console.log(`Updated: ${returnedBlog}`)
        setBlogs(blogs.map(blog => blog.id !== returnedBlog.id ? blog : returnedBlog))
        setErrorMessage([`updated blog ${returnedBlog.title} by ${returnedBlog.author} updated`, 'NOTIFICATION'])
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.message)
        console.log(error.response.data.error)
        setErrorMessage([`information of ${updatedBlog.title} failed to be updated to server`, 'ERROR'])
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      )
  }

  const deleteBlog = (id) => {
    blogService.remove(id)
      .then(() => {
        console.log(`Deleted: ${id}`)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setErrorMessage([`blog ${id} succesfully deleted`, 'NOTIFICATION'])
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      .catch(error => {
        console.log(error.message)
        console.log(error.response.data.error)
        setErrorMessage([`blog ${id} failed to be deleted from server`, 'ERROR'])
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      )
  }

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}/>
      {user === null ?
        <Togglable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
          />
        </Togglable>
        :
        <div>
          <p>{user.name} logged in</p> {logoutForm()}
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addNewBlog} />
          </Togglable>
        </div>
      }
      {sortedBlogs.map(blog =>
        <Blog key=
          {blog.id}
        blog={blog}
        user={user}
        updateBlog={updatedBlog}
        deleteBlog={deleteBlog}
        />)}
    </div>
  )
}

export default App
