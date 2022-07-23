import { assign, createMachine } from 'xstate';
import { licensePlateEngine } from './LicensePlateEngine.js';

// This machine is completely decoupled from Vue
export const licensePlateMachine = createMachine(
    {
        id: 'license-plate',
        context: {
            currentGuess: null,
            correctGuesses: 0,
            incorrectGuesses: 0,
            history: [],
            punish: false,
            plate: 0,
        },
        initial: 'ready',
        states: {
            ready: {
                on: { START: 'playing' },
            },
            playing: {
                on: { END: 'finished' },
                initial: 'idle',
                entry: ['setNewGame'],
                states: {
                    idle: {
                        // entry actions
                        entry: ['setNewNumberPlate'],
                        on: {
                            GUESS: {
                                target: 'guessing',
                                // transition actions
                                actions: assign({
                                    currentGuess: (context, event) => {
                                        return event.value;
                                    },
                                    message: 'currentGuess changed',
                                }),
                            },
                        },
                    },
                    guessing: {
                        always: [{ target: 'hit', cond: 'isCorrect' }, { target: 'miss' }],
                    },
                    hit: {
                        entry: ['handleHit'],
                        on: { CONTINUE: 'idle' },
                        after: {
                            // after 1 second, transition to yellow
                            750: { target: 'idle' }
                        }
                    },
                    miss: {
                        entry: ['handleMiss'],
                        on: { CONTINUE: 'idle' },
                        after: {
                            // after 1 second, transition to yellow
                            1200: { target: 'idle' }
                        }
                    },
                },
            },
            finished: {
                on: { RESTART: 'ready' },
            },
        },
    },
    {
        actions: {
            // action implementations
            setNewNumberPlate: (context) => {
                context.plate = licensePlateEngine.randomNumber();
                context.currentGuess = null;
            },
            setNewGame: (context) => {
                context.history = [];
                context.currentGuess = null;
                context.correctGuesses = 0;
                context.incorrectGuesses = 0;
            },
            handleHit: (context) => {
                context.history.push(true);
                context.correctGuesses = context.correctGuesses + 1;
            },
            handleMiss: (context) => {
                context.history.push(false);
                context.incorrectGuesses = context.incorrectGuesses + 1;
                if (context.punish && context.correctGuesses !== 0) {
                    context.correctGuesses = context.correctGuesses - 1;
                }
            },
        },
        guards: {
            isCorrect: (context, _) => {
                return licensePlateEngine.check(context.plate, context.currentGuess);
            },
        },
    }
);
