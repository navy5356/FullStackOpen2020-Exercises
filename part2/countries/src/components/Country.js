import Weather from './Weather'

const Country = ({country}) => {
console.log(country)
return (        
    <div> 
        <h2> {country.name} </h2>
        <b> Capital : </b> {country.capital}  <br />
        <b> Population : </b> {country.population} <br /> 
        <b> Languages : </b>
        <ul>
            {country.languages.map(language =>
                <li key = {language.iso639_1}> {language.name} </li>)}
        </ul>
        <br /> 
        <b> Flag : </b> <br />
        <img src={country.flag} alt={country.name + "Flag"} width="240" height="160" /> <br/> <br />
        <Weather city={country.capital} />

    </div>
)
}

export default Country