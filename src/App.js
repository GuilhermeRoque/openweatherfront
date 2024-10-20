import './App.css';
import React, { useEffect, useState } from 'react';
import CityForm from './CityForm';
import axios from 'axios';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [credentieals, setCredentials] = useState(null)
  const [fetching, setFetching] = useState(false); // To control fetching

  const fetchWeatherData = async () => {
    try {
        const response = await axios.get('http://localhost:8000/openweather', {
            headers: {
                'Authorization': `${credentieals.token}`,
            }
        });
        console.log(response.data.progress)
        setWeatherData(response.data.results);
        if (response.data.progress === 100){
            setFetching(false)
        }
    } catch (error) {
        console.log(error)
    }
  };

  const fetchUserId = async () => {
    try {
        const response = await axios.get('http://localhost:8000/userid'); // Replace with your API URL
        setCredentials(response.data)
    } catch (error) {
        console.log(error)
    }
  }

  const startTask = async (cities) => {
    const data = {cities: cities}
    try {
        const response = await axios.post('http://localhost:8000/openweather', data, {
            headers: {
                'Authorization': `${credentieals.token}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data)
        setFetching(true)
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    let intervalId;

    if (fetching) {
        intervalId = setInterval(() => {
            fetchWeatherData(); // Fetch data every 5 seconds
        }, 5000);
    }else if (weatherData.length === 0){
        fetchUserId()
    }

    return () => clearInterval(intervalId); // Cleanup interval on unmount

  }, [fetching, weatherData.length]);

  return (
    <div className="page-background">
        <div className="container mt-5">
            <h1 className="text-center mb-4">Current Cities Weather</h1>        
            <CityForm onAddCities={startTask}/>
            {fetching | weatherData.length > 0? 
                <div className='overflow-auto table-wrapper'>
                <table className="table table-striped table-hover my-table">
                    <thead>
                        <tr>
                            <th className='my-th'>Name</th>
                            <th className='my-th'>Humidity</th>
                            <th className='my-th'>Temperature</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weatherData.map((item, index) => (
                            <tr key={index}>
                                <td className='my-td'>{item.name}</td>
                                <td className='my-td'>{item.humidity}</td>
                                <td className='my-td'>{item.temperature}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>                                
            : <></>}
        </div>
    </div>
);
};

export default App;
