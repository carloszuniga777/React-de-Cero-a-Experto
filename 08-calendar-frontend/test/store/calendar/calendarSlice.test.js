//import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice";
//import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store";
import { initialState } from "../../fixtures/calendarStates";
import { calendarWithActiveEventState, calendarWithEventsState, events } from "../../fixtures/calendarStates";


describe('Pruebas en calendarSlice', () => {

    // Prueba 1: Verificar estado inicial del slice
    test('debe de regresar el estado por defecto', () => {
        const state = calendarSlice.getInitialState();
        
        // El estado inicial debe coincidir con el fixture
        expect( state ).toEqual( initialState );
    });


    // Prueba 2: Activar un evento existente
    test('onSetActiveEvent debe de activar el evento', () => {

         // Ejecutar la acción onSetActiveEvent con el primer evento del fixture
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0] ) );
        
        // Se espera que el evento activo debe ser el especificado
        expect(state.activeEvent).toEqual( events[0] );
    });


    // Prueba 3: Agregar nuevo evento al estado
    test('onAddNewEvent debe de agregar el evento', ()=> {

         // Nuevo evento de prueba
        const newEvent = {
            id: '3',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: 'Cumpleaños de Fernando!!',
            notes: 'Alguna nota!!'
        };

          // Aplicar la acción de agregar evento
        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
        
        // Se espera que el array debe contener todos los eventos + el nuevo
        expect( state.events ).toEqual([ ...events, newEvent ]);

    });



     // Prueba 4: Actualizar evento existente
    test('onUpdateEvent debe de actualizar el evento', ()=> {

         // Evento modificado (mismo ID que events[0])
        const updatedEvent = {
            id: '1',
            start: new Date('2020-10-21 13:00:00'),
            end: new Date('2020-10-21 15:00:00'),
            title: 'Cumpleaños de Fernando actualizado',
            notes: 'Alguna nota actualizada'
        };
         
         // Aplicar acción de actualización
        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updatedEvent ) );
        
        //Se espera que el evento modificado debe estar presente en el state
        expect( state.events ).toContain( updatedEvent )

    });


    // Prueba 5: Eliminar evento activo
    test('onDeleteEvent debe de borrar el evento activo', () => {
        // calendarWithActiveEventState

        // Estado inicial: tiene un evento activo (calendarWithActiveEventState) y ejecuta onDeleteEvent para eliminarlo
        const state = calendarSlice.reducer( calendarWithActiveEventState, onDeleteEvent() );
        
         // Se espera que no debe haber evento activo en el state
        expect( state.activeEvent ).toBe( null );

        // Se espera que el evento debe ser removido de la lista del state
        expect( state.events ).not.toContain( events[0] )
    });



    //Prueba 6: Cargar eventos (como desde backend)
    test('onLoadEvents debe de establecer los eventos', () => {
        // initialState

         //1. Desde estado vacío (initialState), ejecuta onLoadEvents() con los eventos para cargarlos
        const state = calendarSlice.reducer( initialState, onLoadEvents( events ) );
        
        //2. Se espera que la bandera de carga debe ser false
        expect( state.isLoadingEvents ).toBeFalsy();
        
        //3. Se espera que los eventos deben coincidir con el fixture
        expect( state.events ).toEqual(events)


        //1. Prueba de carga múltiple (no debe duplicar)
        const newState = calendarSlice.reducer( state, onLoadEvents( events ) );
       
       // Mantiene misma cantidad
        expect( newState.events.length ).toBe( events.length );
    });


    
    // Prueba 7: Limpieza de estado (logout)
    test('onLogoutCalendar debe de limpiar el estado', () => {
        // calendarWithActiveEventState

         // Ejecuta onLogoutCalendar para limpiar los eventos del calendario
        const state = calendarSlice.reducer( calendarWithActiveEventState, onLogoutCalendar() );
       
         //Se espera que regrese el estado inicial
         expect( state ).toEqual( initialState );
    }); 

    
});