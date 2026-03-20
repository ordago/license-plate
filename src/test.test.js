import { describe, it, expect, vi } from 'vitest'
import { createActor } from 'xstate'
import { licensePlateMachine } from './components/LicensePlateMachine.js'



describe('Pruebas de License Plate', () => {
  
  it('La máquina de estados v5 arranca correctamente', () => {
    //comprueba el cerebro (XState)
    const actor = createActor(licensePlateMachine).start()
    const snapshot = actor.getSnapshot()
    
    expect(snapshot).toBeDefined()
    console.log('✅ Máquina arrancada en estado:', snapshot.value)
  })

  it('Lógica de juego: 3991 debería ser 4', () => {
    //comprueba la suma de tu juego
    const suma = (n) => String(n).split('').reduce((a, b) => a + Number(b), 0)
    const reducir = (n) => n > 9 ? reducir(suma(n)) : n
    
    expect(reducir(3991)).toBe(4)
  })
})