const createRequestCache = () => {
  let previousRequests = [];

  const fetchRefreshInterval = process.env.REFRESH_INTERVAL || 10; // minutes
  // let previousRequests = [];
  const removeOldRequests = () => {
    const oldestValidTime = new Date(new Date() - 1000 * 60 * fetchRefreshInterval);
    const firstOld = previousRequests.map(fetch => fetch.timestamp).findIndex(time => new Date(time) < oldestValidTime);
    if (firstOld !== -1) {
      previousRequests = previousRequests.slice(0, firstOld);
    }
  };

  const checkRequest = async (ctx, next) => {
    const url = ctx.request.url;
    const id = ctx.request.query.id;

    removeOldRequests();
    const previous = previousRequests.find((request) => request.url === url && request.id === id);

    if (previous) {
      console.log('old');
      ctx.type = 'application/json; charset=utf-8';
      ctx.body = previous.body;
    } else {
      console.log('new');
      await next();

      previousRequests.unshift({
        url: url,
        id: ctx.request.query.id,
        body: ctx.response.body,
        timestamp: new Date(),
      });
    }
  };

  return checkRequest;
};

module.exports = {
  createRequestCache,
};
