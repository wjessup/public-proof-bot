const expect = require('chai').expect;

const format = require('../lib/format');

describe('Formatter', () => {
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
