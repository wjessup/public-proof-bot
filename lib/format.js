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
