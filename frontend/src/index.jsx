import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const baseURL = 'http://localhost:9000/api';

const getWeatherFromApi = async () => {
  try {
    const response = await fetch(`${baseURL}/weather`);
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

const WeatherFunction = () => {
  const [icon, setIcon] = useState('');

  useEffect(() => {
    getWeatherFromApi()
      .then((weather) => setIcon(weather.icon.slice(0, -1)));
  }, []);

  return (
    <div className="icon">
      {icon && <img src={`/img/${icon}.svg`} alt="" /> }
    </div>
  );
};

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: '',
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApi();
    console.log('got answer from server:', weather);
    this.setState({
      icon: weather.icon.slice(0, -1),
    });
  }

  render() {
    const { icon } = this.state;

    return (
      <div className="icon">
        {icon && <img src={`/img/${icon}.svg`} alt="" /> }
      </div>
    );
  }
}

ReactDOM.render(<Weather />, document.getElementById('app'));
