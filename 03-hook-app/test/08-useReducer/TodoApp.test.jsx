import { render, screen } from '@testing-library/react';
import { TodoApp } from '../../src/08-useReducer/TodoApp';
import { useTodos } from '../../src/08-useReducer/hooks/useTodos';

//Mock del custom hook: Simulando el hook 
vi.mock('../../src/08-useReducer/hooks/useTodos')



describe('Pruebas en <TodoApp />', () => {

    //Inicializando el hook, con los valores que nos retorne el hook 
    useTodos.mockReturnValue({
        todos: [
            { id: 1, description: 'Todo #1', done: false },
            { id: 2, description: 'Todo #2', done: true },
        ], 
        todosCount: 2, 
        pendingTodosCount: 1, 
        handleDeleteTodo: vi.fn(), 
        handleToggleTodo: vi.fn(), 
        handleNewTodo: vi.fn()
    });





    test('debe de mostrar el componente correctamente', () => {
        
        render( <TodoApp /> );
        // screen.debug();
        expect( screen.getByText('Todo #1') ).toBeTruthy();
        expect( screen.getByText('Todo #2') ).toBeTruthy();
        expect( screen.getByRole('textbox') ).toBeTruthy();

    });

    
});