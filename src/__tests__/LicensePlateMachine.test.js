import { describe, it, expect } from 'vitest'
import { createActor } from 'xstate'
import { licensePlateMachine } from '../components/LicensePlateMachine.js'

function startActor() {
    const actor = createActor(licensePlateMachine)
    actor.start()
    return actor
}

describe('licensePlateMachine', () => {
    it('starts in the ready state', () => {
        const actor = startActor()
        expect(actor.getSnapshot().matches('ready')).toBe(true)
        actor.stop()
    })

    it('transitions to playing on START', () => {
        const actor = startActor()
        actor.send({ type: 'START' })
        expect(actor.getSnapshot().matches('playing')).toBe(true)
        actor.stop()
    })

    it('initializes context on setNewGame entry', () => {
        const actor = startActor()
        actor.send({ type: 'START' })
        const ctx = actor.getSnapshot().context
        expect(ctx.correctGuesses).toBe(0)
        expect(ctx.incorrectGuesses).toBe(0)
        expect(ctx.history).toEqual([])
        expect(ctx.currentGuess).toBeNull()
        actor.stop()
    })

    it('sets a plate number when entering idle', () => {
        const actor = startActor()
        actor.send({ type: 'START' })
        const ctx = actor.getSnapshot().context
        expect(ctx.plate).toBeGreaterThan(0)
        actor.stop()
    })

    it('records a correct guess in context', () => {
        const actor = startActor()
        actor.send({ type: 'START' })
        const plate = actor.getSnapshot().context.plate

        // Import solve to find the correct answer
        const { licensePlateEngine } = require('../components/LicensePlateEngine.js')
        const correct = licensePlateEngine.solve(plate)

        actor.send({ type: 'GUESS', value: correct })

        // After hit, correctGuesses should be 1
        const snapshot = actor.getSnapshot()
        expect(snapshot.context.correctGuesses).toBe(1)
        expect(snapshot.context.incorrectGuesses).toBe(0)
        actor.stop()
    })

    it('records an incorrect guess in context', () => {
        const actor = startActor()
        actor.send({ type: 'START' })
        const plate = actor.getSnapshot().context.plate

        const { licensePlateEngine } = require('../components/LicensePlateEngine.js')
        const correct = licensePlateEngine.solve(plate)
        // Pick a wrong answer (cycle through 1-9 skipping correct)
        const wrong = correct === 9 ? 1 : correct + 1

        actor.send({ type: 'GUESS', value: wrong })

        const snapshot = actor.getSnapshot()
        expect(snapshot.context.incorrectGuesses).toBe(1)
        expect(snapshot.context.correctGuesses).toBe(0)
        actor.stop()
    })

    it('transitions to finished on END', () => {
        const actor = startActor()
        actor.send({ type: 'START' })
        actor.send({ type: 'END' })
        expect(actor.getSnapshot().matches('finished')).toBe(true)
        actor.stop()
    })

    it('restarts to ready state on RESTART', () => {
        const actor = startActor()
        actor.send({ type: 'START' })
        actor.send({ type: 'END' })
        actor.send({ type: 'RESTART' })
        expect(actor.getSnapshot().matches('ready')).toBe(true)
        actor.stop()
    })

    it('adds an entry to history after each guess', () => {
        const actor = startActor()
        actor.send({ type: 'START' })
        const plate = actor.getSnapshot().context.plate

        const { licensePlateEngine } = require('../components/LicensePlateEngine.js')
        const correct = licensePlateEngine.solve(plate)

        actor.send({ type: 'GUESS', value: correct })

        const ctx = actor.getSnapshot().context
        expect(ctx.history).toHaveLength(1)
        expect(ctx.history[0].plate).toBe(plate)
        expect(ctx.history[0].isCorrect).toBe(true)
        actor.stop()
    })
})
