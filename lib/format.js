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

  function convertToRelativeTime(timestamp, currentTime = Date.now()) {
  const MILLISECONDS_PER_MINUTE = 60 * 1000;
  const MILLISECONDS_PER_HOUR = MILLISECONDS_PER_MINUTE * 60;
  const MILLISECONDS_PER_DAY = MILLISECONDS_PER_HOUR * 24;
  const MILLISECONDS_PER_MONTH = MILLISECONDS_PER_DAY * 30;
  const MILLISECONDS_PER_YEAR = MILLISECONDS_PER_DAY * 365;

  const timeDifference = currentTime - timestamp;

  const getPluralS = (value) => (value === 1 ? "" : "s");
  const approximately = "approximately ";

  if (timeDifference < MILLISECONDS_PER_MINUTE) {
    const secondsAgo = Math.floor(timeDifference / 1000);
    return `${secondsAgo} second${getPluralS(secondsAgo)} ago`;
  }

  if (timeDifference < MILLISECONDS_PER_HOUR) {
    const minutesAgo = Math.floor(timeDifference / MILLISECONDS_PER_MINUTE);
    return `${minutesAgo} minute${getPluralS(minutesAgo)} ago`;
  }

  if (timeDifference < MILLISECONDS_PER_DAY) {
    const hoursAgo = Math.floor(timeDifference / MILLISECONDS_PER_HOUR);
    return `${hoursAgo} hour${getPluralS(hoursAgo)} ago`;
  }

  if (timeDifference < MILLISECONDS_PER_MONTH) {
    const daysAgo = Math.floor(timeDifference / MILLISECONDS_PER_DAY);
    return `${daysAgo} day${getPluralS(daysAgo)} ago`;
  }

  const monthsAgoApprox = Math.floor(timeDifference / MILLISECONDS_PER_MONTH);
  const yearsAgoApprox = Math.floor(timeDifference / MILLISECONDS_PER_YEAR);

  if (monthsAgoApprox < 12) {
    return `${approximately}${monthsAgoApprox} month${getPluralS(
      monthsAgoApprox
    )} ago`;
  }

  return `${approximately}${yearsAgoApprox} year${getPluralS(
    yearsAgoApprox
  )} ago`;
}
}

module.exports = format;
