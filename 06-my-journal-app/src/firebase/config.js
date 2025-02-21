// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
//Configuracion de Firebase de Produccion
const firebaseConfig = {
  apiKey:               import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain:           import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:            import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:        import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:    import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
  appId:                import.meta.env.VITE_FIREBASE_APP_ID
};


//Configuracion de Firebase de Testing
const firebaseConfigTesting = {
  apiKey: import.meta.env.VITE_FIREBASE_TESTING_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASE_TESTING_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_TESTING_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_TESTING_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_TESTING_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASE_TESTING_APP_ID
};

// Initialize Firebase
export const FirebaseApp = import.meta.env.MODE === 'test' 
                                        ? initializeApp(firebaseConfigTesting)
                                        : initializeApp(firebaseConfig);  
//Autenticacion
export const FirebaseAuth = getAuth(FirebaseApp)

//Base de datos
export const FirebaseDB = getFirestore(FirebaseApp)



//Crear un archivo .env y buscar las configuraciones de firebase (https://console.firebase.google.com) del proyecto: my-journal-app-curso-react 
/**
 * Con las variables de entorno .env:
 * 
 * VITE_FIREBASE_APIKEY            = "Api"
   VITE_FIREBASE_AUTH_DOMAIN       = "authDomain"
   VITE_FIREBASE_PROJECT_ID        = "projectId"
   VITE_FIREBASE_STORAGE_BUCKET    = "storageBucket"
   VITE_FIREBASE_MESSAGINGSENDERID = "messagingSenderId"
   VITE_FIREBASE_APP_ID            = "appId"


   Con las variables de entorno .env.test
   
   VITE_FIREBASE_TESTING_APIKEY              = "Api"
  VITE_FIREBASE_TESTING_AUTH_DOMAIN          = "authDomain" 
  VITE_FIREBASE_TESTING_PROJECT_ID           = "projectId"    
  VITE_FIREBASE_TESTING_STORAGE_BUCKET       = "storageBucket" 
  VITE_FIREBASE_TESTING_MESSAGINGSENDERID    = "messagingSenderId"
  VITE_FIREBASE_TESTING_APP_ID               = "appId"

   * 
 */
