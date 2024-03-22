import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import { useEffect, useState } from 'react'


const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already in added to the phonebook`)
    } else {
      const newPerson = { name: newName, number: newNumber}
      personService.create()
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
      setNewName('')
      setNewNumber('')
    } 
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  } 

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
       newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} />
    </div>
  )
}

export default App