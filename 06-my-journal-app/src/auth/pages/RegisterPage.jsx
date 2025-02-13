import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Grid2"
import { Link as RouterLink} from "react-router"
import Link from "@mui/material/Link"
import { AuthLayout } from "../layout"
import { useForm } from "../../hook"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { startCreatingUserWithEmailPassWord } from "../../store"
import { useSelector } from "react-redux"
import { useMemo } from "react"
import Alert  from "@mui/material/Alert"


const formData = {
  email: '',
  password: '',
  displayName: ''
}




const formValidations = {
  displayName: [(value) => {
      const regex = /^[a-zA-Z0-9_ ]{1,20}$/;
      return regex.test(value);
  }, 'El nombre debe tener de 1 a 20 caracteres'],

  email: [(value) => {
      const regex = /\S+@\S+\.\S+/;
      return regex.test(value);
  }, 'El email debe ser un correo valido'],
  
  password: [(value) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
      return regex.test(value);
  }, 'El password debe tener como mínimo ocho caracteres, al menos una letra, un número y un carácter especial [$!%*#?&]']
};


export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false)  //Activa las validaciones del formulario cuando hace submit

  const {status, errorMessage} = useSelector(state => state.auth)
  
  //Flag para desactivar los botones cuando el usuario este autenticando
  const isCheckingAuthentication = useMemo( ()=> status === 'checking', [status] )


  const dipatch = useDispatch()

   //Manejo del formulario
  const {
    formState, displayName, email, password, onInputChange,
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations) 


  const onSubmit = (event)=>{
    event.preventDefault()

    setFormSubmitted(true)          //Activa las valiciones del formulario
    
    if( !isFormValid ) return       //Si hay un error en el formulario 
    

    dipatch( startCreatingUserWithEmailPassWord(formState) )   // Thunks: Crea una nueva cuenta
  }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} 
            className='animate__animated animate__fadeIn animate__faster' 
      >
        <Grid container direction="column" spacing={2}>


          {/* Campo Nombre */}
          <Grid size={12}>
              <TextField
                label="Nombre completo"
                type="text"
                placeholder="Nombre completo"
                fullWidth
                name='displayName'
                value={ displayName}
                onChange={ onInputChange }
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
              />
            </Grid>
          
            {/* Campo de correo */}
            <Grid size={12}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name='email'
                value={ email}
                onChange={ onInputChange } 
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
              />
            </Grid>

            {/* Campo de contraseña */}
            <Grid size={12}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name='password'
                value={ password }
                onChange={ onInputChange }
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>

          {/* Boton Submit*/}
          <Grid container spacing={2} justifyContent="center">

               {/**Mensaje de error */}
              <Grid size={12} display={errorMessage ? '' : 'none'}> 
                <Alert severity="error">
                    {errorMessage}
                </Alert>
              </Grid>
                 
                {/**Boton de crear cuenta */} 
              <Grid size={12}>
                <Button 
                        disabled={isCheckingAuthentication}
                        type='submit' 
                        variant="contained" 
                        fullWidth 
                        sx={{ height: "100%" }}
                >
                  Crear cuenta
                </Button>
              </Grid>
          </Grid>
  
            {/* Enlace para redireccionar al login */}
            <Grid container justifyContent="flex-end">
              <Link component={RouterLink} color="inherit" to="/auth/login">
                ¿Ya tienes cuenta?
              </Link>
            </Grid>
            
        </Grid>
      </form>
    </AuthLayout>
  );
};

