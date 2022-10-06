import { useState } from 'react'

const Person = ({person}) => {
  return(
    <p>{person.name}</p>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  console.log(persons.length)

  const addNewPerson = (event) => {
    event.preventDefault()
    const personObject = {
      id: persons.length + 1,
      name: newName
    }

    if (persons.filter(person => JSON.stringify(person.name) === JSON.stringify(personObject.name)).length > 0) {
      alert(`${newName} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(personObject))
    }
    setNewName('')
  }

  const handleNameChange = (event) => {    
    //console.log(event.target.value)
    setNewName(event.target.value)  
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewPerson}>
          name: <input value={newName}
                        onChange={handleNameChange}
                />
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
          {persons.map(person => <Person key={person.id} person={person}/>)}
    </div>
  )
}

export default App