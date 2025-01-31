import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AuthContext } from '../../src/auth';
import { PrivateRoute } from  '../../src/router';


describe('Pruebas en el <PrivateRoute />', () => {

    test('debe de mostrar el children si está autenticado', () => {

        //Simulando el localStorage
        Storage.prototype.setItem = vi.fn();

        
        const contextValue = {
            logged: true,
            user: {
                id: 'abc',
                name: 'Juan Carlos'
            }
        }

         //Si el usuario no esta logeado podra ver la el mensaje de Ruta Privada 
        
         // El MemoryRouter simula la ruta actual donde esta el usuario, 
         // en este caso, esta en la pagina /search 
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //Evaluando que se renderice el texto Ruta privada
        expect( screen.getByText('Ruta privada') ).toBeTruthy();

        //Evaludando que el localStorage.setItem haya sido llamando con los valores de 'lastPath' y '/search?q=batman' 
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman');

    });


    
});