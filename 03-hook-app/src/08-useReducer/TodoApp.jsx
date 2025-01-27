import { TodoList, TodoAdd } from "./components";
import { useTodos } from "./hooks/useTodos";


export const TodoApp = () => {

    //Custom Hook para manejar los todos, contiene la inicializacion del reducer como sus metodos
    const {todos, todosCount, pendingTodosCount, handleNewTodo, handleDeleteTodo, handleToggleTodo} = useTodos()

    return (
        <>
            <h1>TodoApp {todosCount}  <small>Pendientes: {pendingTodosCount}</small></h1>
            <hr />
            <div className="row">
                <div className="col-7">
                    <TodoList 
                        todos={todos} 
                        onDeleteTodo={handleDeleteTodo}
                        onToggleTodo={handleToggleTodo}    
                    />
                </div>

                <div className="col-5">
                    <h4>Agregar Todo</h4>
                    <hr />
                    <TodoAdd onNewTodo={handleNewTodo}/>
                </div>
            </div>
        </>
    );
};
