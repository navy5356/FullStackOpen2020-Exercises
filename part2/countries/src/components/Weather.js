import {useState, useEffect} from 'react'
import axios from 'axios'

const WEATHER_API = {
    key: process.env.REACT_APP_WEATHER_API_KEY,
    base: "http://api.weatherstack.com/current",
  };

const Weather = ({city}) => {
    const [weather, setWeather] = useState({});
    useEffect(() => {
        axios
          .get(
            `${WEATHER_API.base}?access_key=${
              WEATHER_API.key
            }&query=${city.toLowerCase()}`
          )
          .then((response) => {
            console.log("Weather response received!")  
            setWeather(response.data.current)}
            );
      }, []);
    

      console.log("KEY : ", WEATHER_API.key)
    return (
        <div>
        <h3> Weather in {city} : </h3>
        <b> Temperature : </b>  {weather.temperature} <br />
        <b> Wind : </b> {weather.wind_speed} mph, {weather.wind_dir}
        </div>
    )
}

export default Weather