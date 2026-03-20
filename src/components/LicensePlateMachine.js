import {assign, setup} from 'xstate';
import {licensePlateEngine} from './LicensePlateEngine.js';

// This machine is completely decoupled from Vue
export const licensePlateMachine = setup({
    actions: {
        setNewNumberPlate: assign({
            plate: () => licensePlateEngine.randomNumber(),
            currentGuess: null
        }),
        setNewGame: assign({
            history: [],
            currentGuess: null,
            correctGuesses: 0,
            incorrectGuesses: 0
        }),
        handleHit: assign({
            correctGuesses: ({context}) => context.correctGuesses + 1
        }),
        handleMiss: assign({
            incorrectGuesses: ({context}) => context.incorrectGuesses + 1,
            correctGuesses: ({context}) => {
                if (context.punish && context.correctGuesses !== 0) {
                    return context.correctGuesses - 1;
                }
                return context.correctGuesses;
            }
        }),
        handleHistory: assign({
            history: ({context}) => {
                const newHistory = [...context.history];
                newHistory.push({
                    plate: context.plate,
                    guess: context.currentGuess,
                    isCorrect: licensePlateEngine.check(context.plate, context.currentGuess),
                    solve: licensePlateEngine.solve(context.plate, context.currentGuess)
                });
                return newHistory;
            }
        }),
    },
    guards: {
        isCorrect: ({context}) => {
            return licensePlateEngine.check(context.plate, context.currentGuess);
        },
    },
}).createMachine(
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
                                    currentGuess: ({event}) => {
                                        return event.value;
                                    },
                                }),
                            },
                        },
                    },
                    guessing: {
                        always: [{ target: 'hit', guard: 'isCorrect' }, { target: 'miss' }],
                    },
                    hit: {
                        entry: ['handleHit', 'handleHistory'],
                        on: { CONTINUE: 'idle' },
                        after: {
                            750: { target: 'idle' }
                        }
                    },
                    miss: {
                        entry: ['handleMiss', 'handleHistory'],
                        on: { CONTINUE: 'idle' },
                        after: {
                            1200: { target: 'idle' }
                        }
                    },
                },
            },
            finished: {
                on: { RESTART: 'ready' },
            },
        },
    }
);
