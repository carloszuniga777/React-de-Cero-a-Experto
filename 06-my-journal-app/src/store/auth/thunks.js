import { getAuth, signOut } from "firebase/auth"
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase"   // eslint-disable-line
import { checkingCredentials, login, logout } from "./"
import { clearNoteLogout } from "../journal"   // eslint-disable-line

//Los thunks son acciones asincronas que disparan otra accion, 
// cuando se resuelve la petición asincrona
// https://redux.js.org/usage/writing-logic-thunks


//Funcion para iniciar session en google
export const startGoogleSignIn = ()=>{
    return async(dispatch) =>{
        
        dispatch( checkingCredentials() )   //Dispara la funcion del slice para cambiar el estado a checking

        const result = await singInWithGoogle()   //Llama el provider de Google del firebase para autenticar al usuario por google
        
        //Si el usuario no se autentica, ya se por un error, no permite autenticarse y limpia el state de redux
        if(!result.ok) return dispatch( logout(result.errorMessage) )

        //Si la autenticacion es correcta, permite logearse y configura el state de redux
        dispatch( login(result))    

    }   
}

//Funcion para crear el usuario y la contrasena
export const startCreatingUserWithEmailPassWord = ({email, password, displayName})=>{
    return async(dispatch)=>{

        dispatch( checkingCredentials() )   //Dispara la funcion del slice para cambiar el estado a checking

        //Llama al provider de google para crear el usuario en firebase
        const {ok, uid, photoURL, errorMessage} = await registerUserWithEmailPassword({email, password, displayName})

        if(!ok) return dispatch( logout({errorMessage}))  //Si algo sale mal, no auntentica

        //permite logearse y configura el state de redux
        dispatch( login({uid, displayName, email, photoURL}) )

    }
}

//Funcion para iniciar session con Email y Password
export const startLoginWithEmailPassword = ({email, password})=>{
    return async(dispatch)=>{

        dispatch( checkingCredentials() )                  //Dispara la funcion del slice para cambiar el estado a checking

        //Llama al provider de login con credenciales para iniciar session
        const { ok, displayName,  uid, photoURL, errorMessage} = await loginWithEmailPassword({email, password})

        if(!ok) return dispatch( logout({errorMessage}) )       //Si algo sale mal, no auntentica
    
            
       //permite logearse y configura el state de redux     
       dispatch( login({displayName, email,  uid, photoURL}))     

    }
}

/* Metodo 1: Metodo de fernando: Usando provider */
//Cerrar session
/*
export const startLogout = ()=>{
    return async(dispatch)=>{
        
        //Llama al provider de logout para cerrar session desde firebase
        const {errorMessage} = await logoutFirebase()


       // dispatch(clearNoteLogout())  //Limpia las notas del state de redux | Se utilizo un extraReducers para hacer esta limpieza del journal state de redux

        //configura el state del redux para limpiar la session
        dispatch( logout(errorMessage))

    }
}
*/

//Metodo 2: Sin usar provider
export const startLogout = () => {
    return async(dispatch) => {
        try{
            const auth = getAuth();      // Obtiene la instancia de autenticación de Firebase
            
            await signOut(auth);        // Cierra la sesión del usuario actual directamente desde Firebase
                        
            dispatch(logout());
        }catch(error){
            console.error('Error al cerrar sesión:', error);     
        }
    }
}

