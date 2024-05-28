import { useState } from "react"

const Blog = ({ blog }) => {
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

  return(
    <div style={blogStyle}>
      <div style={hideDetails}>
        {blog.title} {blog.author} <button onClick={toggleDetails}>view</button>
      </div>
      <div style={showDetails}>
        <p>{blog.title} <button onClick={toggleDetails}>hide</button></p>
        <p>{blog.url}</p>
        <p>{blog.likes} <button>like</button></p>
        <p>{blog.author}</p>
      </div>
    </div>  
  )
}

export default Blog