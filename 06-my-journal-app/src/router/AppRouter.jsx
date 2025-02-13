import { Navigate, Route, Routes } from "react-router"
import { AuthRoutes } from "../auth"
import { JournalRoutes } from "../journal"
import { CheckingAuth } from "../ui"
import { useCheckAuth } from "../hook"

export const AppRouter = () => {
  
  //Mantiene el estado de autenticacion del usuario en Redux, y evita que cuando se recargue la pagina
  //Se pierda el estado
  const {status} = useCheckAuth()   
  
  //Si el estado en redux es checking se va a mostrar el 'loading', impidiendo que genere las rutas
  if( status === 'checking') return <CheckingAuth/>
 
  return (
    <Routes>
        {/**
         * Proteccion de rutas:
         * Si el usuario esta autenticado, muestra las rutas del JournalAPP
         * De lo contrario, muestra el Login y Registro
        */}
        
        {
          (status === 'authenticated') 
            ? ( <Route path="/*" element={<JournalRoutes/>}/> )  //JournalApp
            : ( <Route path="/auth/*" element={<AuthRoutes/>}/> ) //Login y Registro 
        }
      
         <Route path="/*" element={<Navigate to='/auth/login'/>} />
        
    </Routes>
  )
}
