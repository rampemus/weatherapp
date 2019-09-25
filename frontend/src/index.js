import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Weather from './components/weather';
import Forecast from './components/forecast';

const App = () => {
  const [location, setLocation] = useState({ lon: 24.93417, lat: 60.17556 });

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
      });
    } else {
      setLocation({ lon: 24.93417, lat: 60.17556 }); // Helsinki
    }
  }, []);

  return (
    <div>
      <Weather location={location} />
      <Forecast location={location} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
