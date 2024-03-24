
const CountryForm = ({ query, handleQueryChange}) => {
    return (
        <form>
            <div>
                find countries <input value={query} onChange={handleQueryChange} />
            </div>
        </form>
    ) 
}

export default CountryForm