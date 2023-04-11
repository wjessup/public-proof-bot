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

  relativeTime: const MINUTES_IN_AN_HOUR = 60;
const HOURS_IN_A_DAY = 24;
const DAYS_IN_A_MONTH = 30;
const MONTHS_IN_A_YEAR = 12;

const secondsToString = (seconds) => `${seconds} second${seconds === 1 ? '' : 's'} ago`;
const minutesToString = (minutes) => `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
const hoursToString = (hours) => `${hours} hour${hours === 1 ? '' : 's'} ago`;
const daysToString = (days) => `${days} day${days === 1 ? '' : 's'} ago`;
const monthsToString = (months) => `${months} month${months === 1 ? '' : 's'} ago`;
const yearsToString = (years) => `${years} year${years === 1 ? '' : 's'} ago`;

function getTimeDifference(timestamp, currentTime = Date.now()) {
  const differenceInMilliseconds = currentTime - timestamp;
  const seconds = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / MINUTES_IN_AN_HOUR);
  const days = Math.floor(hours / HOURS_IN_A_DAY);
  const months = Math.floor(days / DAYS_IN_A_MONTH);
  const years = Math.floor(months / MONTHS_IN_A_YEAR);

  if (seconds < 60) {
    return secondsToString(seconds);
  } else if (minutes < 60) {
    return minutesToString(minutes);
  } else if (hours < HOURS_IN_A_DAY) {
    return hoursToString(hours);
  } else if (days < DAYS_IN_A_MONTH) {
    return daysToString(days);
  } else if (months < MONTHS_IN_A_YEAR) {
    return monthsToString(months);
  } else {
    return yearsToString(years);
  }
}
}

module.exports = format;
