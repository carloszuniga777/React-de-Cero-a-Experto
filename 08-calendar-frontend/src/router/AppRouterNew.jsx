import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";
import { useMemo } from "react";

//Rutas publicas
const publicRoutes = [
    {
      path: "/auth/*",
      element: <LoginPage />,
    },
    {
      path: "/*",
      element: <Navigate to="/auth/login" replace />,
    },
];

//Rutas privadas
const privateRoutes = [
    {
      path: "/*",
      element: <CalendarPage />,
    },
];


export const AppRouterNew = () => {

 const authStatus = 'authenticated'  //   'not-authenticated' | 'authenticated'
 
  
 // Solo recrear cuando cambie authStatus
 const router = useMemo(() => {
    return createBrowserRouter(
        authStatus === "not-authenticated" 
           ? publicRoutes 
           : privateRoutes
     );
  }, [authStatus]); 



  return (
    <RouterProvider router={router} />
  )
}
