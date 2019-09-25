import React, { useState, useEffect } from 'react';
import unitHelper from '../utils/unitHelper';
import weekDayHelper from '../utils/weekDayHelper';

const baseURL = 'http://localhost:9000/api';

const lenghtOfForecast = 12; // *4hours (max 40)

const getForecastFromApi = (id) => fetch(`${baseURL}/forecast?id=${id}`, { method: 'post' })
  .then((forecast) => forecast.json())
  .catch((error) => console.error(error.message));

const Forecast = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    getForecastFromApi(658225)
      .then((data) => {
        if (data.list.length > 0) {
          setForecast(data.list);
        }
      });
  }, []);

  if (forecast[0]) {
    return (
      <div>
        <table>
          <thead>
            <tr>
              {forecast.slice(0, lenghtOfForecast).map((weather, i) => {
                const time = new Date(weather.dt * 1000);
                const dayStart = time.getHours() === 0 || i === 0;
                return (dayStart
                  ? <td key={weather.dt}>{weekDayHelper.getShortWeekDayName(time)}</td>
                  : <td key={weather.dt} />);
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              {forecast.slice(0, lenghtOfForecast).map((weather) => {
                const time = new Date(weather.dt * 1000);
                return <td key={`hours${weather.dt}`}>{time.getHours()}</td>;
              })}
            </tr>
            <tr>
              {forecast.slice(0, lenghtOfForecast).map((weather) => {
                const { icon } = weather.weather[0];
                return (
                  <td key={`icon${weather.dt}`}>
                    {icon && <img src={`/img/${icon.slice(0, -1)}.svg`} alt="" width="40" height="40" /> }
                  </td>
                );
              })}
            </tr>
            <tr>
              {forecast.slice(0, lenghtOfForecast).map((weather) => {
                const temperature = unitHelper.kelvinToCelsius(weather.main.temp, 0); // °C
                const temperatureWithUnit = temperature > 0 ? `${temperature}°C` : `${temperature}°C`;
                return <td key={`temp${weather.dt}`}>{temperatureWithUnit}</td>;
              })}
            </tr>
          </tbody>
        </table>

      </div>
    );
  }
  return 'no data';
};

export default Forecast;
