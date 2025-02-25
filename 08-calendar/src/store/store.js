import { configureStore } from "@reduxjs/toolkit";
import { uiSlice, calendarSlice } from "./";

//Instalacion redux: pnpm install @reduxjs/toolkit react-redux

export const store = configureStore({
    reducer:{
        ui: uiSlice.reducer,
        calendar: calendarSlice.reducer
    },
    
    // Esta configuración desactiva la verificación de serialización en Redux Toolkit.
    // Por defecto, Redux Toolkit realiza una comprobación para asegurarse de que todas las acciones y el estado sean serializables.
    // Si se detecta un valor no serializable (como una función, promesa u objeto complejo), Redux Toolkit mostrará una advertencia.
    // Al establecer `serializableCheck: false`, se desactiva esta verificación.
    // **Advertencia:** Desactivar esta opción puede dificultar la depuración y hacer que el estado sea menos predecible.
    // Úsala solo si estás seguro de que es necesario y has evaluado los riesgos.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})