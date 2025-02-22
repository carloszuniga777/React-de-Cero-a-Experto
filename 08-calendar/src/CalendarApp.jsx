import { BrowserRouter } from "react-router"          // eslint-disable-line  
import { AppRouter, AppRouterNew } from "./router"    // eslint-disable-line


/**Metodo 1: React Router usando BrowserRouter para las rutas */
/*
export const CalendarApp = () => {
  return (
    <>
    <BrowserRouter>
       <AppRouter/>
    </BrowserRouter>
    </>
  )
}
*/

/**Metodo 2: React Router usando createBrowserRouter para las rutas */
export const CalendarApp = () => {
  return (
    <>
       <AppRouterNew/>
    </>
  )
}