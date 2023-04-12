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

  const moment = require('moment');

/**
 * Returns a string representation of the difference between two timestamps in human-readable format.
 * @param {number} timestamp - the earlier timestamp.
 * @param {number} [currentTime=Date.now()] - the current timestamp. Defaults to the current date and time.
 * @returns {string} a string representation of the difference between the two timestamps.
 */
function getRelativeTimeString(timestamp, currentTime = Date.now()) {
  const momentTimestamp = moment(timestamp);
  const momentCurrentTime = moment(currentTime);
  const timeDifferences = [
    ['year', momentCurrentTime.diff(momentTimestamp, 'years')],
    ['month', momentCurrentTime.diff(momentTimestamp, 'months')],
    ['day', momentCurrentTime.diff(momentTimestamp, 'days')],
    ['hour', momentCurrentTime.diff(momentTimestamp, 'hours')],
    ['minute', momentCurrentTime.diff(momentTimestamp, 'minutes')],
    ['second', momentCurrentTime.diff(momentTimestamp, 'seconds')],
  ];
  const [smallestUnit, smallestValue] = timeDifferences.find(([, value]) => value > 0) || [timeDifferences[5][0], 0];

  return smallestValue === 0 ? 'just now' :
    `${smallestValue} ${smallestUnit}${smallestValue > 1 ? 's' : ''} ago`;
}

module.exports = {
  getRelativeTimeString,
};
}

module.exports = format;
