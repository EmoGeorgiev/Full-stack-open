import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import { useEffect, useState } from 'react'

const App = () => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)


  useEffect(() => {
    personService.getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])
  
  const addPerson = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const id = persons.find(person => person.name === newName).id
        const newPerson = {name: newName, number: newNumber}
        personService.update(id, newPerson)
          .then(response => setPersons(persons.map(person => person.id !== id ? person : response)))
          .then(() => {
            setMessage(`Changed ${newName}'s number to ${newNumber}`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            setMessage(`Informaton of ${newName} has already been removed from the server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      } 
    } else {
      const newPerson = { name: newName, number: newNumber}
      personService.create(newPerson)
        .then(response => setPersons(persons.concat(response)))
        .then(() => {
          setMessage(`Added ${newName}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      setNewName('')
      setNewNumber('')
    } 
  }

  const removePerson = (id) => {
    if (window.confirm(`Delete ${persons.find(person => person.id === id).name}`)) {
      personService.remove(id)
        .then(response => setPersons(persons.filter(person => person.id !== response.id)))
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
      <Notification message={message} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
       newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} filterName={filterName} removePerson={removePerson} />
    </div>
  )
}

export default App