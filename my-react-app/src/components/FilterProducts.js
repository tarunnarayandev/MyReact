export const FilterProducts = ({onFilterChange, productList}) => {
    const types = [...new Set(productList.map(item => item.type))]

    const handleTypeChange = (e) => {
        onFilterChange(e.target.value);
    }

    const handleCostChange = (e) => {
        onFilterChange(e.target.value);
    }

    return(
        <div>
            <div>
                <label>Type:</label>
                <select onChange={handleTypeChange}>
                    <option value="">All</option>
                    {types.map((type, index) => (
                        <option key={index} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}