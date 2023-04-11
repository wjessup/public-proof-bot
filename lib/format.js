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

  relativeTime: const timeConstants = {
  msPerMinute: 60 * 1000,
  msPerHour: 60 * 60 * 1000,
  msPerDay: 24 * 60 * 60 * 1000,
  msPerMonth: 30 * 24 * 60 * 60 * 1000,
  msPerYear: 365 * 24 * 60 * 60 * 1000,
};

function getTimeAgoString(timestamp, currentTime = Date.now()) {
  const difference = currentTime - timestamp;

  const getSecondsAgo = () => {
    const secondsAgo = Math.floor(difference / timeConstants.msPerMinute);
    return `${secondsAgo} second${secondsAgo === 1 ? '' : 's'} ago`;
  };

  const getMinutesAgo = () => {
    const minutesAgo = Math.floor(difference / timeConstants.msPerMinute);
    return `${minutesAgo} minute${minutesAgo === 1 ? '' : 's'} ago`;
  };

  const getHoursAgo = () => {
    const hoursAgo = Math.floor(difference / timeConstants.msPerHour);
    return `${hoursAgo} hour${hoursAgo === 1 ? '' : 's'} ago`;
  };

  const getDaysAgo = () => {
    const daysAgo = Math.floor(difference / timeConstants.msPerDay);
    return `${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`;
  };

  const getMonthsAgo = () => {
    const monthsAgo = Math.floor(difference / timeConstants.msPerMonth);
    return `approximately ${monthsAgo} month${monthsAgo === 1 ? '' : 's'} ago`;
  };

  const getYearsAgo = () => {
    const yearsAgo = Math.floor(difference / timeConstants.msPerYear);
    return `approximately ${yearsAgo} year${yearsAgo === 1 ? '' : 's'} ago`;
  };

  const cache = {};

  if (cache[difference]) {
    return cache[difference];
  }

  let result;
  if (difference < timeConstants.msPerMinute) {
    result = getSecondsAgo();
  } else if (difference < timeConstants.msPerHour) {
    result = getMinutesAgo();
  } else if (difference < timeConstants.msPerDay) {
    result = getHoursAgo();
  } else if (difference < timeConstants.msPerMonth) {
    result = getDaysAgo();
  } else {
    result = getMonthsAgo();
  }

  cache[difference] = result;

  return result;
}
}

module.exports = format;
