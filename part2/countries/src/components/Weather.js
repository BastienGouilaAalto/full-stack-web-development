import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({city}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weatherInfo, setWeatherInfo] = useState([])
    const hookInfo = () => {
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`)
        .then(response => {
          setWeatherInfo(response.data)
        })
    }
    useEffect(hookInfo, [])
    console.log(weatherInfo)

    if(Object.keys(weatherInfo).length > 0){
        return(
            <div>
                <div><>temperature {Number((weatherInfo.main.temp - 273.15).toFixed(2))} Celsius</></div>
                <div><img 
                    src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
                    alt="icon"
                /></div>
                <div><>wind {weatherInfo.wind.speed} m/s</></div>
            </div>
        )
    }
    else{
        console.log("weather not received yet")
        return(
            <div>
            </div>
        )
    }
}

export default Weather