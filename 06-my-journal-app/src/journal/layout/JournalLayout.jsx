import  Box  from "@mui/material/Box"
import { NavBar, SideBar } from "../components"
import Toolbar from "@mui/material/Toolbar"
import { useState } from "react"


const drawerWidth = 240

/**Layaut que contiene el menu horizontal (navbar)para pantallas grandes 
 * y menu lateral (sidebar) para dispositivos moviles
 * 
 * Este menu se va visualizar en todo la app de JournalAPp
*/
export const JournalLayout = ({children}) => {

  const [open, setOpen] = useState(false);

  const handleSidebarMenu = (state)=>{
    setOpen(state)
  }

  return (
    <Box sx={{display: 'flex'}}  className='animate__animated animate__fadeIn animate__faster'>
            
        {/**Navbar: Menu Horizontal */}    
        <NavBar drawerWidth={drawerWidth} handleSidebarMenu={handleSidebarMenu}/>

        {/**Sidebar: Menu lateral */}
        <SideBar drawerWidth={drawerWidth} handleSidebarMenu={handleSidebarMenu} open={open}/>

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
