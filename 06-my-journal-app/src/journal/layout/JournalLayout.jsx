import  Box  from "@mui/material/Box"
import { NavBar, SideBar } from "../components"
import Toolbar from "@mui/material/Toolbar"


const drawerWidth = 240

/**Layaut que contiene el menu horizontal (navbar)para pantallas grandes 
 * y menu lateral (sidebar) para dispositivos moviles
 * 
 * Este menu se va visualizar en todo la app de JournalAPp
*/
export const JournalLayout = ({children}) => {
  return (
    <Box sx={{display: 'flex'}}  className='animate__animated animate__fadeIn animate__faster'>
     
        <NavBar drawerWidth={drawerWidth} />

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
