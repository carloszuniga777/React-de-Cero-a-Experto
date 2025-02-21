import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import Google from "@mui/icons-material/Google"
import { Link as RouterLink} from "react-router"
import Link from "@mui/material/Link"
import { AuthLayout } from "../layout"
import { useForm } from "../../hook"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store"
import { useDispatch, useSelector} from "react-redux"
import { useMemo } from "react"
import  Alert  from "@mui/material/Alert"



//Valores iniciales del form del login
const formData ={
  email: '',
  password: ''
}



export const LoginPage = () => {

  //status del reducer de redux: auth
  const {status, errorMessage} = useSelector(state => state.auth)
  
  /* isAuthenticating nos sirve para bloquear/desbloquear los botones, 
     se realiza el calculo con useMemo, porque status proviene
     de una funcion asincrona, por lo que useMemo guarda el calculo y solo vuelve a calcular cuando se vuelve a renderizar.
     Mientras que usar un if, este se calcularia en cada renderizado y no cuando 'status' cambia

     Cuando status esta en checking signfica que esta autenticando, 
     en ese momento se bloquean los botones
   */
   const isAuthenticating = useMemo(()=>status === 'checking', [status])
 

  //Dispatch del redux
  const dipatch  = useDispatch()


  //Manejo del formulario
 const {email, password, onInputChange} = useForm(formData)


 //Autenticar por correo y contrasena
 const onSubmit = (event)=>{
  event.preventDefault();

  //Auntentica al usuario
  dipatch( startLoginWithEmailPassword({email, password}) )   //thunk: Inicia session


}



 //Autentica con Google
 const onGoogleSignIn = ()=>{

  dipatch( startGoogleSignIn() )                          //thunk: Iniciar session con google
 }


  return (
    <AuthLayout title="Login">
      <form  
            aria-label="submit-form"
            onSubmit={onSubmit}    
            className='animate__animated animate__fadeIn animate__faster'
      >
        <Grid container direction="column" spacing={2}>
          
            {/* Campo de correo */}
            <Grid size={12}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>

            {/* Campo de contraseña */}
            <Grid size={12}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                slotProps={{
                  htmlInput: {
                    'data-testid': 'password',
                  },
                }}
                value={password}
                onChange={onInputChange}
              />
            </Grid>

          {/**Mensaje de error */}  
          <Grid container display={errorMessage ? '' : 'none'}>
            <Grid size={12}>
              <Alert severity='error'>
                   {errorMessage} 
              </Alert>
            </Grid>
          </Grid>  

          {/* Botones centrados y con 50% de ancho */}
          <Grid container spacing={2} justifyContent="center">
              
              {/**Boton Login */}
              <Grid size={6}>
                <Button disabled={isAuthenticating}
                        type='submit' 
                        variant="contained" 
                        fullWidth 
                        sx={{ height: "100%" }}
                >
                  Login
                </Button>
              </Grid>

              {/**Boton Google*/}
              <Grid size={6}>
                <Button 
                      aria-label="google-btn"
                      disabled={isAuthenticating}
                      onClick={onGoogleSignIn}
                      variant="contained" 
                      fullWidth sx={{ height: "100%" }
                 }>
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

