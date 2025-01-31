import { useContext } from "react"
import { AuthContext } from "../auth"
import { Navigate } from "react-router"


export const PublicRoute = ({children}) => {
  
      const {logged} = useContext(AuthContext)

      //Obtiene la ultima url almacenada en el localStorage
      // y regresa al usuario a la ultima pagina visitada cuando este hace loggin
      const lastPath = localStorage.getItem('lastPath') || '/';
      
  
    //Si el usuario no esta logeado muestra la pagina del 'Login', 
    // pero si esta logeado no le permite ir a la pagina de 'Login',
    // en todo caso lo redirige a la pagina de marvel
    return (!logged) ? children : <Navigate to={lastPath} replace/>
}


