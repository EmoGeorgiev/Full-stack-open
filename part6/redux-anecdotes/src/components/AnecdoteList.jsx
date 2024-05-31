import { useSelector, useDispatch } from "react-redux"
import { voteForAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(({ filter, anecdotes }) => {
      return anecdotes.filter(anecdote => anecdote.content.includes(filter))
    })
    
    const vote = (id) => {
      dispatch(voteForAnecdote(id))
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
                  <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
              </div>
            )}
        </>
    )
}   

export default AnecdoteList