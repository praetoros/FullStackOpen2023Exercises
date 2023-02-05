import {useState} from 'react'

const App = () => {
    const [filter, setFilter] = useState('')
    const [persons, setPersons] = useState([
        {name: 'Arto Hellas', number: '040-123456', id: 1},
        {name: 'Ada Lovelace', number: '39-44-5323523', id: 2},
        {name: 'Dan Abramov', number: '12-43-234345', id: 3},
        {name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
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

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter}/>
            <NewContact newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}
                        handleAddPerson={handleAddPerson}/>
            <People persons={persons} filter={filter}/>
        </div>

    )
}

const Filter = ({filter, setFilter}) => {
    return (
        <div>
            <h3>Filter</h3>
            <div>
                Filter shown with:
                <input
                    value={filter}
                    onChange={event => setFilter(event.target.value)}
                />
            </div>
        </div>
    )
}

const NewContact = ({newName, setNewName, newNumber, setNewNumber, handleAddPerson}) => {
    return (
        <div>
            <h3>Add New Contact</h3>
            <form>
                <div>
                    name:
                    <input
                        value={newName}
                        onChange={event => setNewName(event.target.value)}
                    />
                </div>
                <div>
                    number:
                    <input
                        value={newNumber}
                        onChange={event => setNewNumber(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit" onClick={handleAddPerson}>add</button>
                </div>
            </form>
        </div>
    )
}

const People = ({persons, filter}) => {
    return (
        <div>
            <h3>People</h3>
            <div>
                {
                    persons.filter(person =>
                        person.name.toLowerCase().includes(filter.toLowerCase())
                    ).map(person =>
                        <div key={person.name}>{person.name} {person.number}</div>
                    )
                }
            </div>
        </div>

    )
}

export default App