/**Metodo 2: React Router usando createBrowserRouter para las rutas */

import { Navigate } from "react-router"
import { LoginPage } from ".."

export const AuthRouter = [
     {
          path: "login",
          element: <LoginPage />,
    },
    {
        path: '*',
        element: <Navigate to={'/auth/login'} replace/>
    }
]

