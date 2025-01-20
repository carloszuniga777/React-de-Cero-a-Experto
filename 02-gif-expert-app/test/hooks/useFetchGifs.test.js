import { test, describe, beforeEach, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useFetchGifs } from "../../src/hooks/useFetchGifs";


describe('prueba en el hook useFethGift', ()=>{
     let result


    beforeEach(()=>{
        const { result: hookResult } = renderHook(()=> useFetchGifs('Dragon ball')) 
        result = hookResult;
    })
    
    test('debe de regresar el estado inicial', ()=>{
        const { images, isLoading } = result.current;

        // Estado inicial esperado
        expect(images.length).toBe(0); // El array de imágenes debe empezar vacío
        expect(isLoading).toBeTruthy(); // isLoading debe ser true al inicio
    })    


    test('debe de retornar un arreglo de imagenes y isloading en false', async()=>{
        
        // Esperamos a que el estado del hook cambie
       await waitFor(() => expect(result.current.images.length).toBeGreaterThan(0));

       const { images, isLoading } = result.current;

       // Validamos los estados finales
       expect(images.length).toBeGreaterThan(0);    // Debería contener imágenes
       expect(isLoading).toBeFalsy();               // isLoading debería ser false

    })

})