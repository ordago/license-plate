import { expect, test, describe } from 'vitest'

test('la matemática básica funciona', () => {
  expect(1 + 1).toBe(2)
})

describe('Pruebas de lógica de Matrículas', () => {

  test('debe detectar una matrícula española válida', () => {
    const matricula = "1234BBB";
    //expresión regular 
    const regex = /^\d{4}[BCDFGHJKLMNPQRSTVWXYZ]{3}$/;
    expect(regex.test(matricula)).toBe(true);
  });

  test('no debe aceptar matrículas con vocales (en España)', () => {
    const matriculaInvalida = "1234AAA"; // La 'A' no se usa en el sistema nuevo
    const regex = /^\d{4}[BCDFGHJKLMNPQRSTVWXYZ]{3}$/;
    expect(regex.test(matriculaInvalida)).toBe(false);
  });

  test('debe limpiar espacios y guiones', () => {
    const sucia = " 1234-BBB ";
    const limpia = sucia.replace(/[-\s]/g, "").trim();
    expect(limpia).toBe("1234BBB");
  });

});