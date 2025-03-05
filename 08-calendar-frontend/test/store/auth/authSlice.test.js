import { authStatus } from "../../../src/helpers";
import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";



// Suite de pruebas para el authSlice (gestión de autenticación)
describe('Pruebas en authSlice', () => {
    
    // 1. Prueba del estado inicial
    test('debe de regresar el estado inicial', () => {

         // Verifica que el slice inicial coincida con el estado definido en los fixtures
        expect( authSlice.getInitialState() ).toEqual( initialState );
    });


     // 2. Prueba de login exitoso
    test('debe de realizar un login', () => {
        
        //Realiza la autenticacion
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ) );
        
        // Verifica la actualización correcta del estado tras el login
        expect( state ).toEqual({
            status: authStatus.AUTHENTICATED,     // Estado: Autenticado
            user: testUserCredentials,            // Usuario establecido en fixtures
            errorMessage: undefined
        })

    });


     // 3. Prueba de cerrar session
    test('debe de realizar el logout', () => {

        //Realiza el cierre de session
        const state = authSlice.reducer( authenticatedState, onLogout() );

        //Se espera que al cerrar session el estado sea no autenticado y no tenga el usuario
        expect( state ).toEqual({
            status: authStatus.NOT_AUTHENTICATED,  // Estado: No autenticado
            user: {},                              // Usuario vacío          
            errorMessage: undefined
        });
    });


     // 4. Prueba de logout CON mensaje de error
    test('debe de realizar el logout', () => { // eslint-disable-line
        
        //Mensaje de error
        const errorMessage = 'Credenciales no válidas'
        
        //Realiza el cierre de session con mensaje de error
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        
        //Se espera que al cerrar session el estado sea no autenticado, no tenga el usuario y tenga un error
        expect( state ).toEqual({
            status: authStatus.NOT_AUTHENTICATED,
            user: {},
            errorMessage: errorMessage   //Mensaje de error
        });
    });


      // 5. Prueba de limpieza de mensajes de error
    test('debe de limpiar el mensaje de error', () => {

        //Mensaje de error
        const errorMessage = 'Credenciales no válidas'

        // Primero cerramos session con un mensaje de error
        const state = authSlice.reducer( authenticatedState, onLogout(errorMessage) );
        
         // Luego limpiamos el error
        const newState = authSlice.reducer( state, clearErrorMessage() )
        
          // Verifica que la acción clearErrorMessage elimina el mensaje
        expect( newState.errorMessage ).toBe( undefined );
        
    });

});


// Explicación general del flujo de pruebas:
// 1. Verificación del estado inicial del slice
// 2. Flujo completo de autenticación:
//    - Login exitoso con credenciales
//    - Logout básico (sin error)
//    - Logout con mensaje de error
//    - Limpieza de mensajes de error
// 3. Se usan fixtures para mantener consistencia en los datos de prueba
// 4. Se testean todas las transiciones de estado importantes:
//    - Estado de autenticación
//    - Datos del usuario
//    - Manejo de mensajes de error