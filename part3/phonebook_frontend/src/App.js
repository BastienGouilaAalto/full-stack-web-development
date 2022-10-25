import { useState, useEffect } from 'react'
import personService from './services/Communication'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonsForm from './components/PersonForm'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {setPersons(initialPersons)})
  }, [])

  const personsToShow = (newFilter === '')
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.filter(person => JSON.stringify(person.name) === JSON.stringify(personObject.name)).length > 0) {
      let id = persons.filter(person => JSON.stringify(person.name) === JSON.stringify(personObject.name))[0].id
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
        .update(id, personObject)
        .then(returnedPerson => {
          console.log(`Updated ${personObject.name}`)
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
          setErrorMessage([`Updated ${personObject.name}`, 'NOTIFICATION'])
          setTimeout(() => { setErrorMessage(null) }, 5000)
        })
        .catch(error => {
          console.log(error.message)
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage([`Information of ${newName} has already been removed from server`, 'ERROR'])
          setTimeout(() => { setErrorMessage(null) }, 5000)
        })
      }
    }
    else{
      personService
      .create(personObject)
      .then(returnedPersons => {
        console.log(`Added ${personObject.name}`)
        setPersons(persons.concat(returnedPersons))
        setNewName('')
        setNewNumber('')
        setErrorMessage([`Added ${personObject.name}`, 'NOTIFICATION'])
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
      .catch(error => {
        console.log(error.message)
        setPersons(persons.filter(person => person.name !== newName))
        setErrorMessage([`Information of ${newName} failed to be added to server`, 'ERROR'])
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
    }
  }

  const handleNameChange = (event) => {    
    //console.log(event.target.value)
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {    
    //console.log(event.target.value)
    setNewNumber(event.target.value)  
  }

  const handleFilterChange = (event) => {    
    //console.log(event.target.value)
    setnewFilter(event.target.value)  
  }

  const handleDeletePerson = (index) => {    
    if (window.confirm(`Delete ${persons[index].name}?`)) {
      personService
      .delete(persons[index].id)
      .then(returnedPersons => {
        console.log(`Deleted ${persons[index].name}`)
        setPersons(persons.filter(person => person.id !== persons[index].id))
        setErrorMessage([`Deleted ${persons[index].name}`, 'NOTIFICATION'])
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
      .catch(error => {
        console.log(error.message)
        setPersons(persons.filter(person => person.id !== persons[index].id))
        setErrorMessage([`Information of ${persons[index].name} has already been removed from server`, 'ERROR'])
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={errorMessage}/>
        <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
        <PersonsForm 
          newName={newName} handleNameChange={handleNameChange} 
          newNumber={newNumber} handleNumberChange={handleNumberChange} 
          addNewPerson={addNewPerson}/>
      <h3>Numbers</h3>
        <Persons persons={personsToShow} handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App