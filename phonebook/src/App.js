import {useState} from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas'}
    ])
    const [newName, setNewName] = useState('')

    const handleAddName = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName
        }
        setPersons(persons.concat(personObject))
        setNewName('')
    }

    const handleChangeName = (event) => {
        setNewName(event.target.value)
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
                    <button type="submit" onClick={handleAddName}>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => <div key={person.name}>{person.name}</div>)}
        </div>

    )
}

export default App