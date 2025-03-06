 import { configureStore } from '@reduxjs/toolkit';
 import { act, renderHook } from '@testing-library/react';
 import { Provider } from 'react-redux';
import { useUiStore } from '../../src/hooks/useUiStore';
import { uiSlice } from '../../src/store';


//Mock del store de redux del uiSlice, 
// se realiza este mock ya que el hook hace uso del store por medio useSelector()
const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer    //Reducer del uiSlice
        },
        preloadedState: {
            ui: { ...initialState }   // Estado inicial personalizable
        }
    })
}




// Testing del custom Hook useUiStore() para el control de modal
describe('Pruebas en useUiStore', () => {



    /* Prueba 1: Estado inicial del hook */
    test('debe de regresar los valores por defecto', () => {
         
        
        // Configura store mock de redux con modal cerrado
        const mockStore = getMockStore({ isDateModalOpen: false });


        // Renderiza el hook useUiStore() dentro de un Provider con el store mockeado
        const { result } = renderHook( () => useUiStore(), 
        {   
            //Wrapper: Componente que envuelve el hook para proporcionar contexto necesario   
            //(en este caso, un Provider de Redux con un store mockeado) 
            wrapper: ({ children }) => <Provider store={ mockStore }>
                                                { children }
                                        </Provider>
        });


        // Verifica estructura inicial del hook
        expect(result.current).toEqual({
            isDateModalOpen: false,                 //Se espera que devuelva false                 
            closeDateModal: expect.any(Function),   //Se espera que devuelva una funcion
            openDateModal: expect.any(Function),    //Se espera que devuelva una funcion
            toggleDateModal: expect.any(Function),  //Se espera que devuelva una funcion
        });
        
    });
    

    /* Prueba 2: Apertura del modal */
    test('openDateModal debe de colocar true en el isDateModalOpen', () => {
        
         // Store inicial con modal cerrado
        const mockStore = getMockStore({ isDateModalOpen: false });


        // Renderiza el hook useUiStore() dentro de un Provider con el store mockeado
        const { result } = renderHook( () => useUiStore(), 
        {   
            //Wrapper: Componente que envuelve el hook para proporcionar contexto necesario   
            //(en este caso, un Provider de Redux con un store mockeado) 
            wrapper: ({ children }) => <Provider store={ mockStore }>
                                                { children }
                                        </Provider>
        });



        const { openDateModal } = result.current;

         // Ejecuta acción para abrir modal
        act( () => {
            openDateModal();
        });

        // Verifica cambio de estado
        // Se espera que el estado del store pase de falso a true
        expect( result.current.isDateModalOpen ).toBeTruthy();


    });



      /* Prueba 3: Cierre del modal */
    test('closeDateModal debe de colocar false en isDateModalOpen', () => {
        
        // Store inicial con modal abierto
        const mockStore = getMockStore({ isDateModalOpen: true });
        
        
        // Renderiza el hook useUiStore() dentro de un Provider con el store mockeado
        const { result } = renderHook( () => useUiStore(), 
        {   
            //Wrapper: Componente que envuelve el hook para proporcionar contexto necesario   
            //(en este caso, un Provider de Redux con un store mockeado) 
            wrapper: ({ children }) => <Provider store={ mockStore }>
                                                { children }
                                        </Provider>
        });


         // Ejecuta acción para cerrar modal
        act(() => {
            result.current.closeDateModal();
        });


        // Verifica cambio de estado
        // Se espera que el estado del store pase de true a false
        expect( result.current.isDateModalOpen ).toBeFalsy();

    });



    /* Prueba 3: toggle del modal */
    test('toggleDateModal debe de cambiar el estado respectivamente', () => {
       
        // Store inicial con modal abierto
        const mockStore = getMockStore({ isDateModalOpen: true });
       

         // Renderiza el hook useUiStore() dentro de un Provider con el store mockeado
         const { result } = renderHook( () => useUiStore(), 
         {   
             //Wrapper: Componente que envuelve el hook para proporcionar contexto necesario   
             //(en este caso, un Provider de Redux con un store mockeado) 
             wrapper: ({ children }) => <Provider store={ mockStore }>
                                                 { children }
                                         </Provider>
         });


        //1. Ejecuta acción toggle para cambiar de estado a falso
        act(() => {
            result.current.toggleDateModal();
        });
        
        //2. Se espera que el estado pase a falso
        expect( result.current.isDateModalOpen ).toBeFalsy();
        


        //1. Ejecuta acción toggle para cambiar de estado a true
        act(() => {
            result.current.toggleDateModal();
        });

        //2. Se espera que el estado pase a verdadero
        expect( result.current.isDateModalOpen ).toBeTruthy();

    });


    
});