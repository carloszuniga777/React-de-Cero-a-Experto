
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';
import './LoginPage.css';
import { useEffect } from 'react';
import { emailRegex } from '../../helpers';

const loginFormField = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormField = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerpassword2: ''
}




export const LoginPage= () => {

    const {startLogin, startRegister, errorMessage} = useAuthStore()


    //Alert 
    useEffect(() => {
      if(errorMessage !== undefined){
       
        Swal.fire({
            title: 'Error en la autenticación',
            text: errorMessage,
            icon: 'error'
          });  
      }
    }, [errorMessage])
    


    //-------------Formulario -------------------------

    //Formulario del login
    const {
          loginEmail, 
          loginPassword,  
          onInputChange: onLoginInputChange
    } = useForm(loginFormField)


    //Formulario del registro
    const {
        registerName, 
        registerEmail,  
        registerPassword,
        registerpassword2, 
        onInputChange:onRegisterInputChange
  } = useForm(registerFormField)


  //----------------Submit------------------

  const loginSubmit = ( event )=>{
    event.preventDefault()

    if(loginEmail === ''){
        Swal.fire('Error en inicio de session', 'El correo no puede ir vacio', 'error')
        return
    } 

    if(loginPassword === ''){
        Swal.fire('Error en inicio de session', 'Debe ir una contrasena', 'error')
        return  
    } 
    
    //Autenticacion
    startLogin({email: loginEmail, password:loginPassword})
 }



 const registerSubmit = (event)=>{
    event.preventDefault()

    if (registerPassword === '' || registerpassword2 === '') {
        Swal.fire('Error en registro', 'La contraseña no debe ir vacia', 'error')
        return
    }

    
    if(registerPassword !== registerpassword2) {
         Swal.fire('Error en registro', 'Contraseñas no son iguales', 'error')
        return
    }

    if(registerName === '') {
        Swal.fire('Error en registro', 'El nombre puede ir vacio', 'error')
        return
    }

    if(registerEmail === '') {
        Swal.fire('Error en registro', 'El correo no debe ir vacio', 'error')
        return
    }
    
    if(!emailRegex.test(registerEmail)) {
        Swal.fire('Error en registro', 'El correo debe ser valido', 'error')
        return
    }

    //Registro de usuario
    startRegister({name: registerName, email: registerEmail,  password: registerPassword })
 }


    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={loginSubmit}>
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name='loginEmail'
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name='loginPassword'
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={registerSubmit}>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name='registerName'
                                value={registerName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name='registerEmail'
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name='registerPassword'
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name='registerpassword2'
                                value={registerpassword2}
                                onChange={onRegisterInputChange} 
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}