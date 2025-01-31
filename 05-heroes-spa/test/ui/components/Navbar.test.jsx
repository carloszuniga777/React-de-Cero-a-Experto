import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { AuthContext } from '../../../src/auth';
import { Navbar } from '../../../src/ui';


 //-------Creando el Mock 'useNavigate' -------------------    

/* 1. Mock de useNavigate: función falsa para rastrear llamadas
    - vi.hoisted asegura que el mock esté disponible tras el 'hoisting' de Vitest
 */   

    const mockedUseNavigate = vi.hoisted(() => vi.fn());

/* 2. Se hace Mock PARCIAL de 'react-router':
    - Usamos vi.importActual para mantener la funcionalidad REAL del módulo
    - Sobrescribimos SOLO useNavigate con nuestro mock
 */   

vi.mock('react-router', async () => {
   // Importa la versión REAL de react-router (no el mock)  
  const actual = await vi.importActual('react-router');

  // Combina lo real con nuestro mock de useNavigate
  return {
    ...actual,                                      // 🔁 Conserva todo lo original
    useNavigate: () => mockedUseNavigate,            // 🎭 Nuestro mock
  };
});

/* 🎯 Objetivo: 
     - Tests controlan useNavigate (sin navegador)
    - Resto de react-router funciona normalmente (MemoryRouter, Link, etc.)
*/

//---------------------------------------------------------

describe('Pruebas en <Navbar />', () => {

   //Context de usuario autenticado 
    const contextValue = {
        logged: true,
        user: {
            name: 'Juan Carlos'
        },
        logout: vi.fn()                   //funcion de cerrar session
    }


    //Limpieza de los mocks
    beforeEach(() => vi.clearAllMocks() );


    test('debe de mostrar el nombre del usuario', () => {
        
        //Se renderiza el contex AuthContext
        //Se utiliza MemoryRouter para crear un contexto minimo necesario para que componentes que usen funcionalidades de react-router (como useNavigate, NavLink, etc.) funcionen en los tests, aunque no se definan rutas explícitamente
        //Ser renderiza Navbar
        render(
            <AuthContext.Provider value={ contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter> 
            </AuthContext.Provider>
        );
        
        //screen.debug()

        //Se espera en que se renderice el nombre de Juan Carlos
        expect( screen.getByText('Juan Carlos') ).toBeTruthy();
        

    });


    //Simulando que el usuario va a cerrar session
    test('debe de llamar el logout y navigate cuando se hace click en el botón', () => {

        render(
            <AuthContext.Provider value={ contextValue}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter> 
            </AuthContext.Provider>
        );

        //buscando el boton de cerrar session
        const logoutBtn = screen.getByRole('button');
        
        //dispara el evento click para que cierre session
        fireEvent.click( logoutBtn );

        //Espera que del context haya sido llamada la funcion Logout
        expect( contextValue.logout ).toHaveBeenCalled()

        //Espera que se haya llamado la funcion useNavigate con las propiedades: '/login' y "replace": true
        expect( mockedUseNavigate ).toHaveBeenCalledWith('/login', {"replace": true})


    });

    
});

