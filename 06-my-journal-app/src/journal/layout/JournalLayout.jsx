import  Box  from "@mui/material/Box"
import { NavBar, SideBar } from "../components"
import Toolbar from "@mui/material/Toolbar"

const drawerWidth = 240

export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display: 'flex'}}>
     
        <NavBar drawerWidth={drawerWidth}/>

        {/**Sidebar */}
        <SideBar drawerWidth={drawerWidth}/>

        <Box component={'main'}
             sx={{flexGrow: 1, p: 3}}  
        > 
            <Toolbar/>   {/** Este es un componente de Material-UI que generalmente se usa para crear barras de herramientas o encabezados.
                              En este caso, parece que está siendo utilizado para reservar espacio en la parte superior del Box. 
                              Esto es común en diseños donde el contenido principal necesita estar debajo de una barra de navegación o encabezado fijo.*/}

             {children}
        </Box>
    </Box>
  )
}
