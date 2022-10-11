import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonsForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('data received from server')
        setPersons(response.data)
      })
  } 
  useEffect(hook, [])

  const personsToShow = (newFilter === '') 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    if (persons.filter(person => JSON.stringify(person.name) === JSON.stringify(personObject.name)).length > 0) {
      alert(`${newName} is already added to phonebook`)
    }
    else if(persons.filter(person => JSON.stringify(person.number) === JSON.stringify(personObject.number)).length > 0){
      alert(`${newNumber} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
        <PersonsForm 
          newName={newName} handleNameChange={handleNameChange} 
          newNumber={newNumber} handleNumberChange={handleNumberChange} 
          addNewPerson={addNewPerson}/>
      <h3>Numbers</h3>
        <Persons persons={personsToShow}/>
    </div>
  )
}

export default App