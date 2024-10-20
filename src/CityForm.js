import React, { useState } from 'react';

const defaultCityNames = 'Rio de Janeiro, Brasília, São Paulo, Belo Horizonte, Salvador, Porto Alegre, Curitiba, Florianópolis, Natal, Recife, Maceió, Aracaju, Belém, Goiânia, Palmas, São Luís, Teresina, Campo Grande, Cuiabá, João Pessoa, Macapá, Boa Vista, Rio Branco, Brasília'
const CityForm = ({ onAddCities }) => {
    const [cityList, setCityList] = useState(defaultCityNames);

    const handleAddCities = (e) => {
        e.preventDefault();
        const citiesArray = cityList.split(', ').map(city => city.trim()).filter(city => city);
        if (citiesArray.length > 0) {
            onAddCities(citiesArray);
        }
    };

    return (
        <form onSubmit={handleAddCities} className="mb-4">
            <div className="input-group">
                <textarea
                    className="form-control"
                    placeholder="Enter US or BR city names separated by ','"
                    value={cityList}
                    onChange={(e) => setCityList(e.target.value)}
                    rows="5"
                />
            </div>
            <button className="btn btn-primary mt-2" type="submit">Send</button>
        </form>
    );
};

export default CityForm;