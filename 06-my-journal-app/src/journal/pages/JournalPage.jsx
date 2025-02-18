import IconButton  from "@mui/material/IconButton"
import { JournalLayout } from "../layout"
import { NoteView, NothingSelectedView } from "../views"    // eslint-disable-line
import AddOutlined  from "@mui/icons-material/AddOutlined"
import { useDispatch } from "react-redux"
import { startNewNote } from "../../store"
import { useSelector } from "react-redux"





export const JournalPage = () => {

  //Dispara acciones del redux 
  const dispatch = useDispatch()
  
  //Obtiene el estado isSavign de redux para deshabilitar o habilitar el boton 
  const { isSaving, active } = useSelector(state => state.journal)


  const onClickNewNote = ()=>{
    dispatch(startNewNote())     //Thunk: Guarda una nueva nota tanto, en el state de redux como en firestore de firebase
  }


  return (
    <> 
       <JournalLayout>                      {/**Menu de navegacion: Navbar: Menu horizontal y Sidebar: Menu Vertical*/}
          
          {
            active ?  (<NoteView/>)
                   :  (<NothingSelectedView/>) 
          }
          

           {/**Boton de agregar */} 
          <IconButton 
             size="large"
             sx={{
                  color: 'white',
                  backgroundColor: 'error.main',
                 ':hover': {backgroundColor: 'error.main', opacity: 0.9},
                 position: 'fixed',
                 right: 50,
                 bottom: 50 
             }}
             onClick={onClickNewNote}
             disabled={isSaving}
          >
              <AddOutlined sx={{fontSize: 30}}/> 
          </IconButton>
      
      </JournalLayout>
    </>
  )
}
