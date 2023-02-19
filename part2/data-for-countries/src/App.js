import React, {useEffect} from 'react';
import countries from "./services/countries";
import openWeather from "./services/weather";


function App() {
    const [countriesList, setCountriesList] = React.useState([]);
    const [filter, setFilter] = React.useState('');

    useEffect(() => {
        countries.getAll().then(data => {
            setCountriesList(data);
        })
    }, [])

    let countriesFiltered = countriesList.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            <Filter filter={filter} setFilter={setFilter}/>
            <CountryList countriesFiltered={countriesFiltered} setFilter={setFilter}/>
            <CountryDetails countriesFiltered={countriesFiltered}/>
        </div>
    )
}

function Filter({filter, setFilter}) {
    return (
        <div>
            <h2>Filter</h2>
            <div>
                Filter shown with:
                <input
                    value={filter}
                    onChange={event => setFilter(event.target.value)}
                />
            </div>
        </div>
    );
}

function CountryList({countriesFiltered, setFilter}) {
    if (countriesFiltered.length === 1) {
        return;
    }
    if (countriesFiltered.length > 10) {
        return (
            <div>
                <h2>Countries</h2>
                <div>
                    Too many matches, please be more specific
                </div>
            </div>
        );
    }
    return (
        <div>
            <h3>Countries</h3>
            {
                countriesFiltered.map(
                    country =>
                        <div key={country.cca3}>
                            {country.name.common}
                            <button onClick={() => {
                                setFilter(country.name.common)
                            }}>show
                            </button>
                        </div>
                )
            }
        </div>
    );
}

function CountryDetails({countriesFiltered}) {
    if (countriesFiltered.length === 1) {
        return (
            <div>
                <h2>Country Details</h2>
                <h3>{countriesFiltered[0].name.common}</h3>
                <div>
                    Capital: {countriesFiltered[0].capital[0]}
                </div>
                <div>
                    Population: {countriesFiltered[0].population}
                </div>
                <div>
                    <h4>Languages:</h4>
                    <ul>
                        {
                            Object.values(countriesFiltered[0].languages).map(
                                language =>
                                    <li key={language}>
                                        {language}
                                    </li>
                            )
                        }
                    </ul>
                </div>
                <div>
                    <img src={countriesFiltered[0].flags.png} alt="Flag"/>
                </div>
                <Weather capital={countriesFiltered[0].capital[0]} countryCode={countriesFiltered[0].cca2}/>
            </div>
        );
    }
}

function Weather({capital, countryCode}) {
    const [weather, setWeather] = React.useState([]);

    useEffect(() => {
        openWeather.getWeather(capital, countryCode).then(data => {
            setWeather(data);
        })
    }, [])

    if (weather.length === 0) {
        return (
            <div>
                <h2>Weather in {capital}</h2>
                <div>
                    Loading...
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <div>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather icon"/>
            </div>
            <div>
                <b>Temperature: </b>{(weather.main.temp - 273.15).toFixed(1)}°C
            </div>
            <div>
                <b>Wind: </b>{weather.wind.speed} m/s
            </div>
        </div>
    );
}

export default App;
