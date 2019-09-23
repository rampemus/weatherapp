require('debug')('weathermap');
require('dotenv').config();

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const port = process.env.PORT || 9000;
const app = new Koa();
app.use(cors());

const fetchRefreshInterval = process.env.REFRESH_INTERVAL || 10; // minutes
let previousRequests = [];
const removeOldData = () => {
  const oldestValidTime = new Date(new Date() - 1000 * 60 * fetchRefreshInterval);
  const firstOld = previousRequests.map(fetch => fetch.timestamp).findIndex(time => new Date(time) < oldestValidTime);
  firstOld === -1 ? console.log('data is up to date') : previousRequests = previousRequests.slice(0, firstOld);
};

const appId = process.env.APPID;
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';
const fetchWeather = async () => {
  const endpoint = `${mapURI}/weather?q=${targetCity}&appid=${appId}`;
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

router.get('/api/weather', async context => {
  const id = parseInt(context.request.query.id);

  removeOldData();

  const oldWeather = previousRequests.find((request) => request.id === id && request.type === 'weather');

  if (oldWeather) {
    console.log('same query was done within 10 minutes, sending duplicate');
    context.type = 'application/json; charset=utf-8';
    context.body = oldWeather.data.weather ? oldWeather.data : {};
  } else {
    console.log('Query id is new');

    const weatherData = await fetchWeather(); // TODO: use id
    previousRequests.unshift({
      id: weatherData.id,
      type: 'weather',
      data: weatherData,
      timestamp: new Date(),
    });

    context.type = 'application/json; charset=utf-8';
    context.body = weatherData.weather ? weatherData : {};
  }
});

router.get('/api/forecast', async context => {
  const id = parseInt(context.request.query.id);

  removeOldData();

  const oldForecast = previousRequests.find((request) => request.id === id && request.type === 'forecast');

  if (oldForecast) {
    console.log('same query was done within 10 minutes, sending duplicate');
    context.type = 'application/json; charset=utf-8';

    // TODO: where is the data actually?
    console.log('router, forecast', oldForecast.data);
    context.body = oldForecast.data.weather ? oldForecast.data.weather[0] : {};
  } else {
    console.log('Query id is new');

    const weatherData = await fetchWeather(); // TODO: use id
    previousRequests.unshift({
      id: weatherData.id,
      type: 'weather',
      data: weatherData,
      timestamp: new Date(),
    });

    context.type = 'application/json; charset=utf-8';
    context.body = weatherData.weather ? weatherData : {};
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
