"use client"
import { useState } from 'react';
import axios from 'axios';
import "./style.css";

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);


  const fetchWeather = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/weather?city=${city}`);
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = { padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', };
  const inputStyle = { padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc', };
  const buttonStyle = { padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer', };
  const weatherContainerStyle = { marginTop: '20px', padding: '20px', borderRadius: '5px', backgroundColor: 'white', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'center', };
  const loaderStyle = { marginTop: '20px', };
  return (<div style={containerStyle}>
    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" style={inputStyle} />
    <button onClick={fetchWeather} style={buttonStyle}>Get Weather</button> {loading && <div className="circle-loader" style={loaderStyle}></div>} {weather && (<div style={weatherContainerStyle}> <h2>{weather.name}</h2> <p>{weather.weather[0].description}</p> <p>Temperature: {weather.main.temp}°C</p> <p>Humidity: {weather.main.humidity}%</p> </div>)} </div>);
};
export default Weather;
