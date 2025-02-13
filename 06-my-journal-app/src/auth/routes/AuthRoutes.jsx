import { Navigate, Route, Routes } from "react-router"
import { LoginPage, RegisterPage } from "../pages"

export const AuthRoutes = () => {
  return (
    <Routes>
          <Route path='login' element={<LoginPage/>}/>  
          <Route path='register' element={<RegisterPage/>}/>  

           {/**Cualquier otra ruta que ingrese el usuario /auth/(cualquier-ruta) que no sea register o login, lo va a redirigir a login  */} 
          <Route path="/*" element={ <Navigate to='/auth/login'/>}/>
    </Routes>
  )
}
