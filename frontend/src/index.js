import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './components/weather';
import Forecast from './components/forecast';

const App = () => (
  <div>
    <Weather />
    <Forecast />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));

// serviceWorker.unregister();
