const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const shortWeekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const getTomorrowWeekdayName = () => weekdays[new Date().getDay() + 1];
const getDayAfterTomorrowWeekdayName = () => weekdays[new Date().getDay() + 2];
const getWeekDayName = (timestamp) => weekdays[new Date(timestamp).getDay()];
const getShortWeekDayName = (timestamp) => shortWeekdays[new Date(timestamp).getDay()];

module.exports = {
  getTomorrowWeekdayName,
  getDayAfterTomorrowWeekdayName,
  getWeekDayName,
  getShortWeekDayName,
};
