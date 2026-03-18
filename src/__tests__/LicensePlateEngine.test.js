import { describe, it, expect } from 'vitest'
import { licensePlateEngine } from '../components/LicensePlateEngine.js'

describe('licensePlateEngine', () => {
    describe('solve', () => {
        it('returns the digital root of a number', () => {
            // 1+3+5+7 = 16, 1+6 = 7
            expect(licensePlateEngine.solve(1357)).toBe(7)
        })

        it('returns 9 when the number is divisible by 9', () => {
            expect(licensePlateEngine.solve(9)).toBe(9)
            expect(licensePlateEngine.solve(18)).toBe(9)
            expect(licensePlateEngine.solve(9999)).toBe(9)
        })

        it('returns the number itself when it is a single non-zero digit', () => {
            expect(licensePlateEngine.solve(5)).toBe(5)
            expect(licensePlateEngine.solve(1)).toBe(1)
        })

        it('handles multi-digit numbers correctly', () => {
            // 1234 → 1+2+3+4 = 10 → 1+0 = 1
            expect(licensePlateEngine.solve(1234)).toBe(1)
            // 9876 → 9+8+7+6 = 30 → 3+0 = 3
            expect(licensePlateEngine.solve(9876)).toBe(3)
        })
    })

    describe('check', () => {
        it('returns true when the guess matches the digital root', () => {
            expect(licensePlateEngine.check(1357, 7)).toBe(true)
        })

        it('returns false when the guess does not match', () => {
            expect(licensePlateEngine.check(1357, 3)).toBe(false)
        })

        it('coerces string guesses to numbers', () => {
            expect(licensePlateEngine.check(1357, '7')).toBe(true)
            expect(licensePlateEngine.check(1357, '3')).toBe(false)
        })
    })

    describe('randomNumber', () => {
        it('returns a number between 1 and 9999 by default', () => {
            for (let i = 0; i < 20; i++) {
                const n = licensePlateEngine.randomNumber()
                expect(n).toBeGreaterThanOrEqual(1)
                expect(n).toBeLessThanOrEqual(9999)
            }
        })

        it('respects the digits parameter', () => {
            for (let i = 0; i < 20; i++) {
                const n = licensePlateEngine.randomNumber(2)
                expect(n).toBeGreaterThanOrEqual(1)
                expect(n).toBeLessThanOrEqual(99)
            }
        })
    })
})
