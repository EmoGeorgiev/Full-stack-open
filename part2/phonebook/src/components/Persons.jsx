import Person from "./Person"

const Persons = ({ persons, filterName, removePerson }) => {
    return (
      <ul>
        {persons
            .filter(person => person.name.toLowerCase().startsWith(filterName.toLowerCase()))
            .map(person => <Person key={person.name} id={person.id} name={person.name}
             number={person.number} removePerson={removePerson}/>)}
      </ul>
    )
}

export default Persons