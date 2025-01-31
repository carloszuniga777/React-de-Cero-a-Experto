import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AuthContext } from '../../src/auth';
import { AppRouter } from '../../src/router';


describe('Pruebas en <AppRouter />', () => {
    
    test('debe de mostrar el login si no está autenticado', () => {

        //Context no autenticado
        const contextValue = {
            logged: false,
        }


        // Si el usuario no esta autenticado, y se encuentra en la ruta /marvel
        // Lo redirige al Login 

        //MemoryRouter: Ruta donde se encuentra el usuario
        //AuthContext: Context mantiene la session del usuario
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        //screen.debug()


        // Se espera que se renderice los textos del 'Login' del <h1> <button> del Login  
        expect( screen.getAllByText('Login').length ).toBe(2)

        
    });



    test('debe de mostrar el componente de Marvel si está autenticado', () => {
        
        //Context: Usuario autenticado
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Juan Carlos'
            }
        }

        // Si el usuario se encuentra en la pagina /Login y luego se autentica
        // Este lo redirige a una de las paginas de la Web (/marvel)
        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={ contextValue }>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>
        );
        
       // screen.debug()

        
        //Se espera que la palabra Marvel debe aparecer al menos una vez    
        expect( screen.getAllByText('Marvel').length ).toBeGreaterThanOrEqual(1);

        

    });


});