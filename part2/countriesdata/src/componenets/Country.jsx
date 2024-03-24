const Country = ({ name, capital, area, languages, flag, isUnique }) => {
    if (isUnique) {
        return (
            <div>
                <h2>{name}</h2>

                <p>capital {capital}</p>
                <p>area {area}</p>

                <h3>languages:</h3>
                <ul>
                    {Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)}
                </ul>
                <img src={flag} />
            </div>
        )
    } else {
        return (
            <div>
                {name}
            </div>
        )
    }
}

export default Country