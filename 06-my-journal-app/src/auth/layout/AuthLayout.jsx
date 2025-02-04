import Typography from "@mui/material/Typography"
import Grid from "@mui/material/Grid2"

export const AuthLayout = ({ children, title = "" }) => {
  return (
    <Grid
         container
         spacing={0}
         direction="column"
         alignItems="center"
         justifyContent="center"
        sx={{
          minHeight: "100vh",
          backgroundColor: "primary.main", // Color definido en el tema
          padding: 4,
        }}
    >
      {/* Contenedor principal */}
      <Grid
          className="box-shadow"
          size={12} // Tamaño de columna
          sx={{
              width: { xs: "90%", sm: 450 }, // Responsive: 90% en pantallas pequeñas, 450px en pantallas medianas+
              backgroundColor: "white",
              padding: 3,
              borderRadius: 2,
          }}
      >
            {/* Título */}
            <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
              {title}
            </Typography>

            {/* Contenido hijo */}
            {children}
      </Grid>
    </Grid>
  );
};