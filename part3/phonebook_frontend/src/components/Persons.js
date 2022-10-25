const Person = ({person, handleDeletePerson}) => {
    return(
      <div>
        <>{person.name} {person.number} </>
        <button onClick={handleDeletePerson}>
          delete
        </button>
      </div>
    )
}

const Persons = ({persons, handleDeletePerson}) => {
    return(
      <div>
          {persons.map((person, index) => <Person 
            key={person.id} 
            person={person} 
            handleDeletePerson={() => handleDeletePerson(index)}
            />)}
      </div>
    )
  }

export default Persons