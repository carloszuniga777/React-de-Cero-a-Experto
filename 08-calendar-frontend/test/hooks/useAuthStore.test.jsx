// Importaciones necesarias para las pruebas
import { configureStore } from '@reduxjs/toolkit'; // Configuración del store de Redux
import { act, renderHook, waitFor } from '@testing-library/react'; // Utilidades para pruebas en React
import { Provider } from 'react-redux'; // Integración de Redux con React
import { authSlice } from '../../src/store'; // Slice de autenticación
import { initialState, notAuthenticatedState } from '../fixtures/authStates'; // Estados predefinidos para pruebas
import { useAuthStore } from '../../src/hooks/useAuthStore'; // Hook personalizado a probar
import { testUserCredentials } from '../fixtures/testUser'; // Credenciales de prueba
import { calendarAPI } from '../../src/api'; // API para operaciones de autenticación
import { authStatus } from '../../src/helpers'; // Constantes de estado de autenticación

// Mock del store de redux del authSlice
// se realiza este mock ya que el hook hace uso del store por medio useSelector()

// Función para crear un store de Redux con estado inicial personalizado
const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer, // Reducer del slice de autenticación
        },
        preloadedState: {
            auth: { ...initialState } // Estado inicial del store personalizado
        }
    });
}



//Testiando el custom hook de autenticacion useAuthStore()
describe('Pruebas en useAuthStore', () => {
    
    // Limpiar localStorage antes de cada prueba
    beforeEach(() => localStorage.clear());



    /* Prueba 1: Valores iniciales del hook */
    test('debe de regresar los valores por defecto', () => {
        
        // Crear store con estado inicial de auntenticacion en CHECKING
        const mockStore = getMockStore({ ...initialState });

        // Renderizar el hook dentro de un Provider de Redux
        const { result } = renderHook(() => useAuthStore(), {

            //Wrapper: Componente que envuelve el hook para proporcionar contexto necesario   
            //(en este caso, un Provider de Redux con un store mockeado) 
            wrapper: ({ children }) => <Provider store={mockStore}>
                                            {children}
                                        </Provider>
        });



        // Verificar estructura inicial del hook
        expect(result.current).toEqual({
            errorMessage: undefined,                // Se espera que el mensaje de error sea undefined
            status: authStatus.CHECKING,            // Se espera que el status sea checking
            user: {},                               // Se espera que el usuario este vacio
            checkAuthToken: expect.any(Function),   // Se espera una funcion
            startLogin: expect.any(Function),       // Se espera una funcion
            startLogout: expect.any(Function),      // Se espera una funcion 
            startRegister: expect.any(Function),    // Se espera una funcion 
        });
    });





    /* Prueba 2: Login exitoso */
    test('startLogin debe de realizar el login correctamente', async () => {
        
        // Crear store en estado no autenticado
        const mockStore = getMockStore({ ...notAuthenticatedState });
        

        // Renderizar el hook dentro de un Provider de Redux
        const { result } = renderHook(() => useAuthStore(), {

            //Wrapper: Componente que envuelve el hook para proporcionar contexto necesario   
            //(en este caso, un Provider de Redux con un store mockeado) 
            wrapper: ({ children }) => <Provider store={mockStore}>
                                            {children}
                                        </Provider>
        });


        //1. Ejecutar login con credenciales válidas
        await act(async () => {
            await result.current.startLogin(testUserCredentials);
        });



        //2. Verificar estado tras login exitoso
        const { errorMessage, status, user } = result.current;

        //2.1 Se espera que el login devuelva un objeto del store con las informacion del usuario logeado
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: authStatus.AUTHENTICATED, // Usuario autenticado
            user: { name: testUserCredentials.name, uid: testUserCredentials.uid }
        });



        //2.2. Verificar token almacenado en localStorage
        expect(localStorage.getItem('token')).toEqual(expect.any(String));             //Se espera que localstorage tenga un string
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));   //Se espera que localstorage tenga un string
    });





    /* Prueba 3: Login fallido */
    test('startLogin debe de fallar la autenticación', async () => {
        
        // Crear store en estado no autenticado
        const mockStore = getMockStore({ ...notAuthenticatedState });
        

         // Renderizar el hook dentro de un Provider de Redux
         const { result } = renderHook(() => useAuthStore(), {

            //Wrapper: Componente que envuelve el hook para proporcionar contexto necesario   
            //(en este caso, un Provider de Redux con un store mockeado) 
            wrapper: ({ children }) => <Provider store={mockStore}>
                                            {children}
                                        </Provider>
        });

        
        //1. Intentar login con credenciales inválidas
        await act(async () => {
            await result.current.startLogin({ email: 'algo@google.com', password: '123456789' });
        });


        //2. Verificar estado tras fallo en login
        const { errorMessage, status, user } = result.current;
        
        //2.1 Se espera que no haya un token despues del fallo
        expect(localStorage.getItem('token')).toBe(null); // No debe haber token
    
        
        //2.2 Se espera devuelva un objeto del store con la informacion no auntenticado
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas', // Mensaje de error esperado
            status: authStatus.NOT_AUTHENTICATED,
            user: {}
        });

        //2.3 Verificar que el mensaje de error se limpie automáticamente
        await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
    });




    /* Prueba 4: Registro exitoso de usuario */
    test('startRegister debe de crear un usuario', async () => {
        
        //Informacion de un nuevo usuario
        const newUser = { email: 'algo@google.com', password: '123456789', name: 'Test User 2' };
        
         // Crear store en estado no autenticado
        const mockStore = getMockStore({ ...notAuthenticatedState });
       

         // Renderizar el hook dentro de un Provider de Redux
        const { result } = renderHook(() => useAuthStore(), {

            //Wrapper: Componente que envuelve el hook para proporcionar contexto necesario   
            //(en este caso, un Provider de Redux con un store mockeado) 
            wrapper: ({ children }) => <Provider store={mockStore}>
                                            {children}
                                        </Provider>
        });


        // Mockear respuesta exitosa de la API
        // Se mockea la respuesta porque en realidad no lo estamos creando en la base de datos
        // Se tiene que hacer antes del act() para que no registre el usuario en la base de datos
        
        // Lo que le dice esta es la respuesta que va a devolver calendarAPI, cuando se ejecute startRegister()
        const spy = vi.spyOn(calendarAPI, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: '1263781293',
                name: 'Test User',
                token: 'ALGUN-TOKEN'
            }
        });



        //1. Ejecutar registro del usuario
        await act(async () => {
            await result.current.startRegister(newUser);
        });


        //2. Verificar estado tras registro exitoso
        const { errorMessage, status, user } = result.current;

       //2.1 Se espera que el registro del usuario sea exitoso, y ponga en estado autenticado     
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: authStatus.AUTHENTICATED,                   //Se espera que despues del registro este autenticado
            user: { name: 'Test User', uid: '1263781293' }
        });



        //3. Restaurar el mock después de la prueba
        spy.mockRestore(); 
    });




    /* Prueba 5: Registro fallido (usuario existente) */
    test('startRegister debe de fallar la creación', async () => {
        
        // Crear store en estado no autenticado
        const mockStore = getMockStore({ ...notAuthenticatedState });
        


         // Renderizar el hook dentro de un Provider de Redux
         const { result } = renderHook(() => useAuthStore(), {

            //Wrapper: Componente que envuelve el hook para proporcionar contexto necesario   
            //(en este caso, un Provider de Redux con un store mockeado) 
            wrapper: ({ children }) => <Provider store={mockStore}>
                                            {children}
                                        </Provider>
        });


        // Intentar registrar un usuario existente
        await act(async () => {
            await result.current.startRegister(testUserCredentials);
        });

        // Verificar estado tras fallo en registro
        const { errorMessage, status, user } = result.current;
        
        
        //Se espera que al autenticar un usuario existente, devuelva un error y que no lo deje autenticar
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'El usuario ya existe con ese correo', // Error esperado
            status: authStatus.NOT_AUTHENTICATED,
            user: {}
        });
    });




    /* Prueba 6: checkAuthToken sin token */
    //Pruebas con la renovacion de Token de autenticacion
    test('checkAuthToken debe de fallar si no hay token', async () => {
        
         // Crear store en estado de autenticacion CHECKING 
        const mockStore = getMockStore({ ...initialState });
        


         // Renderizar el hook dentro de un Provider de Redux
         const { result } = renderHook(() => useAuthStore(), {

            //Wrapper: Componente que envuelve el hook para proporcionar contexto necesario   
            //(en este caso, un Provider de Redux con un store mockeado) 
            wrapper: ({ children }) => <Provider store={mockStore}>
                                            {children}
                                        </Provider>
        });


        //Localstorage sin token
       //console.log('token', localStorage.getItem('token'))

        // Ejecuta la renovacion de Token
        await act(async () => {
            await result.current.checkAuthToken();
        });

        //Verificar el estado 
        const { errorMessage, status, user } = result.current;
        
        // Se espera que el estado de autenticacion cambie a no autenticado, 
        // esto debido a que cuando la renovacion de token, si no encuentra un token en localstorage, 
        // ejecuta el logout para cerrar la session
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: authStatus.NOT_AUTHENTICATED, // Usuario no autenticado
            user: {}
        });

    });




    /* Prueba 7: checkAuthToken con token válido */
    test('checkAuthToken debe de autenticar el usuario si hay un token', async () => {
       

        
        // Obtener token real mediante login
        // Tambien se puede hacer un mock del espia como en prueba 4 para que 
        // calendarAPI devueva una respuesta con autenticacion existosa
        const { data } = await calendarAPI.post('/auth', testUserCredentials);
       

       //Almacena el token en el localstorage
        localStorage.setItem('token', data.token);


        // Crear store con estado inicial de autenticacion en CHECKING
        const mockStore = getMockStore({ ...initialState });
        
        
        // Renderizar el hook dentro de un Provider de Redux
         const { result } = renderHook(() => useAuthStore(), {

            //Wrapper: Componente que envuelve el hook para proporcionar contexto necesario   
            //(en este caso, un Provider de Redux con un store mockeado) 
            wrapper: ({ children }) => <Provider store={mockStore}>
                                            {children}
                                        </Provider>
        });




        // Ejecuta la renovacion de Token
        await act(async () => {
            await result.current.checkAuthToken();
        });



        // Verificar autenticación mediante token
        const { errorMessage, status, user } = result.current;

        //Se espera que el estado de autenticacion del usuario se auntenticado y la informacion del usuario
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: authStatus.AUTHENTICATED, // Usuario autenticado
            user: { name: testUserCredentials.name, uid: testUserCredentials.uid }
        });
    });
});