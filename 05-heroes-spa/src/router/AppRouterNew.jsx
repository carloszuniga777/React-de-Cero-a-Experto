import { createBrowserRouter,  RouterProvider, } from "react-router"
import { LoginPage } from "../auth"
import { HeroesRoutesPrivate, RutasPrivadas } from "../heroes";
import { PrivateRoute, PublicRoute } from ".";



const router = createBrowserRouter([
  {
    path: "/login",
    element: <PublicRoute> 
                <LoginPage /> 
            </PublicRoute>,
 
  },
  {
    path: "/",
    element: <PrivateRoute> 
                <HeroesRoutesPrivate/>     {/**Pagina donde se va a renderizar las rutas privadas*/}
            </PrivateRoute>,
    children: RutasPrivadas,        
  },
]);



export const AppRouterNew = () => {
  return (
    <>
        <RouterProvider router={router} />
    </>
  )
}
