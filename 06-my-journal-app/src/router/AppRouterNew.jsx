import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { AuthRoutesNew, AuthRoutesPublic } from "../auth";
import { JournalRoutesNew, JournalRoutesPrivate } from "../journal";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hook";


/**
 * En el AppRouter colocamos las rutas absolutas, 
 * es necesario poner el path de "/auth" 
 * para que sus hijas se consideren anidadas
 * 
 * Rutas privadas: https://www.sebastianfdz.com/articles/rutas-privadas-react-router-v6
 */
const router = createBrowserRouter([
    {                                         //Login y registro de usuarios    
      path: "/auth/*",
      element: <AuthRoutesPublic/>,            //Componente que define las rutas publicas
      children: AuthRoutesNew,                 //Listas de rutas publicas relacionadas con la autenticación y la creacion de usuario
    },
    {                                          //JornalAPP 
      path: "/",
      element: <JournalRoutesPrivate/>,       //Proteccion de las rutas JornalAPP
      children: JournalRoutesNew              //Listas de rutas del JornalAPP
    },
    {
      path: '/*',
      element: <Navigate to={'/'}/>
    }
 ])



  export const AppRouterNew = ()=>{
    
    //Mantiene el estado de autenticacion del usuario en Redux, y evita que cuando se recargue la pagina
    //Se pierda el estado
    const {status} = useCheckAuth()   

    //Si el estado en redux es checking se va a mostrar el loading, impidiendo que genere las rutas
    if( status === 'checking') return <CheckingAuth/>

    return <RouterProvider router={router} />

  }