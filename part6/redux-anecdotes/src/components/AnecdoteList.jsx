import { useSelector, useDispatch } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { createNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })
    
    const vote = (anecdote) => {
      dispatch(addVote(anecdote))
      
      dispatch(createNotification(`you voted ${anecdote.content}`, 5))
    }

    return (
        <>
            {anecdotes
            .sort((a, b) => a.votes - b.votes)
            .map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
                </div>
              </div>
            )}
        </>
    )
}   

export default AnecdoteList