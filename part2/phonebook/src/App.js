import { useState } from 'react'

const Person = ({person}) => {
  return(
    <p>{person.name} {person.number}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setnewFilter] = useState('')

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
      <form onSubmit={addNewPerson}>
          <div>filter shown with: <input value={newFilter} onChange={handleFilterChange}/></div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addNewPerson}>
          <div>name: <input value={newName} onChange={handleNameChange}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
          <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
          {
            personsToShow.map(person => <Person key={person.id} person={person}/>)}
    </div>
  )
}

export default App