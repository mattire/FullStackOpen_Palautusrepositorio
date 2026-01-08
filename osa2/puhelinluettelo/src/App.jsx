import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'


const Filter  = ({newFilterTxt, filterTextChanged}) => { 
  return ( <div>
    filter shown with: <br/>
        <input 
            value    = {newFilterTxt}
            onChange = {filterTextChanged}
          />
    </div>)
  }

const PersonForm  = ({addNumber, newName, nameChanged, newNumber, numberChanged}) => { 
  return ( 
        <form onSubmit={addNumber}>
        <div> name: 
          <input 
            value={newName}
            onChange={nameChanged}
            />
        </div>
        <div>number: 
          <input 
            value={newNumber}
            onChange={numberChanged}
          /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons  = ({persons, newFilterTxt, deleteHandler}) => { 
  return <ul>
    {persons.filter(p=>p.name.toLowerCase().includes(newFilterTxt.toLowerCase())).map(
        p=><li key={p.id}>{p.name} {p.number} 
        <button accessKey='D' onClick={(e)=> { deleteHandler(p.id, p.name)}} >Delete</button> </li> 
      )}
  </ul>
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(()=>{
    personService.getAll().then(r => setPersons(r));
  }, [])

  const [newFilterTxt, setNewFilterTxt] = useState('')
  const [newName, setNewName]           = useState('new person')
  const [newNumber, setNewNumber]       = useState('000-0000000')

  const addNumber = (event) => {
    event.preventDefault()
    if(persons.some(p=>p.name===newName)){
      if(confirm(`${newName} is already added to phonebook, replase the old number with a new one?`) ){
        Update()
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      personService.create(newPerson).then((r)=>{
        setPersons(persons.concat(r));
        setNewName('new person')
        setNewNumber('000-0000000')
      }, (r)=> {console.log(r)})
    }
  }

  const Update = () => {
    var person = persons.find(p=>p.name===newName)
    const newPerson = { id: person.id, name: newName, number: newNumber }
    personService.update(person.id, newPerson).then(r=> {
      setPersons(persons.map(p => p.id !== person.id ? p : r))
    })
  }

  const filterTextChanged = (event) => {
    console.log(event.target.value)
    setNewFilterTxt(event.target.value)
  }
  const nameChanged = (event) => {
    setNewName(event.target.value)
  }
  const numberChanged = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const deleteHandler = (id, name)=>{
    console.log(id);
    if(confirm(`Delete ${name}?`)){
      personService.remove(id).then((r)=>{
        setPersons(persons.filter(p=>p.id!=id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilterTxt = {newFilterTxt} filterTextChanged = {filterTextChanged} />      
      <h3>Add a new</h3>
      <PersonForm
        addNumber     = {addNumber}
        newName       = {newName}
        nameChanged   = {nameChanged}
        newNumber     = {newNumber}
        numberChanged = {numberChanged}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} newFilterTxt={newFilterTxt} deleteHandler={ deleteHandler}/>
    </div>
  )

}

export default App