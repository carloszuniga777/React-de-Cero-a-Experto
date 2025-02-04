import { BrowserRouter, createBrowserRouter, RouterProvider } from "react-router"   // eslint-disable-line
import { AppRouterNew, AppRouter} from "./router";  // eslint-disable-line
import { AppTheme } from "./theme";

/**React Router usando BrowserRouter */
/*
export const JournalApp = () => {
  return (
    <>
     <AppTheme>
          <BrowserRouter>
              <AppRouter/>
          </BrowserRouter>
      </AppTheme>
    </>
  )
}
*/


/**React Router usando createBrowserRouter */
const router = createBrowserRouter(AppRouterNew);

export const JournalApp = () => {
  return (
    <>
      <AppTheme>
        <RouterProvider router={router} />
      </AppTheme>
    </>
  )
}