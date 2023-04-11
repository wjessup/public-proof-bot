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

  relativeTime: // Define time constants in milliseconds
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const MONTH = DAY * 30; // Can be improved by using an actual calendar
const YEAR = DAY * 365;

function getTimeElapsedString(timestamp, currentTime = Date.now()) {
  let difference = currentTime - timestamp;

  // Determine plural suffix based on input value
  let getPluralSuffix = (value) => (value === 1 ? '' : 's');

  // Use a template literal to simplify string construction
  let getString = (timeUnit, timeUnitName, prefix = '') =>
    `${prefix}${timeUnit} ${timeUnitName}${getPluralSuffix(timeUnit)} ago`;

  if (difference < MINUTE) {
    let timeUnit = Math.floor(difference / SECOND);
    return getString(timeUnit, 'second');
  }

  if (difference < HOUR) {
    let timeUnit = Math.floor(difference / MINUTE);
    return getString(timeUnit, 'minute');
  }

  if (difference < DAY) {
    let timeUnit = Math.floor(difference / HOUR);
    return getString(timeUnit, 'hour');
  }

  if (difference < MONTH) {
    let timeUnit = Math.floor(difference / DAY);
    return getString(timeUnit, 'day');
  }

  if (difference < YEAR) {
    let timeUnit = Math.floor(difference / MONTH);
    return getString(timeUnit, 'month', 'approximately ');
  }

  let timeUnit = Math.floor(difference / YEAR);
  return getString(timeUnit, 'year', 'approximately ');
}
}

module.exports = format;
