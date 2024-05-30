import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable '
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({username, password,})
      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return (
      <>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" data-testid='username' value={username} name="Username"
            onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password
            <input type="password" data-testid='password' value={password} name="Password"
              onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  const createBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()

    try {
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage(`new blog was not added`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async updatedBlog => {
    try {
      const newBlog = await blogService.update(updatedBlog)
      setBlogs(blogs.map(blog => blog.id !== newBlog.id ? blog : newBlog))
      setMessage(`Blog ${newBlog.title} was updated successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage(`Blog was not updated successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const removeBlog = async id => {
    try {
      await blogService.remove(id)
      setMessage(`Blog was removed successfully`)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage('Blog could not be removed')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const logOut = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message}/>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>
      <div>
        {user.name} logged in 
        <button type="submit" onClick={logOut}>logout</button>
      </div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={createBlog}/>
      </Togglable>
      {
        blogs.sort((a, b) => a.likes - b.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} username={user.username} updateBlog={updateBlog} removeBlog={removeBlog} />
              )
      }
    </div>
  ) 
}

export default App