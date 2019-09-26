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

  if (body.lat && body.lon) {
    ctx.request.query.id = locationHelper.nearestLocation(body).id;
  }
  await next();
});

app.use(weatherRouter.routes());
app.use(weatherRouter.allowedMethods());

app.use(forecastRouter.routes());
app.use(forecastRouter.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
