// require('debug')('weathermap');
require('dotenv').config();
const koaBody = require('koa-body');

const Koa = require('koa');
const weatherRouter = require('./controllers/weatherRouter');
const forecastRouter = require('./controllers/forecastRouter');
const requestLocator = require('./middleware/requestLocator');
const requestCache = require('./middleware/requestCache');
const cors = require('kcors');

const port = process.env.PORT || 9000;
const app = new Koa();
app.use(cors());

app.use(koaBody());
app.use(requestLocator.locate);
app.use(requestCache.createRequestCache());

app.use(weatherRouter.routes());
app.use(weatherRouter.allowedMethods());

app.use(forecastRouter.routes());
app.use(forecastRouter.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
