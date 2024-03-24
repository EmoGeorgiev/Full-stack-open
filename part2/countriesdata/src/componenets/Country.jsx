import { useState } from "react"

const Country = ({ name, capital, area, languages, flag, isUnique }) => {
    const [isShown, setIsShown] = useState(isUnique)
    
    const handleShow = () => {
        console.log("hey")
        setIsShown(!isShown)
    }
    
    if (isShown) {
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
                <div>
                    <button onClick={handleShow}>hide</button>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                {name} <button onClick={handleShow}>show</button>
            </div>
        )
    }
}

export default Country