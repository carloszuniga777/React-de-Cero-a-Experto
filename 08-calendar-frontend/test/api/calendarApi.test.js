import { calendarAPI } from "../../src/api";


describe('Pruebas en el CalendarApi', () => {
    
    //Verifica que el variable de entorno sea la misma que utiliza el calendarAPI
    test('debe de tener la configuración por defecto', () => {

        // console.log(calendarAPI);
        // console.log(import.meta.env.VITE_API_URL)
        expect( calendarAPI.defaults.baseURL ).toBe( import.meta.env.VITE_API_URL );
    
    });

    

    //Se evalua que todas las peticiones tenga un header x-token
    test('debe de tener el x-token en el header de todas las peticiones', async() => {

        //Se crea un token generico
        const token = 'ABC-123-XYZ'

        //Se almacena en el localstorage para que el interceptor de axios pueda obtenerlo        
        localStorage.setItem('token', token );
        
        //Se hace una peticion, no importa si en enpoint existe o no
        const res = await calendarAPI.get('/auth');

        //console.log(res)

        //Se espera que la peticion tenga un header x-token con valor 'ABC-123-XYZ'    
        expect(res.config.headers['x-token']).toBe( token );
        
    });

});