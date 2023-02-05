import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {
            name: 'Arto Hellas',
            number: '040-123456'
        }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

    const handleAddPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.find(person => person.name === newName)) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }

    const handleChangeName = (event) => {
        setNewName(event.target.value)
    }

    const handleChangeNumber = (event) => {
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form>
                <div>
                    name:
                    <input
                        value={newName}
                        onChange={handleChangeName}
                    />
                </div>
                <div>
                    number:
                    <input
                        value={newNumber}
                        onChange={handleChangeNumber}
                    />
                </div>
                <div>
                    <button type="submit" onClick={handleAddPerson}>add</button>
                </div>
            </form>
            <h2>People</h2>
            {persons.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>

    )
}

export default App