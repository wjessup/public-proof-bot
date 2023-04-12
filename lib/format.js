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

  relativeTime: function(timestamp, currentTime = Date.now()) {
  const interval = currentTime - timestamp;
  const seconds = Math.floor(interval / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);
  const roundUpIfSingular = (value) => value === 1 ? '' : 's';

  if (seconds < 60) {
    return `${seconds} second${roundUpIfSingular(seconds)} ago`;
  }

  else if (minutes < 60) {
    return `${minutes} minute${roundUpIfSingular(minutes)} ago`;
  }

  else if (hours < 24) {
    return `${hours} hour${roundUpIfSingular(hours)} ago`;
  }

  else if (days < 30) {
    return `${days} day${roundUpIfSingular(days)} ago`;
  }

  else if (months < 12) {
    const monthString = months === 1 ? 'month' : 'months';
    return `${months} ${monthString} ago`;
  }

  else {
    const yearString = years === 1 ? 'year' : 'years';
    return `${years} ${yearString} ago`;
  }
}
}

module.exports = format;
