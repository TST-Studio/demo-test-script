import { describe, it, expect } from 'vitest';
import { FizzBuzz } from './fizzbuzz.js'; 

describe('FizzBuzz constructor', () => {
  it('uses default MAX_COUNT = 1000 when no value is provided', () => {
    const fb = new FizzBuzz();
    expect(fb.MAX_COUNT).toBe(1000);
  });

  it('uses provided max_count when it is truthy', () => {
    const fb = new FizzBuzz(15);
    expect(fb.MAX_COUNT).toBe(15);
  });

  it('treats 0 or other falsy values as "not provided" and falls back to 1000', () => {
    // Note: this reflects the current implementation’s truthiness check.
    const zero = new FizzBuzz(0 as unknown as number);
    const emptyStr = new FizzBuzz('' as unknown as number);
    expect(zero.MAX_COUNT).toBe(1000);
    expect(emptyStr.MAX_COUNT).toBe(1000);
  });
});

describe('divisible_by', () => {
  const fb = new FizzBuzz();

  it('returns true when dividend is divisible by divisor', () => {
    expect(fb.divisible_by(9, 3)).toBe(true);
    expect(fb.divisible_by(10, 5)).toBe(true);
  });

  it('returns false when not divisible', () => {
    expect(fb.divisible_by(10, 3)).toBe(false);
    expect(fb.divisible_by(7, 5)).toBe(false);
  });

  it('returns false when divisor is falsy (undefined, 0, null)', () => {
    // Matches implementation: early return false if divisor is falsy
    expect(fb.divisible_by(10, undefined as unknown as number)).toBe(false);
    expect(fb.divisible_by(10, 0)).toBe(false);
    expect(fb.divisible_by(10, null as unknown as number)).toBe(false);
  });

  it('handles negative numbers according to JS % behavior', () => {
    expect(fb.divisible_by(-10, 5)).toBe(true); // -10 % 5 === 0
    expect(fb.divisible_by(-9, 4)).toBe(false);
  });
});

describe('divisible_by_both', () => {
  const fb = new FizzBuzz();

  it('is true only when divisible by 3 and 5', () => {
    expect(fb.divisible_by_both(15)).toBe(true);
    expect(fb.divisible_by_both(30)).toBe(true);
    expect(fb.divisible_by_both(9)).toBe(false);
    expect(fb.divisible_by_both(10)).toBe(false);
  });
});

describe('say', () => {
  const fb = new FizzBuzz();

  it('returns "fizz" for multiples of 3 only', () => {
    expect(fb.say(3)).toBe('fizz');
    expect(fb.say(6)).toBe('fizz');
  });

  it('returns "buzz" for multiples of 5 only', () => {
    expect(fb.say(5)).toBe('buzz');
    expect(fb.say(10)).toBe('buzz');
  });

  it('returns "fizzbuzz" for multiples of 3 and 5', () => {
    expect(fb.say(15)).toBe('fizzbuzz');
    expect(fb.say(45)).toBe('fizzbuzz');
  });

  it('returns the number when not a multiple of 3 or 5', () => {
    expect(fb.say(1)).toBe(1);
    expect(fb.say(7)).toBe(7);
    expect(fb.say(22)).toBe(22);
  });

  it('edge case: returns "fizzbuzz" for 0 (since divisible by 3 and 5)', () => {
    expect(fb.say(0)).toBe('fizzbuzz');
  });
});

describe('integration: first 20 outputs', () => {
  it('matches the expected FizzBuzz sequence from 1..20', () => {
    const fb = new FizzBuzz(20);
    const actual = Array.from({ length: 20 }, (_, i) => fb.say(i + 1));
    const expected = [
      1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz',
      11, 'fizz', 13, 14, 'fizzbuzz', 16, 17, 'fizz', 19, 'buzz'
    ];
    expect(actual).toEqual(expected);
  });
});

