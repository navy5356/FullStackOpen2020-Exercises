const AddContact = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
return (
    <div>
        <h2> Add new Contact </h2>
        <form onSubmit={addName}>
            <div>
            Name: <input value = {newName} onChange={handleNameChange}/>
            </div>
            <div>
            Number: <input value = {newNumber} onChange = {handleNumberChange}/>
            </div>
            <div>
            <button type="submit">Add</button>
            </div>
        </form>
    </div>
      )}
export default AddContact