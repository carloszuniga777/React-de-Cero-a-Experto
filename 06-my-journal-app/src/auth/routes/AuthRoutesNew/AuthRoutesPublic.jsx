import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"


//Define las rutas publicas, si el usuario esta auntenticado lo redirecciona a la app 
//De lo contrario, le seguira mostrando el login o la pagina de creacion  de usuario
//documentacion: https://www.sebastianfdz.com/articles/rutas-privadas-react-router-v6
export const AuthRoutesPublic = () => {
  
    const {status} = useSelector(state => state.auth)

    //Si el usuario esta auntenticado, redirecciona a la App 
    if(status === 'authenticated'){
        return <Navigate to='/*' replace/>
    }


  return <Outlet/>
}
