import Toolbar from "@mui/material/Toolbar"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import MenuOutlined  from "@mui/icons-material/MenuOutlined"
import Grid  from "@mui/material/Grid2"
import Typography from "@mui/material/Typography"
import  LogoutOutlined  from "@mui/icons-material/LogoutOutlined"

export const NavBar = ({drawerWidth = 240}) => {
  return (
     <AppBar position='fixed'
        sx={{
            width: {  sm: `calc(100% - ${drawerWidth}px)` }, 
            ml: { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
               <IconButton 
                     color="inherit"
                     edge={'start'}
                     sx={{mr: 2, display: {sm: 'none'}}}
                >
                        <MenuOutlined/>         
                </IconButton> 

                <Grid container 
                      sx={{width: '100%'}}  
                      display='flex' 
                      direction='row' 
                      justifyContent={'space-between'} 
                      alignItems={'center'} 
                > 
                      <Typography variant="h6" noWrap component='div'>
                        JornalApp
                      </Typography>

                      <IconButton color='error'>
                        <LogoutOutlined/>
                      </IconButton>  
                </Grid>
        </Toolbar>
     </AppBar>
  )
}
