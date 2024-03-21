import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ name, parts }) => {
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total exercises={parts.map(part => part.exercises)} />
    </>
  )
}

export default Course