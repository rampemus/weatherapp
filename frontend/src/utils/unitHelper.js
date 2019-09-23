const kelvinToCelsius = (temperature, decimals) => (temperature - 273.15).toFixed(decimals || 0);

module.exports = {
  kelvinToCelsius,
};
