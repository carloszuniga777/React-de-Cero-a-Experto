import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store";

//Pruebas al store de redux del modal
describe('Pruebas en uiSlice', () => {
    
    //Testeando el estado inicial
    test('debe de regresar el estado por defecto', () => {
        
        //Se espera que su estado inicial sea false
        expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false })

    });


    //Testeando el cambio de estado del modal cuando el modal es abierto y cuando es cerrado
    test('debe de cambiar el isDateModalOpen correctamente', () => {

        // 1. Obtener el estado inicial del slice de UI
        let state = uiSlice.getInitialState();

        // 2. Disparar la acción de abrir el modal y actualizar el estado
        state = uiSlice.reducer( state, onOpenDateModal() )

        // 3. Se espera que el estado del modal sea verdadero, el cual indica que el modal esta abierto
        expect(state.isDateModalOpen).toBeTruthy();
        
        
        // 1. Disparar la acción de cerrar el modal y actualizar el estado
        state = uiSlice.reducer( state, onCloseDateModal() );

        // 2. Se espera que el estado del modal sea falso    
        expect(state.isDateModalOpen).toBeFalsy();
        
        
    });


});