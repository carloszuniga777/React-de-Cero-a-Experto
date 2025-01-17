import { getImagen } from "../../src/base-pruebas/11-async-await"

describe('Pruebas en 11-async-await', ()=>{
    test('getImagen debe retornar un URL de la imagen', async()=>{
        const url = await getImagen()

        // Valida que el resultado sea un string y tenga el formato de un URL
        expect(typeof url).toBe('string');
        expect(url).toMatch(/^https?:\/\/.+\.(png|jpg|jpeg|gif)$/);
    })

   
    /**
     *  Lo que hice en este test fue simular (mockear) un error en la función fetch 
     *  para comprobar cómo getImagen maneja los errores.
     *  
     * En lugar de realizar una solicitud real a la API de PokéAPI, 
     * forzamos un error en la función fetch para asegurarnos de que la función 
     * getImagen maneja correctamente los errores y devuelve el mensaje adecuado.
     * 
     * Aquí te explico paso a paso qué hace cada línea de este test:

         1. Simulando un error en fetch:
        
                    const originalFetch = globalThis.fetch;
                    
                    globalThis.fetch = vi.fn(() =>
                        Promise.reject(new Error("API unavailable"))
                    );


     Explicacion:
     
     const originalFetch = globalThis.fetch;: Guardamos la referencia original de fetch antes de modificarla. 
                                          Esto nos permitirá restaurarla después de realizar la prueba.

    globalThis.fetch = vi.fn(() => Promise.reject(new Error("API unavailable")));: Aquí reemplazamos la función global fetch por una versión simulada (mocked). 
                                                                                La función simulada (vi.fn) está configurada para devolver una promesa rechazada 
                                                                                con un error (simulando que la API está "indisponible" y no puede responder).



        2. Ejecutando la función que estamos probando:  

                    const url = await getImagen();
        
        Llamamos a getImagen como normalmente lo haríamos. Como hemos simulado un error en fetch, 
        la función getImagen no podrá obtener la imagen de la API y debería saltar al bloque catch.


        3. Verificando el resultado esperado:

                    expect(url).toBe("No se encontró la imagen");

         Ahora verificamos que getImagen maneja correctamente el error. Según el código que tienes en la función getImagen, 
         cuando ocurre un error, esta devuelve el mensaje "No se encontró la imagen".

            Este expect asegura que el mensaje que retorna getImagen en caso de error sea el esperado.


        4. Restaurando la función fetch original:

                    globalThis.fetch = originalFetch;
        
        Después de la prueba, restauramos la función fetch a su implementación original. Esto es importante para que otras pruebas 
        que utilicen fetch no se vean afectadas por el cambio que hicimos en esta prueba.
        
        Resumen:
        Este test está diseñado para asegurarse de que la función getImagen maneje correctamente los errores en la llamada a la API. 
        Simulamos un fallo en fetch y verificamos que, en lugar de devolver un resultado vacío o un error inesperado, 
        la función devuelve el mensaje adecuado de error: "No se encontró la imagen".

        La simulación (mocking) de fetch permite realizar pruebas controladas sin depender de la disponibilidad de la API real, 
        lo que hace que las pruebas sean más rápidas y predecibles.
     **/
    test("getImagen debe retornar un mensaje de error si falla", async () => {
        // Simular un error forzando un nombre de Pokémon inválido
        const originalFetch = globalThis.fetch;
        
        globalThis.fetch = vi.fn(() =>
          Promise.reject(new Error("API unavailable"))
        );
    
        const url = await getImagen();
    
        expect(url).toBe("No se encontró la imagen");
    
        // Restaurar fetch original
        globalThis.fetch = originalFetch;
      });
})