const Router = require('koa-router');
const fetch = require('node-fetch');

const appId = process.env.APPID;
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const fetchForecast = async (id) => {
  const endpoint = `${mapURI}/forecast?id=${id}&appid=${appId}`;
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

const forecastRouter = new Router();

forecastRouter.post('/api/forecast', async ctx => {
  const id = parseInt(ctx.request.query.id);
  const weatherData = await fetchForecast(id); // TODO: use id

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.list ? weatherData : {};
});

module.exports = forecastRouter;
