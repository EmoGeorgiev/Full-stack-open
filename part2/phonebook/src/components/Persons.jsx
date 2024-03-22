import Person from "./Person"

const Persons = ({ persons, filterName,  }) => {
    return (
      <ul>
        {persons
            .filter(person => person.name.toLowerCase().startsWith(filterName.toLowerCase()))
            .map(person => <Person key={person.name} name={person.name} number={person.number}/>)}
      </ul>
    )
}

export default Persons