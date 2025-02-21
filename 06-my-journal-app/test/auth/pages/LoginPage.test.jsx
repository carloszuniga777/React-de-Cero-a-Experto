 import { fireEvent, screen,  render} from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router';



import { LoginPage } from '../../../src/auth/pages';
import { authSlice, startGoogleSignIn } from '../../../src/store';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

//-----Haciendo mock de los thunks que LoginPage utiliza  -----------

// Se realiza el mock de los thunks startGoogleSignIn y startLoginWithEmailPassword
// Para hacer uso en los test 2 y 3

const mockStartGoogleSignIn = vi.fn();
const mockStartLoginWithEmailPassword = vi.fn();

vi.mock('../../../src/store/auth/thunks', () => {

    return {
        startGoogleSignIn: () => mockStartGoogleSignIn,
        startLoginWithEmailPassword: ({ email, password }) => {
            return () => mockStartLoginWithEmailPassword({ email, password });
        },
    };
});

//---------------------------------------------------------------

//Haciendo mock del useDispatch para simular los dispatch
//Nota: No vi necesario hacer esto

/*
vi.mock('react-redux', () => ({
    ...require('react-redux'), 
    useDispatch: () => (fn) => fn(),
}));
*/


//-----------Configuracion del Store de Redux Auth----------------

const store = configureStore({
    reducer: {
        auth: authSlice.reducer         //Se obtiene el Slice de Auth
    },
    preloadedState: {
        auth: notAuthenticatedState    //Establece el reducer de Auth con un estado inicial de 'not-authenticathed' | util para habilitar el boton de autenticacion y porder hacer pruebas
    }
})

//---------------------------------------------------------------


describe('Pruebas en <LoginPage />', () => {

    //Limpia los mocks 
    beforeEach(() => vi.clearAllMocks() );

    
    //Pruebas con la renderizacion correcta del componente <LoginPage/>
    test('debe de mostrar el componente correctamente', () => {
        
        render(
            <Provider store={ store }>   {/**Store de Redux */}
                <MemoryRouter>           {/**Router */}
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // screen.debug()
        
        //Espera que se renderice al menos una palabra 'Login'
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);
    });


   //Pruebas del boton de iniciar session con Google
    test('boton de google debe de llamar el startGoogleSignIn', () => { 
        

        //Renderiza la pagina
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        //Obtiene la referencia del boton de google
        const googleBtn = screen.getByLabelText('google-btn');


         // screen.debug()
        
        //Realiza click
        fireEvent.click( googleBtn );


        //Se espera que si da click al boton sea llamado el mock de la funcion  startGoogleSignIn
        expect( mockStartGoogleSignIn ).toHaveBeenCalled();      //Para llamar esta funcion es necesario hacer mock de los thunks     

    });




    test('submit debe de llamar startLoginWithEmailPassword', () => {
         
        //Valores que se escriben en el formulario 
        const email    = 'fernando@google.com';
        const password = '123456';
        

        //renderiza el componente
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        
        //-------------Correo ---------------------

        //Se obtiene la referencia de textfield de correo
        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        
        //Escribe el correo electronico en el texfield
        fireEvent.change( emailField, { target: { name: 'email', value: email } });
        
        //------------------------------------------




        //-------------------Contrasena-----------------

        //Se obtiene la referencia del texfield de password por medio de id 
        const passwordField = screen.getByTestId('password');

        //Se escribe la contrasena en el textfield   
        fireEvent.change( passwordField, { target: { name: 'password', value: password } });
        
        //------------------------------------------------------ 




        //------------------Formulario-----------------------
         
        //Se obtiene la referencia del formulario por medio del arial label
        const loginForm = screen.getByLabelText('submit-form');
        
        //Se hace submit
        fireEvent.submit( loginForm );

        //-----------------------------------------------------


        
        //Se espera que el mock de la funcion startLoginWithEmailPassword haya sido llamado con los valores del formulario email y password  
        expect( mockStartLoginWithEmailPassword ).toHaveBeenCalledWith({     //Para llamar esta funcion es necesario hacer mock de los thunks     
            email: email,      
            password: password
        })


    });

    
});
