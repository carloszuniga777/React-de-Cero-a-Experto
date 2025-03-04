import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { AuthRouter, AuthRouterOutlet,  } from "../auth";
import { CalendarRouter, CalendarRouterOutlet } from "../calendar";
//import { useMemo } from "react";
import { authStatus  } from "../helpers";
import { useAuthStore } from "../hooks";
import { useEffect } from "react";



const router = createBrowserRouter([
  //Rutas publicas
  {                                            
    path: "/auth/*",
    element: <AuthRouterOutlet/>,         //Proteccion de rutas  
    children: AuthRouter,                //Rutas               
  },
  
  //Rutas privadas
  {                                          
    path: "/",
    element: <CalendarRouterOutlet/>,      //Proteccion de rutas
    children: CalendarRouter              //Rutas
  },

  //Catch all
  {
    path: '*',
    element: <Navigate to={'/'}/>
  }   

]);



export const AppRouterNew = () => {

  const {status, checkAuthToken} = useAuthStore()


  // Valida que este autenticado el usuario siempre, en caso de estarlo, 
   // genera un nuevo Token, de lo contrario cierra session
   useEffect(() => {
      checkAuthToken()
    }, [checkAuthToken])


 //Loading
  if(status === authStatus.CHECKING){
    return(
      <h3>Cargando...</h3>
    )
  }


  return (
    <RouterProvider router={router} />
  )
}
