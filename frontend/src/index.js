import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const baseURL = 'http://localhost:9000/api';

const getWeatherFromApi = (id) => fetch(`${baseURL}/weather?id=${id}`) // ?id=658225
  .then((weather) => weather.json())
  .catch((error) => console.error(error.message));

const Weather = () => {
  const [icon, setIcon] = useState('');

  useEffect(() => {
    getWeatherFromApi(658225) // always helsinki
      .then((data) => {
        console.log('data:', data);
        if (data.weather) {
          const weather = data.weather[0];
          setIcon(weather.icon.slice(0, -1));
        }
      });
  }, []);

  return (
    <div className="icon">
      {icon && <img src={`/img/${icon}.svg`} alt="" width="100" height="100" /> }
    </div>
  );
};

ReactDOM.render(<Weather />, document.getElementById('root'));

// serviceWorker.unregister();
