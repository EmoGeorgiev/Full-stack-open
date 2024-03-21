import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ course }) => {
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={course.parts.map(part => part.exercises)} />
    </>
  )
}

export default Course