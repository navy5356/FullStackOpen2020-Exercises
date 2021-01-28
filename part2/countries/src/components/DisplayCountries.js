import Country from './Country'

const DisplayCountries = ({countries, handleShowClick}) => {
    // console.log("rendering this");
    // console.log(countries.length);

    if(countries.length>10) {
        return (<div> Too many matches, please make search query more specific</div>)
    }

    else if(countries.length===0) {
        return (
        <div> No matches found </div>)
    }

    else if(countries.length>1) {
        return (
            <div>
                <ul>
                    {countries.map(country => 
                        <div key={country.alpha3Code}> <li> {country.name} <button onClick={() => {handleShowClick(country)}}> Show Country </button> </li> </div>)}
                </ul>
            </div>
        )
    }

    else {
        return (
            <Country country={countries[0]} />
        )
    }
}

export default DisplayCountries