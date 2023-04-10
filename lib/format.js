const formatter = {
  currencyFormatter: new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }),

  formatSalary: (salary) => {
    if (salary) {
      return formatter.currencyFormatter.format(salary);
    }
    return 'n/a';
  },

  formatHourlyRate: (hourlyRate) => {
    if (hourlyRate) {
      return `${formatter.currencyFormatter.format(hourlyRate)} per hour`;
    }
    return 'n/a';
  },

  getRelativeTime: (timestamp, currentTime = Date.now()) => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;

    const difference = currentTime - timestamp;

    const pluralize = (value, unit) => {
      return value === 1 ? unit : `${unit}s`;
    };

    let relativeTimeString = '';

    if (difference < msPerMinute) {
      const seconds = Math.floor(difference / 1000);
      relativeTimeString = `${seconds} second${pluralize(seconds, 'second')} ago`;
    } else if (difference < msPerHour) {
      const minutes = Math.floor(difference / msPerMinute);
      relativeTimeString = `${minutes} minute${pluralize(minutes, 'minute')} ago`;
    } else if (difference < msPerDay) {
      const hours = Math.floor(difference / msPerHour);
      relativeTimeString = `${hours} hour${pluralize(hours, 'hour')} ago`;
    } else if (difference < msPerMonth) {
      const days = Math.floor(difference / msPerDay);
      relativeTimeString = `${days} day${pluralize(days, 'day')} ago`;
    } else if (difference < msPerYear) {
      const months = Math.floor(difference / msPerMonth);
      relativeTimeString = `approximately ${months} month${pluralize(months, 'month')} ago`;
    } else {
      const years = Math.floor(difference / msPerYear);
      relativeTimeString = `approximately ${years} year${pluralize(years, 'year')} ago`;
    }

    return relativeTimeString;
  },
};

module.exports = formatter;
.currency.format(salary) : 'n/a';
  },

  hourlyRate: function(hourlyRate) {
    return hourlyRate ? this.currency.format(hourlyRate) + ' per hour' : 'n/a';
  },

  relativeTime: function(timestamp, currentTime = Date.now()) {
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let difference = currentTime - timestamp;

    let isPlural = (value) => { return ( value==1 ? '' : 's' ); };

    if (difference < msPerMinute) {
      let i = Math.floor(difference/1000);
      return i + ' second' + isPlural(i) + ' ago'
    }

    else if (difference < msPerHour) {
      let i = Math.floor(difference/msPerMinute);
      return i + ' minute' + isPlural(i) + ' ago';
    }

    else if (difference < msPerDay ) {
      let i = Math.floor(difference/msPerHour);
      return i + ' hour' + isPlural(i) + ' ago';
    }

    else if (difference < msPerMonth) {
      let i = Math.floor(difference/msPerDay);
      return i + ' day' + isPlural(i) + ' ago';
    }

    else if (difference < msPerYear) {
      let i = Math.floor(difference/msPerMonth);
      return 'approximately ' + i + ' month' + isPlural(i) + ' ago';
    }

    else {
      let i = Math.floor(difference/msPerYear);
      return 'approximately ' + Math.floor(difference/msPerYear ) + ' year' + isPlural(i) + ' ago';
    }
  }
}

module.exports = format;
