"use client"
import { useState } from 'react';
import axios from 'axios';
import "./style.css";
import Image from 'next/image';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) {
      setError("City name cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError('');
      setWeather(null);
      const response = await axios.get(`/api/weather?city=${city}`);
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setWeather(response.data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const convertKelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(2);
  };

  const containerStyle = { padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' };
  const inputStyle = { padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' };
  const buttonStyle = { padding: '10px 20px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: 'white', cursor: 'pointer' };
  const weatherContainerStyle = { marginTop: '20px', padding: '20px', borderRadius: '5px', backgroundColor: 'white', boxShadow: '0 0 10px rgba(0,0,0,0.1)', textAlign: 'center' };
  const loaderStyle = { marginTop: '20px' };
  const errorStyle = { color: 'red', marginTop: '20px' };

  return (
    <div style={containerStyle}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        style={inputStyle}
      />
      <button onClick={fetchWeather} style={buttonStyle}>Get Weather</button>
      {loading && <div className="circle-loader" style={loaderStyle}></div>}
      {error && <div style={errorStyle}>{error}</div>}
      {weather && (
        <div style={weatherContainerStyle}>
          <div className='cityname'>
            <h3><Image
              src="/location.png"
              width={18}
              height={25}
              alt="location"
            /> {weather.name}, {weather.sys.country}</h3>
            <p> {convertKelvinToCelsius(weather.main.temp)}°C <span className='detaildesc'>{weather.weather[0].description}</span></p>
          </div>
          <div className='weatherdesc'>
            <p>Feels like: </p>
            <span>{convertKelvinToCelsius(weather.main.feels_like)}°C</span>
          </div>
          <div className='weatherdesc'>
            <p>Humidity: </p>
            <span>{weather.main.humidity}%</span>
          </div>

          <div className='weatherdesc'>
            <p>Pressure: </p>
            <span>{weather.main.pressure} <span className='detaildesc'>hPa</span></span>
          </div>
          <div className='weatherdesc'>
            <p>Sea Level: </p>
            <span>{weather.main.sea_level} <span className='detaildesc'>hPa</span></span>
          </div>
          <div className='weatherdesc'>
            <p>Ground Level: </p>
            <span>{weather.main.grnd_level} <span className='detaildesc'>hPa</span></span>
          </div>

        </div>
      )}
    </div>
  );
};
export default Weather;
