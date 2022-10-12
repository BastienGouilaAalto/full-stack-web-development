import { useState } from 'react'

const Country = ({displayFullInfo, country}) => {
    const [fullInfo, setFullInfo] = useState(displayFullInfo)

    const handleShowButtonClick = () => 
    {
        setFullInfo(true)
    }

    if(fullInfo)
    {
        return(
        <div>
            <h1>{country.name.common}</h1>
            <div><>capital {country.capital}</></div>
            <div><>area {country.area}</></div>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map((language, i) => <li key={i}>{language}</li>)}
            </ul>
            <img 
                src={Object.values(country.flags)[0]}
                alt="flag"
            />
        </div>
        )
    }
    else{
        return(
        <div>
            <>{country.name.common}</>
            <button onClick={() => handleShowButtonClick()}>
                show
            </button>
        </div>
        )
    }
}

const Countries = ({countries}) => {
    if(countries.length === 1)
    {
        return(
            <div>
                <Country displayFullInfo={true} country={countries[0]}/>
            </div>
        )
    }
    else if(countries.length <= 10){
        return(
            <div>
                {countries.map(country => <Country key={country.ccn3} displayFullInfo={false} country={country}/>)}
            </div>
        )
    }
    else if(countries.length > 10){
        return(
            <div>
                <>Too many matches, specify another filter</>
            </div>
        )
    }
}

export default Countries