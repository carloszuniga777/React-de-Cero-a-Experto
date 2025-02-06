import Drawer         from "@mui/material/Drawer"
import Box            from "@mui/material/Box"
import Divider        from "@mui/material/Divider"
import Toolbar        from "@mui/material/Toolbar";
import Typography     from "@mui/material/Typography"
import List           from "@mui/material/List";
import ListItem       from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon   from "@mui/material/ListItemIcon";
import TurnedInNot    from "@mui/icons-material/TurnedInNot";
import Grid           from "@mui/material/Grid2";
import { ListItemText } from "@mui/material";

export const SideBar = ({drawerWidth = 240}) => {
  return (
    <Box
        component={'nav'}
        sx={{width:{sm: drawerWidth}, flexShrink:{sm: 0}}}
    >
        <Drawer
            variant="permanent"  //temporay
            open
            sx={{
                display: {xs:'block'},
                '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth }
             }}
        >
              <Toolbar>
                    <Typography variant="h6" noWrap component={'div'}>
                        Carlos Zuniga
                    </Typography>
               </Toolbar>  
               <Divider/>
               <List>
                    {
                        ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <TurnedInNot/>
                                    </ListItemIcon>
                                    <Grid container>
                                         <ListItemText primary={text}/>
                                         <ListItemText secondary ={'Officia aute proident dolor ex.'}/>   
                                    </Grid>
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
               </List>
        </Drawer>    
    </Box>
  )
}
