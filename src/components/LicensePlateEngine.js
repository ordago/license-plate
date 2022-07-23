import random from 'lodash/random.js';

const solve = (number) => {
    const modulo = number % 9;
    if (modulo === 0) {
        return 9;
    }
    return modulo;
};

const check = (number, guess) => {
    return solve(number) === Number(guess);
};

const randomNumber = (digits = 4) => {
    const max = '9'.repeat(digits);
    return random(1, Number(max));
};

export const licensePlateEngine = { solve, check, randomNumber };
