require('debug')('weathermap');
require('dotenv').config();

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');
const weatherFetches = require('../utils/weatherFetches');

const appId = process.env.APPID;
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;
const app = new Koa();
app.use(cors());

const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}`;
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

router.get('/api/weather', async context => {
  const id = 658225;

  console.log('context', context);

  weatherFetches.removeOldData();

  const oldWeather = weatherFetches.previous.find((weather) => weather.id === id);

  if (oldWeather) {
    context.type = 'application/json; charset=utf-8';
    context.body = oldWeather.data.weather ? oldWeather.data.weather[0] : {};
  } else {
    const weatherData = await fetchWeather();
    weatherFetches.previous.unshift({ id: weatherData.id, data: weatherData, timestamp: new Date(), });

    context.type = 'application/json; charset=utf-8';
    context.body = weatherData.weather ? weatherData.weather[0] : {};
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
