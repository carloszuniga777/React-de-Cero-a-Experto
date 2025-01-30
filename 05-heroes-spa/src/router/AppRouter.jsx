import { Route, Routes } from "react-router"
import { LoginPage } from "../auth"
import { HeroesRoutes } from "../heroes"
import { PrivateRoute } from "./PrivateRoute"
import { PublicRoute } from "."


export const AppRouter = () => {
  return (
    <>
        <Routes>

             {/**Rutas publicas */}
            <Route path="login/*" element={
                  <PublicRoute>    
                        <Routes>
                            <Route path="/*" element={<LoginPage/>} />       {/**Pagina del login */}
                        </Routes>
                  </PublicRoute>
              } />
            
            {/**Rutas Privadas */}
            <Route path='/*' element={
                  <PrivateRoute>
                      <HeroesRoutes/>       {/**Todas las paginas privadas */}
                  </PrivateRoute>
             }/>
            
        </Routes>
    </>
  )
}
