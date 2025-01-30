import { useContext } from "react"
import { AuthContext } from "../auth"
import { Navigate } from "react-router"
import { useLocation } from "react-router"
import { useEffect } from "react"

export const PrivateRoute = ({children}) => {
 
    //Context para validar si usuario esta autenticado
    const {logged} = useContext(AuthContext)
    
   //-------------------------------------
   //Almacenando el path en el localStorage la ultima url
    const {pathname, search} = useLocation()

    useEffect(()=>{
        const lastPath = pathname + search

        localStorage.setItem('lastPath', lastPath)

    }, [pathname, search])


   //----------------------------------------
    
    //En dependencia si el usuario esta auntenticado o no, muestra el todo el portal o lo regresa al login
    return (logged) ? children : <Navigate to={'/login'}/>
}
