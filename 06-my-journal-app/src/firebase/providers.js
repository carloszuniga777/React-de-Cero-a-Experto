import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider()

const auth = getAuth();

//Iniciar Session con Google en firebase   | configuracion - punto 5: https://firebase.google.com/docs/auth/web/google-signin?hl=es-419
export const singInWithGoogle = async()=>{
    try {
       
        //Metodo 1 (fernando): Iniciar session en firebase (FirebaseAuth)
        //const result = await signInWithPopup(FirebaseAuth, googleProvider)
        
        //Metodo 2 (documentacion): Iniciar session en firebase (auth)
        const result = await signInWithPopup(auth, googleProvider)
    
         
        //const credentials = GoogleAuthProvider.credentialFromResult(result)
    
        const {displayName, email, photoURL, uid} = result.user
      

        return {
            ok: true,
            displayName,
            email,
            photoURL,
            uid
        }
        

    } catch (error) {
        // Handle Errors here.
    
        return{
            ok: false,
            errorMessage: handleError(error.code, error.message)
        }
    }
}

//Registrar nuevo usuario usando credenciales (email, password) en firebase  | configuracion: https://firebase.google.com/docs/auth/web/start?hl=es&authuser=1
export const registerUserWithEmailPassword = async({email, password, displayName})=>{
    try {
        
       //Metodo 1 (fernando): Realiza la creacion del usuario en Firebase (FirebaseAuth)
       //const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
       
       //Metodo 2 (documentacion): Realiza la creacion del usuario en Firebase (auth)
       const resp = await createUserWithEmailAndPassword(auth, email, password)
       
       
       const {uid, photoURL} = resp.user

       //Actualizar el displayName en Firebase
       await updateProfile(FirebaseAuth.currentUser, {displayName} )
       
       return{
            ok: true,
            uid,
            photoURL,
            email,
            displayName
       }

    } catch (error) {

        
        return{
            ok: false,
            errorMessage: handleError(error.code, error.message)
        }
        
    }
}

//Inicia session con credenciales en firebase    | configuracion: https://firebase.google.com/docs/auth/web/start?hl=es&authuser=1
export const loginWithEmailPassword = async({email, password})=>{
    try {
        
        //Metodo 1(fernando): Iniciar session con credenciales en firebase (FirebaseAuth)
       //const resp  = await signInWithEmailAndPassword(FirebaseAuth, email, password)
       
       //Metodo 2(documentacion): Iniciar session con credenciales en firebase (auth)
       const resp  = await signInWithEmailAndPassword(auth, email, password)
       
       const {displayName, uid, photoURL} = resp.user
        
      return{
        ok: true,
        displayName,
        uid, 
        photoURL
      }  
        
    }catch (error) {

        return{
            ok: false,
            errorMessage: handleError(error.code, error.message)
        }
        
    }
}

//Cerrar session desde Firebase - Metodo 1 (ver los thunks)  
export const logoutFirebase = async()=>{
   try{
        await FirebaseAuth.signOut()

      return{
         ok: true
      }  

   }catch(error){
        return{
            ok: false,
            errorMessage: handleError(error.code, error.message)
        }
   } 
}



//-------------------------------------------

const handleError = (code, message)=>{
    switch(code){
        case 'auth/wrong-password':
            return 'Correo o contraseña incorrectos.'

        case 'auth/user-not-found':
            return 'Correo o contraseña incorrectos.'   
        
        case 'auth/invalid-credential': 
            return 'Correo o contraseña incorrectos.'   
        
        case 'auth/invalid-email':
            return 'Por favor valida que el correo electrónico esté escrito correctamente.'

        case 'auth/weak-password':
            return  'La contraseña debe tener al menos 6 caracteres.'
         
        case 'auth/email-already-in-use':
            return 'La dirección de correo electrónico ya se encuentra en uso'    

        default:
            return message
    }
}


/** Errores comunes de firebase

   auth/wrong-password: Correo o contraseña incorrectos.
   auth/user-not-found: Correo o contraseña incorrectos.
   auth/invalid-credential: Correo o contraseña incorrectos.
   auth/invalid-email: Por favor valida que el correo electrónico esté escrito correctamente.
   auth/weak-password: La contraseña debe tener al menos 6 caracteres.
   auth/email-already-in-use: La dirección de correo electrónico ya se encuentra en uso
 * 
 */