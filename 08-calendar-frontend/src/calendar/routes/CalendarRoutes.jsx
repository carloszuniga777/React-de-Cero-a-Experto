/**Metodo 2: React Router usando createBrowserRouter para las rutas */

import { Navigate } from "react-router";
import { CalendarPage } from "..";

export const CalendarRouter = [
    {
        path: '/',
        element: <CalendarPage/>
    },
    {
        path: '/*',
        element: <Navigate to={'/'} replace/>
    }
]