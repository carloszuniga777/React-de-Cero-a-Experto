import Drawer         from "@mui/material/Drawer"
import Box            from "@mui/material/Box"
import Divider        from "@mui/material/Divider"
import Toolbar        from "@mui/material/Toolbar";
import Typography     from "@mui/material/Typography"
import List           from "@mui/material/List";
import { useSelector } from "react-redux";
import { SideBarItem } from ".";
import Button  from "@mui/material/Button";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { startDeletingAllNotes } from "../../store";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";


{/**Barra de menu lateral */}
export const SideBar = ({drawerWidth = 240, handleSidebarMenu, open}) => {

  //Se obtiene el nombre de usuario desde el state auth de redux   
  const { displayName } = useSelector(state => state.auth)

  //Se obtiene el estado del boton de eliminacion
  const { isDelete } = useSelector(state => state.journal)

  //Se obtiene las notas desde el state del journal de redux
  const { notes } = useSelector(state => state.journal)

  const dispatch = useDispatch() 



  //Elimina todas las notas del firebase
  const onDeleteAllNotes = ()=>{

        Swal.fire({
            title: "¿Está seguro qué desea eliminar todas las nota?",
            text: "No se podrá revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar"
          }).then((result) => {
            if (result.isConfirmed) {
    
              //Procede a eliminar todas las notas del Firebase y del store de redux      
              dispatch( startDeletingAllNotes())                 //thunk
    
              Swal.fire({
                title: "Eliminado",
                text: "Su nota ha sido eliminada correctamente",
                icon: "success"
              });
            }
    
          });

}   

  return (
      <>
    
        {/**El Menu lateral solo se va a visualizar por defecto en pantallas medianas, en pantallas pequenas es por medio del boton del menu */}
        <Box
            component={'nav'}
            sx={{
                  width:{sm: drawerWidth}, 
                  flexShrink:{sm: 0},
                }}
        >
            {/**Modal del menu lateral en pantallas medianas y grandes se va a visualizar fijo*/}
            <Drawer
                variant="permanent"  
                onClose={()=>handleSidebarMenu(false)}
                sx={{
                     display: { xs: "none", sm: "block" },
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                  <Toolbar>
                        <Typography variant="h6" noWrap component={'div'}>
                            {displayName}
                        </Typography>
                  </Toolbar>  
                  <Divider/>
                  
                  <Button
                        onClick={ onDeleteAllNotes }
                        sx={{mt: 2, fontSize: '0.7rem'}}
                        color="error" 
                        disabled={isDelete || notes.length === 0}
                    >
                    <DeleteOutline sx={{ mr: 1 }}/>
                      Eliminar Notas
                  </Button>   

                  <List>
                        {
                            notes.map(note => (
                              <SideBarItem key={note.id} {...note}/>
                            ))
                        }
                  </List>
            </Drawer>



             {/**Modal del menu lateral en pantallas moviles se va a visualizar temporalmente y va a depender del estado del boton*/}
            <Drawer
                variant="temporary"  
                open={open}
                onClose={()=>handleSidebarMenu(false)}
                sx={{
                  display: { xs: "block", sm: "none" },
                    '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth }
                }}
            >
                  <Toolbar>
                        <Typography variant="h6" noWrap component={'div'}>
                            {displayName}
                        </Typography>
                  </Toolbar>  
                  <Divider/>
                  
                  <Button
                        onClick={ onDeleteAllNotes }
                        sx={{mt: 2, fontSize: '0.7rem'}}
                        color="error" 
                        disabled={isDelete || notes.length === 0}
                    >
                    <DeleteOutline sx={{ mr: 1 }}/>
                      Eliminar Notas
                  </Button>   

                  <List>
                        {
                            notes.map(note => (
                              <SideBarItem key={note.id} {...note}/>
                            ))
                        }
                  </List>
            </Drawer>    
        </Box>
    </>
  )
}
