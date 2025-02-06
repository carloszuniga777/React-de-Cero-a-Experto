import IconButton  from "@mui/material/IconButton"
import { JournalLayout } from "../layout"
import { NoteView, NothingSelectedView } from "../views"
import AddOutlined  from "@mui/icons-material/AddOutlined"




export const JournalPage = () => {
  return (
    <> 
       <JournalLayout>
          <NothingSelectedView/>
          {/*<NoteView/>*/}
            

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
          >
              <AddOutlined sx={{fontSize: 30}}/> 
          </IconButton>
      
      </JournalLayout>
    </>
  )
}
