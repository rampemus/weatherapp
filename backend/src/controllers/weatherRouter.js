const Router = require('koa-router');
const fetch = require('node-fetch');

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
  const weatherData = await fetchWeather(id);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData : {};
});

module.exports = weatherRouter;
