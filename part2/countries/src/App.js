import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [newFilter, setnewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('data received from server')
        setAllCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    const newValue = event.target.value
    setnewFilter(newValue)
    const countriesFilter= (newValue === '')
    ? allCountries 
    : allCountries.filter(country => country.name.common.toLowerCase().includes(newValue.toLowerCase()))
    setCountries(countriesFilter)
  }

  const handleShowButtonClick = (index) => {
    setCountries([countries[index]])
  }

  return (
    <div>
        <Filter filter={newFilter} handleFilterChange={handleFilterChange}/>
        <Countries countries={countries} handleShowButtonClick={handleShowButtonClick}/>
    </div>
  )
}

export default App