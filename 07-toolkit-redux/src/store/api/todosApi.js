import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


//https://redux-toolkit.js.org/rtk-query/overview

//Configuracion inicial de RTK Query
export const todosApi = createApi({

    reducerPath: 'todos',                                       //Nombre del RTK
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com'         //Base de url de la API
    }),
  
    endpoints: (builder)=>({                                     //Funciones que se van a llamar para traer la informacion     
        
        //Obtiene los todos
        getTodos: builder.query({                                // getTodos lo que hace es tomar el  url y le concatena /todo: https://jsonplaceholder.typicode.com/todos           
            query: () => '/todos'
        }),

        //Obtiene los todos por id
        getTodosById: builder.query({                                // getTodos lo que hace es tomar el  url y le concatena /todo/numeroTodo: https://jsonplaceholder.typicode.com/todos/1           
            query: (todoId) => `/todos/${todoId}`
        }),

    })
})


//Exporta un custom hook llamado useGetTodosQuery
//Cuando se crea el endpoint (getTodos) el custom hook se crea con el nombre use[nameEnpoint]Query
export const {useGetTodosQuery, useGetTodosByIdQuery} = todosApi