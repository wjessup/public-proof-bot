let format = {

  currency: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }),

  salary: function(salary) {
    return salary ? this.currency.format(salary) : 'n/a';
  },

  hourlyRate: function(hourlyRate) {
    return hourlyRate ? this.currency.format(hourlyRate) + ' per hour' : 'n/a';
  },

  const msPerMinute = 60 * 1000;
const msPerHour = msPerMinute * 60;
const msPerDay = msPerHour * 24;
const msPerMonth = msPerDay * 30;
const msPerYear = msPerDay * 365;

function getElapsedFromNow(timestamp) {
  return Date.now() - timestamp;
}

function formattedTime(qtty, duration) {
  const isPlural = (value) => value === 1 ? '' : 's';
  return `${qtty} ${duration}${isPlural(qtty)} ago`;
}

function getDuration(difference, duration) {
  return difference < duration;
}

function relativeTime(timestamp, currentTime = Date.now()) {
  const difference = getElapsedFromNow(timestamp);

  const floor = (value, per) => Math.floor(value / per);
  
  if (getDuration(difference, msPerMinute)) {
    const seconds = floor(difference, 1000);
    return formattedTime(seconds, 'second');
  } 
  
  if (getDuration(difference, msPerHour)) {
    const minutes = floor(difference, msPerMinute);
    return formattedTime(minutes, 'minute');
  }
  
  if (getDuration(difference, msPerDay)) {
    const hours = floor(difference, msPerHour);
    return formattedTime(hours, 'hour');
  } 
  
  if (getDuration(difference, msPerMonth)) {
    const days = floor(difference, msPerDay);
    return formattedTime(days, 'day');
  } 
  
  if (getDuration(difference, msPerYear)) {
    const months = floor(difference, msPerMonth);
    return `approximately ${formattedTime(months, 'month')}`;
  }
  
  const years = floor(difference, msPerYear);
  return `approximately ${formattedTime(years, 'year')}`;
}
}

module.exports = format;
