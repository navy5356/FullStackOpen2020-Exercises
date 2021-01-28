import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [ newSearch, setNewSearch ] = useState('')
  // const [selectedCountry, setSelectedCountry] = useState(false)
  // const [showCountry, setShowCountry] = useState(true)
  

  useEffect( () => {
    console.log("Fetching data from server")
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        console.log("Promise fulfilled")
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
    // setSelectedCountry("")
  }

  const handleShowClick = (country) => {
    console.log("Clicked", country.name)
    setNewSearch(country.name)
  }

  const filteredCountries = 
    newSearch===''?
      countries:
      countries.filter(
        country => country.name.toLowerCase().indexOf(
          newSearch.toLowerCase())!==-1);
  

    // console.log(filteredCountries.length);
    


  return (
    <div> 
      <Filter value = {newSearch} onChange = {handleSearchChange} />
      <br /> 
      {newSearch!=='' &&
        <DisplayCountries countries = {filteredCountries} handleShowClick={handleShowClick} />
      } 
    </div>
  )

}
export default App