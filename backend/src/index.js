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

app.use(koaBody());
app.use(async (ctx, next) => {
  const body = ctx.request.body;

  console.log('before: ', ctx.request.url, ctx.request.query.id);

  if (body.lat && body.lon) {
    ctx.request.query.id = locationHelper.nearestLocation(body).id;
    console.log('changed the location!');
  }
  await next();
});

const fetchRefreshInterval = process.env.REFRESH_INTERVAL || 10; // minutes
let previousRequests = [];

const removeOldRequests = () => {
  const oldestValidTime = new Date(new Date() - 1000 * 60 * fetchRefreshInterval);
  const firstOld = previousRequests.map(fetch => fetch.timestamp).findIndex(time => new Date(time) < oldestValidTime);
  if (firstOld !== -1) {
    console.log('berofe', previousRequests.length);
    previousRequests = previousRequests.slice(0, firstOld);
    console.log('after', previousRequests.length);
  }
};

app.use(async (ctx, next) => {
  const url = ctx.request.url;
  const id = ctx.request.query.id;

  console.log('after: ', ctx.request.url, ctx.request.query.id);

  removeOldRequests();

  const previous = previousRequests.find((request) => request.url === url && request.id === id);

  if (previous) {
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = previous.body;
  } else {
    await next();

    previousRequests.unshift({
      url: url,
      id: ctx.request.query.id,
      body: ctx.response.body,
      timestamp: new Date(),
    });
  }
});

app.use(weatherRouter.routes());
app.use(weatherRouter.allowedMethods());

app.use(forecastRouter.routes());
app.use(forecastRouter.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
