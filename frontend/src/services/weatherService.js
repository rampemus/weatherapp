import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_API || 'http://localhost:9000/api';

export const getWeatherFromApi = (id, location) => axios.post(`${baseURL}/weather?id=${id}`, location)
  .then((weather) => weather.data);
  // .catch((error) => console.error(error.message));

export const getForecastFromApi = (id, location) => axios.post(`${baseURL}/forecast?id=${id}`, location)
  .then((forecast) => forecast.data);
  // .catch((error) => console.error(error.message));
