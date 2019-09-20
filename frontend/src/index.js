import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const baseURL = 'http://localhost:9000/api';

const getWeatherFromApi = () => fetch(`${baseURL}/weather`)
  .then((weather) => weather.json())
  .catch((error) => console.error(error.message));

const Weather = () => {
  const [icon, setIcon] = useState('');

  useEffect(() => {
    getWeatherFromApi()
      .then((weather) => {
        if (weather.icon) {
          setIcon(weather.icon.slice(0, -1))
        }
      });
  }, []);

  return (
    <div className="icon">
      {icon && <img src={`/img/${icon}.svg`} alt="" /> }
    </div>
  );
};

ReactDOM.render(<Weather />, document.getElementById('root'));

// serviceWorker.unregister();
