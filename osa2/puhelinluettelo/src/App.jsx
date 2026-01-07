import { useState } from 'react'

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

const Persons  = ({persons, newFilterTxt}) => { 
  return <ul>
    {persons.filter(p=>p.name.toLowerCase().includes(newFilterTxt.toLowerCase())).map(p=><li>{p.name} {p.number}</li> )}
  </ul>
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-14489422' }
  ]) 
  const [newFilterTxt, setNewFilterTxt] = useState('')
  const [newName, setNewName]           = useState('new person')
  const [newNumber, setNewNumber]       = useState('000-0000000')

  const addNumber = (event) => {
    event.preventDefault()
    console.log(newName)
    console.log(newNumber)
    
    if(persons.some(p=>p.name===newName)){
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
  }

  const filterTextChanged = (event) => {
    console.log(event.target.value)
    setNewFilterTxt(event.target.value)
  }
  const nameChanged = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const numberChanged = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
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
      <Persons persons={persons} newFilterTxt={newFilterTxt} />
    </div>
  )

}

export default App