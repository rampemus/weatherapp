const cityDB = require('./city.list.json');
const cities = cityDB.sort((a, b) => b.coord.lon - a.coord.lon).slice();

const areaArray = (location, delta) => {
  const searchArea = delta || 1;

  const westBoundary = cities.findIndex((city) => city.coord.lon < location.lon - searchArea);
  const eastBoundary = cities.length - cities.slice().reverse().findIndex((city) => city.coord.lon > location.lon + searchArea);
  // console.log('west:' + westBoundary + ',east:' + eastBoundary + ' and difference: ' + (westBoundary - eastBoundary));

  const northBoundary = location.lat + searchArea;
  const southBoundary = location.lat - searchArea;

  const filtered = cities.slice(eastBoundary, westBoundary).filter((city) => city.coord.lat < northBoundary && city.coord.lat > southBoundary);
  // console.log('filtered length: ' + filtered.length);

  // console.log(filtered);
  return filtered;
};

const nearestLocation = (location) => {
  const nearLocations = areaArray(location);
  return findNearest(location, nearLocations);
};

// https://stackoverflow.com/questions/21279559/geolocation-closest-locationlat-long-from-my-position
const equirectangularProjectionDistance = (a, b) => {
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const lon1 = a.lon * Math.PI / 180;
  const lon2 = b.lon * Math.PI / 180;
  const R = 6371;
  const x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
  const y = (lat2 - lat1);
  return Math.sqrt(x * x + y * y) * R;
};

const findNearest = (location, cityArray) => {
  let nearest = cityArray[0];
  let minDistance = equirectangularProjectionDistance(location, cityArray[0].coord);

  for (let i = 1; i < cityArray.length; i++) {
    const distance = equirectangularProjectionDistance(location, cityArray[i].coord);
    if (distance < minDistance) {
      nearest = cityArray[i];
      minDistance = distance;
    }
  }

  return nearest;
};

module.exports = {
  nearestLocation,
};

// export default
