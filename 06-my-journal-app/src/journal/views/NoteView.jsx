import Typography  from "@mui/material/Typography"
import Grid from "@mui/material/Grid2"
import SaveOutlined  from "@mui/icons-material/SaveOutlined"
import  Button  from "@mui/material/Button"
import TextField  from "@mui/material/TextField"
import { ImageGallery } from "../components"
import { useSelector, useDispatch } from "react-redux"
import { useForm } from "../../hook"
import { useMemo, useRef, useEffect } from "react"
import { formatDate } from "../../utils/formatDate"
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store"
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css'
import  IconButton  from "@mui/material/IconButton"
import  UploadOutlined  from "@mui/icons-material/UploadOutlined"
import  DeleteOutline from "@mui/icons-material/DeleteOutline"

//Pantalla donde se visualiza el formulario y la galeria de imagenes
export const NoteView = () => {
 
 const dispatch = useDispatch()

 //Obtiene la nota activa del reducer, es decir, la nota que se selecciono en el menu   
 const {active:note, messageSaved, isSaving, isDelete} = useSelector(state => state.journal)   

 //Manejo de formulario
 const {title, body, date, onInputChange, formState} = useForm(note)
 
 //Debido a que la fecha casi no cambia, se memoriza para evitar estar
 //recalculando la fecha cada vez que cambie
 const dateString = useMemo(()=>{
    return formatDate(date)
 }, [date])


//Referencia del input-file para subir archivos
const fileInputRef = useRef()

 
 //Actualiza el state 'active' de de redux cada vez que el formulario es modificado por el usuario
 useEffect(() => {
    dispatch(setActiveNote(formState))
 }, [formState, dispatch])
 

//Alert de actualizar nota
useEffect(()=>{   
  if(messageSaved.length > 0){
      Swal.fire({
          title: 'Nota ctualizada',
          text: messageSaved,
          icon: 'success',
        //   confirmButtonText: 'Ok'
        }) 
  }  
},[messageSaved])


//Actualiza la nota en  Firestore de Firebase
 const onSaveNote = ()=>{
    dispatch(startSaveNote())  //thunk
 }


//Sube los archivos a Cloudinary
const onFileInputChange = ({target})=>{
    if(target.files === 0) return
   
    dispatch( startUploadingFiles(target.files) )  //thunk
}


//Borra la nota activa 
const onDelete = ()=>{
   
 
    Swal.fire({
        title: "¿Está seguro qué desea eliminar la nota?",
        text: "No se podrá revertir esta acción",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar"
      }).then((result) => {
        if (result.isConfirmed) {

          //Procede a eliminar la nota del Firebase y del store de redux      
          dispatch( startDeletingNote())                 //thunk

          Swal.fire({
            title: "Eliminado",
            text: "Su nota ha sido eliminada correctamente",
            icon: "success"
          });
        }

      });
}


  return (
    <Grid 
        container 
        direction="column" 
        spacing={2}
        className='animate__animated animate__fadeIn animate__faster'
    >


        {/* Contenedor  fecha, el botón de guardar y subir archivo*/}    
        <Grid container                
              alignItems="center"
            sx={{
                flexDirection: { xs: 'column', sm: 'row' }, // Columna en móvil, fila en desktop
                justifyContent: { xs: 'center', md: 'space-between' },
                gap: { xs: 2, sm: 0 }, // Espacio entre elementos solo en móvil
                textAlign: { xs: 'center', sm: 'left' }
            }}
        >
            {/**Fecha*/}    
            <Grid>
                <Typography fontSize={{ xs: 28, sm: 30 }} 
                            fontWeight="light"
                            noWrap
                            sx={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%'
                            }}
                >
                    {dateString}
                </Typography>
            </Grid>


          
            


        
            {/**Contenedor de Boton guardar y subir archivo*/}
            <Grid container alignItems="center" spacing={1}>

                {/**Subir imagen */}
                <Grid sx={{ display: 'flex', alignItems: 'center' }}>
                    <input type="file" 
                        multiple 
                        ref={fileInputRef}               //Referencia input.file
                        onChange={onFileInputChange}
                        style={{display: 'none'}}
                    />

                    <IconButton 
                        color='primary' 
                        disabled={isSaving}
                        onClick={()=>fileInputRef.current.click()}  //Referencia input.file: Simula el click
                    >
                        <UploadOutlined/>
                    </IconButton>

                </Grid>

                {/**Boton guardar */}
                <Grid>
                    <Button 
                        disabled={isSaving}
                        onClick={onSaveNote}
                        color="primary" 
                        sx={{ 
                            padding: { xs: 1, sm: 2 },
                            fontSize: { xs: '0.875rem', sm: '1rem' }
                        }}
                    >
                        <SaveOutlined sx={{ fontSize: { xs: 24, sm: 30 }, mr: 1 }} />
                        Guardar
                    </Button>
                </Grid>
            </Grid>


        </Grid>



      

        {/* Fila para los campos de texto */}
        <Grid container direction="column" spacing={2}>
                <Grid>
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        placeholder="Ingrese un título"
                        label="Título"
                        sx={{ border: "none" }}
                        name='title'
                        value={title}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid>
                    <TextField
                        type="text"
                        variant="filled"
                        fullWidth
                        multiline
                        placeholder="¿Qué sucedió en el día de hoy?"
                        minRows={5}
                        name='body'
                        value={body}
                        onChange={onInputChange}
                    />
                </Grid>
        </Grid>
        

        
        {/**Boton borrar */}
        <Grid container justifyContent={'end'}>
           <Button
                onClick={ onDelete }
                sx={{mt: 2}}
                color="error" 
                disabled={isDelete}
           >
                <DeleteOutline/>
                Borrar Nota
            </Button>             
        </Grid>


        {/* Fila para la galería de imágenes */}
        <Grid>
            <ImageGallery images={note.imageUrls}/>
        </Grid>

    </Grid>
  );
};











