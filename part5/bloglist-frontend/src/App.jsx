import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState('')


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
      console.log(user.token)
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
            <input type="text" value={username} name="Username"
            onChange={({ target }) => setUsername(target.value)}/>
          </div>
          <div>
            password
            <input type="password" value={password} name="Password"
              onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    blogService
      .create(newBlog)
      .then(blog => {
        setBlogs(blogs.concat(blog))
        setMessage(`a new blog ${title} by ${author} added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setTitle('')
        setAuthor('')
        setUrl('')
      })
  }

  const createBlog = () => {
    return (
      <>  
        <h2>create new</h2>
        <form onSubmit={handleCreateBlog}>
          <div>
            title:
            <input 
            type="text" 
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input 
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input 
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </>
    )
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
      {createBlog()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  ) 
}

export default App