import Typography  from "@mui/material/Typography"
import Grid from "@mui/material/Grid2"
import SaveOutlined  from "@mui/icons-material/SaveOutlined"
import  Button  from "@mui/material/Button"
import TextField  from "@mui/material/TextField"
import { ImageGallery } from "../components"



export const NoteView = () => {
  return (
    <Grid 
        container 
        direction="column" 
        spacing={2}
        className='animate__animated animate__fadeIn animate__faster'
    >

        {/* Fila para la fecha y el botón de guardar */}
        <Grid container justifyContent="space-between" alignItems="center">
            <Grid>
                <Typography fontSize={39} fontWeight="light">
                    28 de agosto, 2023
                </Typography>
            </Grid>
            
            <Grid>
                <Button color="primary" sx={{ padding: 2 }}>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
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
                    />
                </Grid>
        </Grid>

        {/* Fila para la galería de imágenes */}
        <Grid>
            <ImageGallery />
        </Grid>

    </Grid>
  );
};
