import { configureStore } from '@reduxjs/toolkit'
import { counterSlice, pokemonSlice } from './slices'
import { todosApi } from './api'
 
export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,                              //reducer del counterSlice
    pokemon: pokemonSlice.reducer,                              //reducer del pokemonSlice
    
    [todosApi.reducerPath]: todosApi.reducer                    //reducer RTK Query todosApi   | configuracion store: https://redux-toolkit.js.org/rtk-query/overview
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware)     //Configuracion del middleware para hacer uso del RTK Query   | configuracion store: https://redux-toolkit.js.org/rtk-query/overview
})

