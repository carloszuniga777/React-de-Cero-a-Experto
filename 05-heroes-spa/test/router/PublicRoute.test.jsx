import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import { AuthContext } from '../../src/auth';
import { PublicRoute } from '../../src/router';


//Haciendo pruebas a PublicRoute
describe('Pruebas en <PublicRoute />', () => {
    
    test('debe de mostrar el children si no está autenticado', () => {
        
        //El contexto se establece en false, es decir que no esta logeado
        const contextValue = {
            logged: false
        }

        //Para poder hacer pruebas en  el <PublicRoute> se tiene que traer el context, 
        // por eso no se puede renderizar <PublicRoute> asi de puro
        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta pública</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        expect( screen.getByText(/Ruta pública/i) ).toBeTruthy();

    });

    //test del PublicRoute si el usuario esta autenticado muestra /marvel
    test('debe de navegar si está autenticado', () => { 

        // Configura el lastPath en localStorage en la ruta /marvel
        localStorage.setItem('lastPath', '/marvel');
        
        //Se establece el context en true, es decir que el usuario esta logeado
        const contextValue = {
            logged: true,
            user: {
                name: 'Strider',
                id: 'ABC123'
            }
        }

        // Como se el context se establecio en logeado, 
        // el PublicRoute no le va a permitir ver la ruta /login
        // Por lo tanto, se va a renderizar la ruta /marvel
       
        // El MemoryRouter simula la ruta actual donde esta el usuario, 
        // en este caso, esta en la pagina /Login 
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta pública</h1>
                            </PublicRoute>
                        } />
                        <Route path='marvel' element={ <h1>Página Marvel</h1> } />
                    </Routes>

                    
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //screen.debug() 
       
        //Espera que se renderice el texto de la ruta /marvel
       expect( screen.getByText(/Página Marvel/i) ).toBeTruthy();


    })
    

});