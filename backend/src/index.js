require('debug')('weathermap');
require('dotenv').config();
const koaBody = require('koa-body');

const Koa = require('koa');
const weatherRouter = require('./controllers/weatherRouter');
const forecastRouter = require('./controllers/forecastRouter');
const locationHelper = require('./utils/locationHelper');
const cors = require('kcors');

const port = process.env.PORT || 9000;
const app = new Koa();
app.use(cors());

// const fetchRefreshInterval = process.env.REFRESH_INTERVAL || 10; // minutes
// let requestCache = [];
// const removeOldData = () => {
//   const oldestValidTime = new Date(new Date() - 1000 * 60 * fetchRefreshInterval);
//   const firstOld = requestCache.map(fetch => fetch.timestamp).findIndex(time => new Date(time) < oldestValidTime);
//   firstOld === -1 ? console.log('data is up to date') : requestCache = requestCache.slice(0, firstOld);
// };

app.use(koaBody());
app.use(async (ctx, next) => {
  const body = ctx.request.body;

  console.log('before ctx.request.query.id', ctx.request.query.id);

  if (body.lat && body.lon) {
    ctx.request.query.id = locationHelper.nearestLocation(body).id;
  }

  console.log('after ctx.request.query.id', ctx.request.query.id);
  // removeOldData();

  // const oldRequest = requestCache.find((request) => request.id === id && request.type === type);

  await next();
});

app.use(weatherRouter.routes());
app.use(weatherRouter.allowedMethods());

app.use(forecastRouter.routes());
app.use(forecastRouter.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
