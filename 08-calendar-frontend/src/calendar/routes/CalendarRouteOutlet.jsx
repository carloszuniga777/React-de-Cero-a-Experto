/**Metodo 2: React Router usando createBrowserRouter para las rutas */

import { Navigate, Outlet } from "react-router"
import { useAuthStore } from "../../hooks"
import { authStatus } from "../../helpers"

export const CalendarRouterOutlet = () => {

     //Obtiene el estado del usuario del store del auth de redux, si esta aunteticando o no
    const {status} = useAuthStore()
    
    //Si el usuario esta no esta auntenticado, redirecciona al login 
    if(status === authStatus.NOT_AUTHENTICATED){
        return <Navigate to='/auth/login' replace/>
    }

    return <Outlet/>
}