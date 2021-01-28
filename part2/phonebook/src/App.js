import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import DisplayPhonebook from './components/DisplayPhonebook'
import AddContact from './components/AddContact'
import contactservice from './services/contacts'


const Notification = ({message}) => {

  const generalStyle = {
      background: 'lightgrey',
      fontSize: 20,
      borderRadius:100,
      borderStyle : 'solid',
      padding : 10,
      marginBottom : 10
    }

  const successStyle = {
    ...generalStyle,
    color: 'green'
  }

  const errorStyle = {
    ...generalStyle,
    color: 'red'
  }

  if(message==null) {
    return null
  }
 
  return (
    <div style={message.success===1?successStyle:errorStyle}>
      {message.body}
    </div>
  )
}


const App = () => {
  
    const [ persons, setPersons ] = useState([])

    useEffect(() => {

      contactservice.getAll()
                    .then(initPersons => setPersons(initPersons))
                    .catch(() => alert("Error fetching phonebook from server, please refresh!"))
                    
  }, [])
  
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [ newSearch, setNewSearch ] = useState('')
    const [notif, setNotif] = useState(null)


    const startNotif = (message) => {
      // console.log("in startNotif");
      // console.log(message);
      console.log(notif);     
      setNotif(message)
      console.log(notif);
      setTimeout(() => {
        setNotif(null)
      }, 5000)
    }


    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }

    const addName = (event) => {
      event.preventDefault()

      const newContact = {
        name : newName,
        number : newNumber
      }     

      if(persons.some(person => person.name === newContact.name)) {
        if(window.confirm(`${newName} is already in the phonebook, overwrite contact details?`)) {
          const id = persons.find(p => p.name===newContact.name).id
          newContact.id=id
          contactservice.update(newContact)
                        .then(updatedContact => {

                          startNotif({
                            success: 1,
                            body: `Updated ${newName} succesfully`
                            })


                          setPersons(persons.map(p => p.id!==updatedContact.id ? p : updatedContact))
                        })
                        .catch(() => {
                          // alert("Could not update information, contact has been removed from server")
                          startNotif({
                            success:0,
                            body: "Could not update information, contact has been removed from server"
                          })
                        }
                        )
        }
      }
      else {  
        contactservice.create(newContact)
                      .then(returnedContact => 
                        {
                          startNotif( {
                            success : 1,
                            body : `Added ${newName} to phonebook!`
                          })
                          setPersons(persons.concat(returnedContact))})
                        .catch(() => {
                          setNotif({
                            success:0,
                            body : "Error adding contact to server, please try again!"
                          })
                        })
      }
    
      setNewNumber('')
      setNewName('')
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleDelete = (contact) => {
    if(window.confirm(`Delete ${contact.name}?`)) {
      contactservice.erase(contact.id)
                    .then(response => {
                      setPersons(persons.filter(p => p.id!==contact.id))
                    })
                    .catch(() => {
                      startNotif({
                      success:0,
                      body: "Error! Contact already erased from server! Refresh page to fetch current phonebook"
                      })
                    })
                  }
  }

  const filteredContacts = 
    newSearch===''?persons:persons.filter(person => person.name.toLowerCase().indexOf(newSearch.toLowerCase())!==-1)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notif} /> 
      <Filter value = {newSearch} onChange = {handleSearchChange}/>
      <br />
      <AddContact addName = {addName} newName = {newName} handleNameChange = {handleNameChange} newNumber={newNumber} handleNumberChange = {handleNumberChange} /> 
      <DisplayPhonebook contacts = {filteredContacts} handleDelete={handleDelete} />
    </div>
  )
}

export default App