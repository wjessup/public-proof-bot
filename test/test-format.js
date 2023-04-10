const expect = require('chai').expect;

const format = require('../lib/format');

describe('Formatter', function () {
  describe('Currency Formatting', function () {
    describe('Salary', function () {
      it('Converts salary from integers to USD', function () {
        const salary = 100000;
        const expected = '$100,000';
        expect(format.salary(salary)).to.equal(expected);
      });

      it('Converts hourly rate from integer to USD per hour', function () {
        const hourlyRate = 125;
        const expected = '$125 per hour';
        expect(format.hourlyRate(hourlyRate)).to.equal(expected);
      });

      describe('Undefined Values', function () {
        it('Shows "n/a" if salary is undefined', function () {
          const salary = undefined;
          const expected = 'n/a';
          expect(format.salary(salary)).to.equal(expected);
        });

        it('Shows "n/a" if hourly rate is undefined', function () {
          const hourlyRate = undefined;
          const expected = 'n/a';
          expect(format.hourlyRate(hourlyRate)).to.equal(expected);
        });
      });
    });

    describe('Date Formatting', function () {
      const now = Date.now();
      const then800 = new Date(now - MS_PER_DAY * 800).getTime();
      const then400 = new Date(now - MS_PER_DAY * 400).getTime();
      const then35 = new Date(now - MS_PER_DAY * 35).getTime();
      const then10DaysAgo = new Date(now - MS_PER_DAY * 10).getTime();
      const then10HoursAgo = new Date(now - MS_PER_HOUR * 10).getTime();
      const then35MinutesAgo = new Date(now - MS_PER_MINUTE * 35).getTime();

      const MS_PER_MINUTE = 60 * 1000;
      const MS_PER_HOUR = MS_PER_MINUTE * 60;
      const MS_PER_DAY = MS_PER_HOUR * 24;
      const MS_PER_MONTH = MS_PER_DAY * 30;
      const MS_PER_YEAR = MS_PER_DAY * 365;

      it('Approximates 800 days ago as 2 years', function () {
        const expected = 'approximately 2 years ago';
        expect(format.relativeTime(then800, now)).to.equal(expected);
      });

      it('Approximates 400 days ago as 1 year', function () {
        const expected = 'approximately 1 year ago';
        expect(format.relativeTime(then400, now)).to.equal(expected);
      });

      it('Approximates 35 days ago as 1 month', function () {
        const expected = 'approximately 1 month ago';
        expect(format.relativeTime(then35, now)).to.equal(expected);
      });

      it('Converts 10 days ago as 10 days', function () {
        const expected = '10 days ago';
        expect(format.relativeTime(then10DaysAgo, now)).to.equal(expected);
      });

      it('Converts 10 hours ago to 10 hours', function () {
        const expected = '10 hours ago';
        expect(format.relativeTime(then10HoursAgo, now)).to.equal(expected);
      });

      it('Converts 35 minutes ago to 35 minutes', function () {
        const expected = '35 minutes ago';
        expect(format.relativeTime(then35MinutesAgo, now)).to.equal(expected);
      });

      it('Works without requiring a timestamp, defaulting to now', function () {
        const expected = '1 hour ago';
        expect(format.relativeTime(Date.now() - MS_PER_HOUR)).to.equal(expected);
      });
    });
  });
});
atter', () => {
  describe('Currency', () => {
    it('Converts salary from integers to USD', () => {
      let salary = 100000;
      let expected = '$100,000';
      expect(format.salary(salary)).to.equal(expected);
    });
    it('Shows "n/a" if salary is undefined', () => {
      let salary = undefined;
      let expected = 'n/a';
      expect(format.salary(salary)).to.equal(expected);
    });
    it('Formats hourlyRate from integer to USD per hour', () => {
      let hourlyRate = 125;
      let expected = '$125 per hour';
      expect(format.hourlyRate(hourlyRate)).to.equal(expected);
    });
    it('Shows "n/a" if hourlyRate is undefined', () => {
      let hourlyRate = undefined;
      let expected = 'n/a';
      expect(format.hourlyRate(hourlyRate)).to.equal(expected);
    });
  });
	describe('Dates', () => {

    let now  = Date.now();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    it('Approximates 800 days ago as 2 years', () => {
      let then = now - msPerDay * 800;
      let expected = 'approximately 2 years ago';
			expect(format.relativeTime(then, now)).to.equal(expected);
		});
		it('Approximates 400 days ago as 1 year', () => {
      let then = now - msPerDay * 400;
      let expected = 'approximately 1 year ago';
			expect(format.relativeTime(then, now)).to.equal(expected);
		});
    it('Approximates 35 days ago as 1 month', () => {
      let then = now - msPerDay * 35;
      let expected = 'approximately 1 month ago';
      expect(format.relativeTime(then, now)).to.equal(expected);
    });
    it('Converts 10 days ago as 10 days', () => {
      let then = now - msPerDay * 10;
      let expected = '10 days ago';
      expect(format.relativeTime(then, now)).to.equal(expected);
    });
    it('Converts 10 hours ago to 10 hours', () => {
      let then = now - msPerHour * 10;
      let expected = '10 hours ago';
      expect(format.relativeTime(then, now)).to.equal(expected);
    });
    it('Converts 35 minutes ago to 35 minutes', () => {
      let then = now - msPerMinute * 35;
      let expected = '35 minutes ago';
      expect(format.relativeTime(then, now)).to.equal(expected);
    });
    it('Works without requiring a timestamp, defaulting to now', () => {
      let then = Date.now() - msPerHour;
      let expected = '1 hour ago';
      expect(format.relativeTime(then)).to.equal(expected);
    });

	});
});
