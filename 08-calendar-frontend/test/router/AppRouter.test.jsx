// Importaciones necesarias para las pruebas
import { render, screen } from '@testing-library/react';     // Utilidades de React Testing Library
import { MemoryRouter } from 'react-router';                 // Router en memoria para pruebas
import { useAuthStore } from '../../src/hooks/useAuthStore'; // Hook de autenticación
import { AppRouter } from '../../src/router/AppRouter';      // Componente a probar
import { authStatus } from '../../src/helpers';             // Constantes de estado de autenticación
//import { CalendarPage } from '../../src/calendar';     // eslint-disable-line    



// Mockear el hook  de autenticación useAuthStore() para controlar su comportamiento en pruebas
vi.mock('../../src/hooks/useAuthStore');

//Mockear la página del calendario para evitar renderizado real
vi.mock('../../src/calendar', () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}));


describe('Pruebas en <AppRouter />', () => {

    // Función mock para simular checkAuthToken
    const mockCheckAuthToken = vi.fn();
    
    // Limpiar mocks antes de cada prueba
    beforeEach(() => vi.clearAllMocks());


    /* Prueba 1: Estado de carga inicial */
    test('debe de mostrar la pantalla de carga y llamar checkAuthToken', () => {
        
        // Configurar mock del hook para que devuelva el estado de aunteticacion en CHECKING 
        // y una funcion mockeada de checkAuthToken
        useAuthStore.mockReturnValue({
            status: authStatus.CHECKING,
            checkAuthToken: mockCheckAuthToken
        });



        // Renderizar el componente <AppRouter> dentro de un MemoryRouter
        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        // Verificar que se muestre el mensaje de carga
        expect(screen.getByText('Cargando...')).toBeTruthy();
        
        // Verificar que se llamó a checkAuthToken
        expect(mockCheckAuthToken).toHaveBeenCalled();
    });



    /* Prueba 2: Redirección a login cuando no está autenticado y la ruta no existe*/
    test('debe de mostrar el login en caso de no estar autenticado', () => {
        
        // Configurar mock del hook para estado NOT_AUTHENTICATED
        useAuthStore.mockReturnValue({
            status: authStatus.NOT_AUTHENTICATED,
            checkAuthToken: mockCheckAuthToken
        });



        // Renderizar al login cuando se ingresa una ruta no existente
        const { container } = render(
            <MemoryRouter initialEntries={['/auth2/algo/otracosa']}>
                <AppRouter />
            </MemoryRouter>
        );


        // Verificar que se muestre el formulario de login
        expect(screen.getByText('Ingreso')).toBeTruthy();
        
        // Snapshot para comparar estructura HTML
        expect(container).toMatchSnapshot();
    });




    /* Prueba 3: Mostrar calendario cuando está autenticado */
    test('debe de mostrar el calendario si estamos autenticados', () => {
    
        // Configurar mock del hook para estado AUTHENTICATED
        useAuthStore.mockReturnValue({
            status: authStatus.AUTHENTICATED,
            checkAuthToken: mockCheckAuthToken
        });

        // Renderizar el componente
        render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        // Verificar que se renderiza la página del calendario
        expect(screen.getByText('CalendarPage')).toBeTruthy();
    });


});