import { useState } from "react"
import { useGetTodosByIdQuery, useGetTodosQuery } from "./store/api"

export const RTKQueryApp = () => {

   const [todoId, setTodoId] = useState(1) 

   //custom hook del RTK query de redux
   const {data:todos=[], isLoading1} = useGetTodosQuery() 
   const {data:todo, /*isLoading: isLoading2*/} = useGetTodosByIdQuery(todoId)

 const nextTodo = ()=>{
    setTodoId(todo => todo + 1)
 } 

 const prevTodo = ()=>{
    if(todoId === 1) return
    
    setTodoId(todo => todo - 1)
 }
    
  return (
    <>
            <h1>RTKQueryApp</h1>
            <hr/>

            <pre>{JSON.stringify(todo)}</pre>
            
            <button onClick={prevTodo}>
                Prev Todo
            </button>
            <button onClick={nextTodo}>
                Next Todo
            </button>
            

            <h4>isLoading...{isLoading1 ? 'True' : 'false'}</h4>
            <ul>
                {
                   todos.map(todo=>(
                      <li key={todo.id}>
                         <strong> {todo.completed ? 'Done' : 'Pending'} </strong>
                          { todo.title }
                      </li>  
                   ))
                }
            </ul>


    </>
  )
}
