import React, { useState, useEffect } from 'react';
import axios from 'axios';
import unitHelper from '../utils/unitHelper';

const baseURL = 'http://localhost:9000/api';

// Kauniainen { lat: 60.1841623, lon: 24.7415829 }

// Joensuu { lon: 29.75, lat: 62.583328 }

// TODO: refactor with axios
const getWeatherFromApi = (id, location) => axios.post(`${baseURL}/weather?id=${id}`, location)
  .then((weather) => weather.data)
  .catch((error) => console.error(error.message));

const Weather = (props) => {
  const [city, setCity] = useState('Helsinki');
  const [icon, setIcon] = useState('');
  const [temperature, setTemperature] = useState('no data');
  const [windSpeed, setWindSpeed] = useState('no data');

  useEffect(() => {
    getWeatherFromApi(658225, props.location) // default always helsinki
      .then((data) => {
        if (data.weather) {
          const weather = data.weather[0];
          setIcon(weather.icon.slice(0, -1));
          setTemperature(data.main.temp);
          setWindSpeed(data.wind.speed);
          setCity(data.name);
        }
      });
  }, [props.location]);

  return (
    <div className="icon">
      {icon && <img src={`/img/${icon}.svg`} alt="" width="150" height="150" />}
      {`Temperature now in ${city} is ${unitHelper.kelvinToCelsius(temperature)}°C `}
      {`and windspeed ${windSpeed} m/s`}
    </div>
  );
};

export default Weather;
