const Router = require('koa-router');
const fetch = require('node-fetch');

const fetchRefreshInterval = process.env.REFRESH_INTERVAL || 10; // minutes
let previousRequests = [];
const removeOldData = () => {
  const oldestValidTime = new Date(new Date() - 1000 * 60 * fetchRefreshInterval);
  const firstOld = previousRequests.map(fetch => fetch.timestamp).findIndex(time => new Date(time) < oldestValidTime);
  firstOld === -1 ? console.log('data is up to date') : previousRequests = previousRequests.slice(0, firstOld);
};

const appId = process.env.APPID;
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const fetchWeather = async (id) => {
  const endpoint = `${mapURI}/weather?id=${id}&appid=${appId}`;
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

const weatherRouter = new Router();

weatherRouter.post('/api/weather', async ctx => {
  const id = parseInt(ctx.request.query.id);

  removeOldData();

  const oldWeather = previousRequests.find((request) => request.id === id && request.type === 'weather');

  if (oldWeather) {
    console.log('same query was done within 10 minutes, sending duplicate');
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = oldWeather.data.weather ? oldWeather.data : {};
  } else {
    console.log('Query id is new');

    const weatherData = await fetchWeather(id); // TODO: use id
    previousRequests.unshift({
      id: weatherData.id,
      type: 'weather',
      data: weatherData,
      timestamp: new Date(),
    });

    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData.weather ? weatherData : {};
  }
});

module.exports = weatherRouter;
