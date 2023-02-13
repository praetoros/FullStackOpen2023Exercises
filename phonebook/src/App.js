import {useState, useEffect} from 'react'
import phonebookService from './services/phonebook'
import './index.css'

const App = () => {
    const [filter, setFilter] = useState('')
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        phonebookService.getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const handleAddPerson = (event) => {
        event.preventDefault()
        let personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.find(person => person.name === newName)) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const personId = persons.find(person => person.name === newName).id
                phonebookService.update(personId, personObject)
                    .then(() => {
                        personObject = {...personObject, id: personId}
                        setPersons(persons.map(person => person.id !== personId ? person : personObject))
                    })
                setNewName('')
                setNewNumber('')
                setNotification(`Updated number for ${personObject.name}`)
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            }
            return
        }
        phonebookService.create(personObject)
            .then((data) => {
                personObject = {...personObject, id: data.id}
                setPersons(persons.concat(personObject))
            })
        setNewName('')
        setNewNumber('')
        setNotification(`Added ${personObject.name}`)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
    }

    const handleDelete = (id) => {
        if (window.confirm(`Delete ${persons.find(person => person.id === id).name}?`)) {
            phonebookService.remove(id)
                .then(() => {
                    setPersons(persons.filter(person => person.id !== id))
                });
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification}/>
            <Filter filter={filter} setFilter={setFilter}/>
            <NewContact newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}
                        handleAddPerson={handleAddPerson}/>
            <People persons={persons} filter={filter} handleDelete={handleDelete}/>
        </div>

    )
}

const Notification = ({message}) => {
    if (message === null) {
        return null
    }

    return (
        <div className='success'>
            {message}
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

const People = ({persons, filter, handleDelete}) => {

    return (
        <div>
            <h3>People</h3>
            <div>
                {
                    persons.filter(person =>
                        person.name.toLowerCase().includes(filter.toLowerCase())
                    ).map(person =>
                        <div key={person.id}>
                            {person.name} {person.number}
                            <button onClick={() => {
                                handleDelete(person.id)
                            }}>Delete
                            </button>
                        </div>
                    )
                }
            </div>
        </div>

    )
}

export default App