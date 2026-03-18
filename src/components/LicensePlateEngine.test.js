import { describe, expect, it } from 'vitest';
import { licensePlateEngine } from './LicensePlateEngine.js';

describe('licensePlateEngine', () => {
    it('solve returns 9 when number is divisible by 9', () => {
        expect(licensePlateEngine.solve(18)).toBe(9);
    });

    it('solve returns number modulo 9 for non-multiples of 9', () => {
        expect(licensePlateEngine.solve(23)).toBe(5);
    });

    it('check returns true for a correct guess', () => {
        expect(licensePlateEngine.check(23, 5)).toBe(true);
    });

    it('randomNumber returns a value in the expected 4-digit range', () => {
        const value = licensePlateEngine.randomNumber();
        expect(value).toBeGreaterThanOrEqual(1);
        expect(value).toBeLessThanOrEqual(9999);
    });
});
