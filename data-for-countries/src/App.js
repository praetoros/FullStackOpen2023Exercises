import React, {useEffect} from 'react';
import countries from "./services/countries";


function App() {
    const [countriesList, setCountriesList] = React.useState([]);
    const [filter, setFilter] = React.useState('');

    useEffect(() => {
        countries.getAll().then(data => {
            setCountriesList(data);
        })
    }, [])

    const handleSearch = (event) => {
        setFilter(event.target.value);
    }

    let countriesFiltered = countriesList.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            <Filter filter={filter} setFilter={setFilter}/>
            <CountryList countriesFiltered={countriesFiltered}/>
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

function CountryList({countriesFiltered}) {
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
            </div>
        );
    }
}

export default App;
