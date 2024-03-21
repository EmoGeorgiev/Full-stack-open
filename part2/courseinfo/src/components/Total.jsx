const Total = ({ exercises }) => {
    return (
        <p> 
            total of {exercises.reduce((acc, currentValue) => acc + currentValue, 0)} exercises
        </p>
    )
}

export default Total