import Toolbar from "@mui/material/Toolbar"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import MenuOutlined  from "@mui/icons-material/MenuOutlined"
import Grid  from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import  LogoutOutlined  from "@mui/icons-material/LogoutOutlined"
import { useDispatch } from "react-redux"
import { startLogout } from "../../store"

//Menu horizontal
export const NavBar = ({drawerWidth = 240}) => {

  const dispatch = useDispatch()

  const onLogout = ()=>{
    dispatch(  startLogout() )    //Thunk: Cierra session 
}

  return (
     <AppBar position='fixed'
        sx={{
            width: {  sm: `calc(100% - ${drawerWidth}px)` }, 
            ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>

                {/**Boton de Menu (Solo se visauliza en dispositivos mobiles) */}
               <IconButton 
                     color="inherit"
                     edge={'start'}
                     sx={{mr: 2, display: {sm: 'none'}}}
                >
                        <MenuOutlined/>         
                </IconButton> 
                
                {/**Layout Principal */}
                <Grid container 
                      sx={{width: '100%'}}  
                      display='flex' 
                      direction='row' 
                      justifyContent={'space-between'} 
                      alignItems={'center'} 
                > 
                      {/**Titulo */}
                      <Typography variant="h6" noWrap component='div'>
                        JournalApp
                      </Typography>

                      {/**Boton de Logout*/}
                      <IconButton 
                          color='error'
                          onClick={onLogout}
                      >
                        <LogoutOutlined/>
                      </IconButton>  
                </Grid>
        </Toolbar>
     </AppBar>
  )
}
