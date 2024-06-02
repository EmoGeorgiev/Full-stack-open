import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async objectToUpdate => {
  const updatedAnecdote = { ...objectToUpdate, votes: objectToUpdate.votes + 1}
  const response = await axios.put(`${baseUrl}/${objectToUpdate.id}`, updatedAnecdote)
  return response.data
}

export default { getAll, createNew, update }