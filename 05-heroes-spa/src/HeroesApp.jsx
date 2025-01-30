import { AuthProvider } from "./auth"
import { AppRouter, AppRouterNew } from "./router"  // eslint-disable-line



export const HeroesApp = () => {
  return (
    <AuthProvider>
       {/** <AppRouter/> */}    {/**Descomentar el BrowserRouter del archivo main.jsx */}
        
         <AppRouterNew/>            {/**Comentar el BrowserRouter del archivo main.jsx*/} 
    </AuthProvider>
  )
}
