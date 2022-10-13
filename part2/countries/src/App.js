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
  
  const countriesToShow = (newFilter === '') 
  ? countries 
  : countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterChange = (event) => {
    setnewFilter(event.target.value)  
  }

  const handleShowButtonClick = (index) => {
    setnewFilter(countriesToShow[index].name.common)  
  }

  return (
    <div>
        <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
        <Countries countries={countriesToShow} handleShowButtonClick={handleShowButtonClick}/>
    </div>
  )
}

export default App