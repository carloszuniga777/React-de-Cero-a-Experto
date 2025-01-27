import { fireEvent, render, screen } from '@testing-library/react';
import { TodoItem } from '../../../src/08-useReducer/components';


describe('Pruebas en <TodoItem />', () => {
    
    //prop todo
    const todo = {
        id: 1,
        description: 'Piedra del Alma',
        done: false
    };
    
    //referencias de las funciones props
    const onDeleteTodoMock = vi.fn();
    const onToggleTodoMock = vi.fn();

    beforeEach( () => vi.clearAllMocks() );


    test('debe de mostrar el Todo Pendiente de completar', () => {
        
        render( 
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock } 
                onDeleteTodo={ onDeleteTodoMock } 
            /> 
        );

        const liElement = screen.getByRole('listitem');
        expect( liElement.className ).toBe('list-group-item d-flex justify-content-between')

        const spanElement = screen.getByLabelText('span-arial-label');
        expect( spanElement.className ).toContain('align-self-center');
        expect( spanElement.className ).not.toContain('text-decoration-line-through');

    });




    test('debe de mostrar el Todo completado', () => {
        
        todo.done = true;

        render( 
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock } 
                onDeleteTodo={ onDeleteTodoMock } 
            /> 
        );

        const spanElement = screen.getByLabelText('span-arial-label');
        expect( spanElement.className ).toContain('text-decoration-line-through');  

    });


    test('span debe de llamar el ToggleTodo cuando se hace click', () => {
        
        render( 
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock } 
                onDeleteTodo={ onDeleteTodoMock } 
            /> 
        );

        //Se obtiene la referencia del span
        const spanElement = screen.getByLabelText('span-arial-label');

        //dispara el evento Toggle
        fireEvent.click( spanElement );
        
        //Se espera que la funcion onToggleTodoMock haya sido llamada con el id
        expect( onToggleTodoMock ).toHaveBeenCalledWith( todo.id );

    });



    test('button debe de llamar el deleteTodo', () => {
        
        render( 
            <TodoItem 
                todo={ todo } 
                onToggleTodo={ onToggleTodoMock } 
                onDeleteTodo={ onDeleteTodoMock } 
            /> 
        );

        //obtiene la referenica del boton
        const deleteButton = screen.getByRole('button');
        
        //dispara el evento delete de eliminacion TODO
        fireEvent.click( deleteButton );
        
        //La funcion onDeleteTodoMock haya sido llamada con el id
        expect( onDeleteTodoMock ).toHaveBeenCalledWith( todo.id );

    });



});
