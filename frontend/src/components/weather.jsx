import React, { useState, useEffect } from 'react';
import unitHelper from '../utils/unitHelper';

const baseURL = 'http://localhost:9000/api';

const getWeatherFromApi = (id) => fetch(`${baseURL}/weather?id=${id}`)
  .then((weather) => weather.json())
  .catch((error) => console.error(error.message));

const Weather = () => {
  const city = 'Helsinki'

  const [icon, setIcon] = useState('');
  const [temperature, setTemperature] = useState('no data');
  const [windSpeed, setWindSpeed] = useState('no data');

  useEffect(() => {
    getWeatherFromApi(658225) // always helsinki
      .then((data) => {
        if (data.weather) {
          const weather = data.weather[0];
          setIcon(weather.icon.slice(0, -1));
          setTemperature(data.main.temp);
          setWindSpeed(data.wind.speed);
        }
      });
  }, []);

  return (
    <div className="icon">
      {icon && <img src={`/img/${icon}.svg`} alt="" width="150" height="150" />}
      {`Temperature now in ${city} is ${unitHelper.kelvinToCelsius(temperature)}`}
      {`°C and windspeed is ${windSpeed} m/s`}
    </div>
  );
};

export default Weather;
