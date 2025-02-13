import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";



//Rutas privadas
//Proteccion de rutas del JournalApp   | documentacion: https://www.sebastianfdz.com/articles/rutas-privadas-react-router-v6      

export const JournalRoutesPrivate = ()=>{
    const {status} = useSelector(state => state.auth)

    //Si el usuario no esta autenticado lo redirecciona al login
    if(status === 'not-authenticathed'){
      return <Navigate to={'/auth/login'} replace/>
    }

    return <Outlet/>   
    
  }