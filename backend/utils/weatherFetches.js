const fetchRefreshInterval = process.env.REFRESH_INTERVAL || 10; // minutes
let previous = [
  {
    id: '658225',
    data:
    { text: 'new data', },
    timestamp: new Date(),
  },
  {
    id: '658225',
    data:
    { text: 'old data', },
    timestamp: '2019-09-20T11:58:10.900Z',
  },
  {
    id: '658225',
    data:
    { text: 'old data', },
    timestamp: '2019-09-20T11:58:10.900Z',
  },
];

const removeOldData = () => {
  const oldestValidTime = new Date(new Date() - 1000 * 60 * fetchRefreshInterval);
  const firstOld = previous.map(fetch => fetch.timestamp).findIndex(time => new Date(time) < oldestValidTime);
  firstOld === -1 ? console.log('data is up to date') : previous = previous.slice(0, firstOld);
};

module.exports = {
  removeOldData,
  previous,
};
