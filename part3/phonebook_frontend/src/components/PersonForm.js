const PersonsForm = (props) => {
    return(
        <div>
            <form onSubmit={props.addNewPerson}>
                <div>name: <input value={props.newName} onChange={props.handleNameChange}/></div>
                <div>number: <input value={props.newNumber} onChange={props.handleNumberChange}/></div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}

export default PersonsForm