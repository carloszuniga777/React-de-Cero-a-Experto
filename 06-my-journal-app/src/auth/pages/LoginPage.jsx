import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import Google from "@mui/icons-material/Google"
import { Link as RouterLink} from "react-router"
import Link from "@mui/material/Link"
import { AuthLayout } from "../layout"



export const LoginPage = () => {
  return (
    <AuthLayout title="Login">
      <form>
        <Grid container direction="column" spacing={2}>
          
            {/* Campo de correo */}
            <Grid size={12}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
              />
            </Grid>

            {/* Campo de contraseña */}
            <Grid size={12}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
              />
            </Grid>

          {/* Botones centrados y con 50% de ancho */}
          <Grid container spacing={2} justifyContent="center">
              <Grid size={6}>
                <Button variant="contained" fullWidth sx={{ height: "100%" }}>
                  Login
                </Button>
              </Grid>

              <Grid size={6}>
                <Button variant="contained" fullWidth sx={{ height: "100%" }}>
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
          </Grid>

            {/* Enlace para crear una cuenta */}
            <Grid container justifyContent="flex-end">
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>
            
        </Grid>
      </form>
    </AuthLayout>
  );
};

