import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";

//Inicializa el reducer con un array vacio la primera vez que se carga la pagina
const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: "Aprender React",
    //     done: false,
    // },
    // {
    //     id: new Date().getTime() * 3,
    //     description: "Aprender Reducer",
    //     done: false,
    // },
];


//Inicializa el reducer si hay datos en localStorage
const init = ()=>{
    return JSON.parse(localStorage.getItem('todos')) || [];
}




//Custom Hook para manejar los todos, contiene la inicializacion del reducer como sus metodos
export const useTodos = () => {
    const [todos, dispatch] = useReducer(todoReducer, initialState, init);


    //Almacenar en localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])


     //Agregar nuevo todo al reducer
     const handleNewTodo = (todo) =>{
        dispatch({type: 'Add todo', payload: todo});
    }

    //Eliminar todo del reducer
    const handleDeleteTodo = (id)=>{
        dispatch({type: 'Delete todo', payload: id})
    }

    //Realiza el toogle para cambiar el estado de done, que sirve para tachar el texto
    const handleToggleTodo =(id)=>{
        dispatch({type: 'Toggle todo', payload: id})
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length
    }

}
