import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setnewFilter] = useState('')

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('data received from server')
        setCountries(response.data)
      })
  } 
  useEffect(hook, [])

  console.log(countries.length)

  const countriesToShow = (newFilter === '') 
  ? countries 
  : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterChange = (event) => {    
    //console.log(event.target.value)
    setnewFilter(event.target.value)  
  }

  return (
    <div>
        <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
        <Countries countries={countriesToShow}/>
    </div>
  )
}

export default App