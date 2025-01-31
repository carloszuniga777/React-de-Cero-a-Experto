import { authReducer, types } from "../../../src/auth";

//Test en el reducer
describe('Pruebas en authReducer', () => {
    

    //Test inicial del reducer
    test('debe de retornar el estado por defecto', () => {

        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual({ logged: false });

    });

    //Simulando  el login: El estado inicial del reducer es logged=false, cuando el usuario inicia session, este estado cambia a true
    test('debe de (login) llamar el login autenticar y establecer el user', () => {

        const action = {
            type: types.login,
            payload: {
                name: 'Juan',
                id: '123'
            }
        }

        const state = authReducer({ logged: false }, action );
        
        expect( state ).toEqual({
            logged: true,
            user: action.payload
        })

    });


//Simulando el cierre de session, el estado inicial del reducer es logged=true, cuando el usuario cierra sesion este cambia a false
    test('debe de (logout) borrar el name del usuario y logged en false ', () => {

        const state = {
            logged: true,
            user: { id: '123', name: 'Juan' }
        }

        const action = {
            type: types.logout
        }

        const newState = authReducer( state, action );

        expect( newState ).toEqual({ logged: false })

    });


});