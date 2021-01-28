import Person from './Person'

const DisplayPhonebook = ({contacts, handleDelete}) => {
    return(
    <div>
    <h2>Numbers</h2>
      {contacts.map(person => {
        return (
        <div key={person.id}>
        <Person person={person} /> 
        <button onClick={()=>{handleDelete(person)}}> Delete </button>
        </div>
        )
      }
        )}
    </div>
    )}

export default DisplayPhonebook
