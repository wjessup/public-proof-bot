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

  const TIME_UNITS = [
  {
    unit: 'year',
    milliseconds: 1000 * 60 * 60 * 24 * 365
  },
  {
    unit: 'month',
    milliseconds: 1000 * 60 * 60 * 24 * 30
  },
  {
    unit: 'day',
    milliseconds: 1000 * 60 * 60 * 24
  },
  {
    unit: 'hour',
    milliseconds: 1000 * 60 * 60
  },
  {
    unit: 'minute',
    milliseconds: 1000 * 60
  },
  {
    unit: 'second',
    milliseconds: 1000
  }
];

const getTimeUnits = (difference) => {
  const units = {};

  TIME_UNITS.forEach(({ unit, milliseconds }) => {
    if (difference >= milliseconds) {
      units[unit] = Math.floor(difference / milliseconds);
      difference -= units[unit] * milliseconds;
    }
  });

  return units;
};

const relativeTime = (timestamp, currentTime = Date.now()) => {

  let difference = Math.abs(currentTime - timestamp);

  let isPlural = (value, unit) => {
    return value === 1 ? unit : `${unit}s`;
  };

  const timeUnits = getTimeUnits(difference);
  let output = "";

  TIME_UNITS.forEach(({ unit }) => {
    if (timeUnits[unit]) {
      output += `${timeUnits[unit]} ${isPlural(timeUnits[unit], unit)} ago, `;
    }
  });

  const lastIndex = output.lastIndexOf(", ");
  if (lastIndex !== -1) {
    output = output.substring(0, lastIndex) + output.substring(lastIndex + 2);
  }

  return output.trim();
}
}

module.exports = format;
