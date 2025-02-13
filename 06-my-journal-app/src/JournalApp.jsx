import { BrowserRouter, } from "react-router"   // eslint-disable-line
import { AppRouterNew, AppRouter} from "./router";  // eslint-disable-line
    


/**Metodo 1: React Router usando BrowserRouter */
/*
export const JournalApp = () => {

  return (
    <>
          <BrowserRouter>
              <AppRouter/>
          </BrowserRouter>

    </>
  )
}
*/



/**Metodo 2: React Router usando createBrowserRouter */

export const JournalApp = () => {

 return <AppRouterNew/>
 
}

