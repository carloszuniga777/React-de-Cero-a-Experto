/**Metodo 2: React Router usando createBrowserRouter para las rutas */

import { Navigate, Outlet } from "react-router"
import { useAuthStore } from "../../hooks"
import { authStatus } from "../../helpers"

export const AuthRouterOutlet = () => {
      
      //Obtiene el estado del usuario del store del auth de redux, si esta aunteticando o no
      const {status} = useAuthStore()

     //Si el usuario esta auntenticado, redirecciona a la App 
     if(status === authStatus.AUTHENTICATED){
      return <Navigate to='/*' replace/>
    }


    return <Outlet/>
  }