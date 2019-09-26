import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import unitHelper from '../utils/unitHelper';

const baseURL = 'http://localhost:9000/api';

// Kauniainen { lat: 60.1841623, lon: 24.7415829 }
// Joensuu { lon: 29.75, lat: 62.583328 }

const getWeatherFromApi = (id, location) => axios.post(`${baseURL}/weather?id=${id}`, location)
  .then((weather) => weather.data)
  .catch((error) => console.error(error.message));

const Weather = ({ location }) => {
  const [city, setCity] = useState('Helsinki');
  const [icon, setIcon] = useState('');
  const [temperature, setTemperature] = useState('no data');
  const [windSpeed, setWindSpeed] = useState('no data');

  useEffect(() => {
    getWeatherFromApi(658225, location)
      .then((data) => {
        if (data.weather) {
          const weather = data.weather[0];
          setIcon(weather.icon.slice(0, -1));
          setTemperature(data.main.temp);
          setWindSpeed(data.wind.speed);
          setCity(data.name);
        }
      });
  }, [location]);

  return (
    <div className="icon">
      {icon && <img src={`/img/${icon}.svg`} alt="" width="150" height="150" />}
      {`Temperature now in ${city} is ${unitHelper.kelvinToCelsius(temperature)}°C `}
      {`and windspeed ${windSpeed} m/s`}
    </div>
  );
};

Weather.propTypes = {
  location: PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number,
  }),
};

Weather.defaultProps = {
  location: {
    lon: 24.93417,
    lat: 60.17556,
  },
};

export default Weather;
