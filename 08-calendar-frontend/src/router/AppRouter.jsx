import { Navigate, Route, Routes } from 'react-router'
import { LoginPage } from '../auth'
import { CalendarPage } from '../calendar'
import { authStatus  } from "../helpers";
import { useAuthStore } from '../hooks';
import { useEffect } from 'react';

export const AppRouter = () => {
  
 const {status, checkAuthToken} = useAuthStore()

  
 // Valida que este autenticado el usuario siempre, en caso de estarlo, 
 // genera un nuevo Token 
  
 useEffect(() => {
    checkAuthToken()
  }, [checkAuthToken])
  



  if(status === authStatus.CHECKING){
      return(
        <h3>Cargando...</h3>
      )
  }

  
  return (
    <Routes>

          {
            status === authStatus.NOT_AUTHENTICATED 
            ?  (
                <>
                    <Route path="/auth/*" element={<LoginPage/>}/> 
                    <Route path="/*" element={<Navigate to="/auth/login"/>}/>
                </>
               ) 
            :  ( 
                <>
                  <Route path="/" element={<CalendarPage/>}/> 
                  <Route path="/*" element={<Navigate to="/"/>}/> 
                </>
               )
          }

          
       

    </Routes>
  )
}
    