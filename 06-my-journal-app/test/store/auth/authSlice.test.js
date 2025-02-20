import { authSlice, checkingCredentials, login, logout } from "../../../src/store";
import {  authenticatedState, demoUser, initialState  } from "../../fixtures/authFixtures";



describe('Pruebas en el authSlice', () => {

    //Evaluando el estado inicial y el nombre del slice de autenticacion
    test('debe de regresar el estado inicial y llamarse "auth"', () => {
        
        const state = authSlice.reducer( initialState, {});

        expect( state ).toEqual( initialState );
        expect( authSlice.name ).toBe('auth');

    });

    //Evualuando el estado de autenticacion con credenciales del usuario demoUser
    test('debe de realizar la autenticación', () => {

        //auntenticacion | estado inicial: initialState | credenciales: demoUser
        const state = authSlice.reducer( initialState, login( demoUser ) );
        
        //Se espera que el estado cambie de checking a authenticated
        expect( state ).toEqual({
            status: 'authenticated', // 'checking', 'not-authenticated', 'authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });


   //Evaluando el cierre de sesion
    test('debe de realizar el logout sin argumentos', () => {

        // cerrar sesion        | estado inicial: authenticatedState
        const state = authSlice.reducer( authenticatedState, logout() );
        
        //Se espera que el estado cambie de authenticated a not-authenticated
        expect(state).toEqual({
            status: 'not-authenticathed',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined
        })
    });


  //Evaluando el cierre de sesion y mostrar el mensaje de error
    test('debe de realizar el logout y mostrar un mensaje de error', () => {

       
        const errorMessage = 'Credenciales no son correctas';

        // cerrar sesion       | estado inicial: authenticatedState
        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );
       
       
        //Se espera que el estado cambie de authenticated a not-authenticated y se muestre el mensaje de error
        expect(state).toEqual({
            status: 'not-authenticathed',
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        });
        
    });


    test('debe de cambiar el estado a checking', () => {
       
        //verificar que cambie de estado a checking | estado inicial: authenticatedState
        const state = authSlice.reducer( authenticatedState, checkingCredentials() );
        expect( state.status ).toBe('checking');
    });

    
});