import {  renderHook, act  } from "@testing-library/react"
import { useCounter } from "../../src/hooks"




describe('Pruebas en Useconter', ()=>{
       let result

    beforeEach(()=>{
        const { result: hookResult } = renderHook(()=> useCounter())
        result = hookResult;
    })

     test('debe de retornar los valores por defecto', () => { 
         const {counter, increment, decrement, reset} = result.current

         expect(counter).toBe(10)                               // El valor por defecto debe ser 10
         expect(decrement).toEqual(expect.any(Function))        // decrement debe ser una función
         expect(increment).toEqual(expect.any(Function))        // increment debe ser una función
         expect(reset).toEqual(expect.any(Function))            // reset debe ser una función
      })


    test('debe de generar el counter con el valor de 100', ()=>{

        const { result} = renderHook(()=> useCounter(100))

        expect(result.current.counter).toBe(100)                               // El valor debe ser 100
    })


    test('debe de incrementar el contador', ()=>{
       
        act(() => {
            result.current.increment();
            result.current.increment(2);
        });

        expect(result.current.counter).toBe(13)
    })


    test('debe de decrementar el contador', ()=>{
       
        act(() => {
            result.current.decrement();
            result.current.decrement(2);
        });

        expect(result.current.counter).toBe(7)
    })


    test('debe de realizar el reset', ()=>{
       
        act(() => {
            result.current.increment(2);
            result.current.reset();
        });

        expect(result.current.counter).toBe(10)
    })


    
})

