import { ThemeProvider } from "@emotion/react"
import CssBaseline from "@mui/material/CssBaseline"
import { purpleTheme } from "."

// Es un componente funcional de React que se utiliza para proporcionar 
// un tema personalizado y establecer una base consistente 
// para la toda la aplicación utilizando Material UI
export const AppTheme = ({children}) => {
  return (
    <ThemeProvider theme={purpleTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        { children  }
  </ThemeProvider>
  )
}
