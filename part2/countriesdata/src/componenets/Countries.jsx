import Country from "./Country"

const Countries = ({ countries }) => {
    if (countries.length == 1) {
        return (
            <div>
                <Country key={countries[0].name} name={countries[0].name}
                    capital={countries[0].capital}
                    area={countries[0].area}
                    languages={countries[0].languages}
                    flag={countries[0].flag}
                    isUnique={true}
                />
            </div>
        )
    } else if (countries.length <= 10) {
        return (
            <div>
                {countries.map(country => <Country key={country.name} name={country.name}
                    capital={country.capital} area={country.area} languages={country.languages}
                    flag={country.flag} isUnique={false}
                />)}
            </div>
        )
    } else if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }
}   

export default Countries