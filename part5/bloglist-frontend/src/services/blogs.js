import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token},
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async newObject => {
 

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedBlog => {
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  return response.data
}

export default { getAll, create, update , setToken }