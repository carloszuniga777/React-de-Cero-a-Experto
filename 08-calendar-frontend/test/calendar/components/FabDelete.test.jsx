
import { fireEvent, render, screen  } from "@testing-library/react";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";
import { FabDelete } from "../../../src/calendar/components/FabDelete";


//Mock del store de calendario usando vitest
vi.mock('../../../src/hooks/useCalendarStore');


describe('Pruebas en <FabDelete />', () => {

    // Mock de la función de eliminación
    const mockStartDeleteEvent = vi.fn();

    // Limpieza de mocks antes de cada prueba
    beforeEach( ()=> vi.clearAllMocks() );
 
    //Prueba 1. Que el boton contengan las clasess css
    test('debe de mostrar el componente correctamente', () => {

         // Configurar mock del store SIN evento seleccionado
        useCalendarStore.mockReturnValue({
            hasEventSelected: false
        });

        //Renderiza el componente
        render(<FabDelete />);

        //Se obitiene la referencia del boton delete
         const btn = screen.getByLabelText('btn-delete');

        // console.log(btn.classList.toString());
        
         // Verificar clases CSS básicas del componente
         expect( btn.classList ).toContain('btn');
         expect( btn.classList ).toContain('btn-danger');
         expect( btn.classList ).toContain('fab-danger');
        
         //No uso estyle 
         // expect( btn.style.display ).toBe('none');
    });

     
    //No uso el style
    /*test('debe de mostrar el botón si hay un evento activo', () => {   

        useCalendarStore.mockReturnValue({
            hasEventSelected: true
        });
        
        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete');
        // console.log(btn.classList.toString());
        
        //No uso estyle 
        //expect( btn.style.display ).toBe('');
        
    });
    */


    //Prueba 2. Simular una eliminacion
    test('debe de llamar startDeletingEvent si hay evento activo', () => {

        // Configurar mock del store CON evento seleccionado
        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            startDeleteEvent: mockStartDeleteEvent
        });
        
        //Renderiza el componente
        render(<FabDelete />);

        //Se obtiene referencia del boton 
        const btn = screen.getByLabelText('btn-delete');
        
        //Se hace click 
        fireEvent.click( btn );
        
        //Se espera que la funcion haya sido llamada
        expect( mockStartDeleteEvent ).toHaveBeenCalledWith();        
        
    });

});