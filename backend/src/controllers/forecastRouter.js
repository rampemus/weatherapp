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
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';
const fetchForecast = async (id) => {
  const endpoint = `${mapURI}/forecast?id=${id}&appid=${appId}`;
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

const forecastRouter = new Router();

forecastRouter.post('/api/forecast', async ctx => {
  const id = parseInt(ctx.request.query.id);

  removeOldData();

  const oldForecast = previousRequests.find((request) => request.id === id && request.type === 'forecast');

  if (oldForecast) {
    // console.log('same query was done within 10 minutes, sending duplicate');
    ctx.type = 'application/json; charset=utf-8';

    // TODO: where is the data actually?
    // console.log('router, forecast', oldForecast.data);
    ctx.body = oldForecast.data.list ? oldForecast.data : {};
  } else {
    console.log('Query id is new');

    const weatherData = await fetchForecast(id); // TODO: use id
    previousRequests.unshift({
      id: weatherData.id,
      type: 'forecast',
      data: weatherData,
      timestamp: new Date(),
    });

    // console.log('api/forecast weatherData', weatherData);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData.list ? weatherData : {};
  }
});

module.exports = forecastRouter;
