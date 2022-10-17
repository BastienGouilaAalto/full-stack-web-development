import Weather from "./Weather"

const Country = ({country, displayFullInfo, handleShowButtonClick}) => {
    if(displayFullInfo)
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
            <h2>Weather in {country.capital}</h2>
            <Weather city={country.capital}/>
        </div>
        )
    }
    else{
        return(
        <div>
            <>{country.name.common}</>
            <button onClick={handleShowButtonClick}>
                show
            </button>
        </div>
        )
    }
}

const Countries = ({countries, handleShowButtonClick}) => {
    if(countries.length > 10 || countries.length < 1){
        return(
            <div>
                <>Too many matches, specify another filter</>
            </div>
        )
    }
    else if(countries.length <= 10 && countries.length > 1){
        return(
            <div>
                {countries.map((country, index) => <Country 
                    key={index} 
                    country={country} 
                    displayFullInfo={false} 
                    handleShowButtonClick={() => handleShowButtonClick(index)}/>)}
            </div>
        )
    }
    else if(countries.length === 1)
    {
        return(
            <div>
                <Country displayFullInfo={true} country={countries[0]}/>
            </div>
        )
    }
}

export default Countries