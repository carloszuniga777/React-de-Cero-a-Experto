import StarOutline  from "@mui/icons-material/StarOutline"
import Typography  from "@mui/material/Typography"
import  Grid  from "@mui/material/Grid2"

export const NothingSelectedView = () => {
  return (
    <Grid
        container
        className='animate__animated animate__fadeIn animate__faster'
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
    sx={{
        minHeight: "calc(100vh - 110px)",
        backgroundColor: "primary.main", // Color definido en el tema
        borderRadius: 5
    }}
    >
        <Grid xs={12}>
            <StarOutline sx={{ fontSize: 100, color: 'white' }} />
        </Grid>
        <Grid xs={12}>
            <Typography color="white" variant="h5">
                Selecciona o crea una entrada
            </Typography>
        </Grid>

    </Grid>
  )
}
