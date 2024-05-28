import { useState } from "react"
import PropTypes from 'prop-types'

const Blog = ({ blog, username, updateBlog, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  const [details, setDetails] = useState(false)

  const hideDetails = { display: details ? 'none' : '' }
  const showDetails = { display: details ? '' : 'none' }

  const toggleDetails = () => {
    setDetails(!details)
  }

  const updateLikes = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    updateBlog(newBlog)
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return(
    <div style={blogStyle}>
      <div style={hideDetails}>
        {blog.title} {blog.author} <button onClick={toggleDetails}>view</button>
      </div>
      <div style={showDetails}>
        <p>{blog.title} <button onClick={toggleDetails}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={updateLikes}>like</button></p>
        <p>{blog.author}</p>
        {blog.user.username === username && <p><button onClick={deleteBlog}>remove</button></p>}
      </div>
    </div>  
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog