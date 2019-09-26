const locationHelper = require('../utils/locationHelper');

const locate = async (ctx, next) => {
  const body = ctx.request.body;

  if (body.lat && body.lon) {
    ctx.request.query.id = locationHelper.nearestLocation(body).id;
  }

  console.log('middleware working');

  await next();
};

module.exports = {
  locate,
};
