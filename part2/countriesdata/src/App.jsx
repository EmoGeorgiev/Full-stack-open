import Countries from "./componenets/Countries"
import CountryForm from "./componenets/CountryForm"
import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
    const [countries, setCountries] = useState([])
    const [filteredCountries, setFilteredCountries] = useState([])
    const [query, setQuery] = useState([])

    useEffect(() => {
        axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
            .then(response => response.data)
            .then(response => {
                const newCountries = response.map(country => {
                    const name = country.name.common
                    const capital = country.capital
                    const area = country.area
                    const languages = country.languages
                    const flag = country.flags.png
                    const newCountry = { name, capital, area, languages, flag }
                    return newCountry
                })
                setCountries(newCountries)
                setFilteredCountries(newCountries)
            })
    }, [])

    const handleQueryChange = (event) => {
        const newQuery = event.target.value.toLowerCase()
        setQuery(newQuery)
        const newFilteredCountries = countries.filter(country => country.name.toLowerCase().includes(newQuery))
        setFilteredCountries(newFilteredCountries)
    }

    return (
        <div>
            <CountryForm query={query} handleQueryChange={handleQueryChange} />
            <Countries countries={filteredCountries} />
        </div>
    )
}

export default App
