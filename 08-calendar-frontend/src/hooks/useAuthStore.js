import { useSelector, useDispatch } from "react-redux"
import { calendarAPI } from "../api"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store"
import { useCallback } from "react"

//Custom Hook para manejar los estados de autenticacion del store de redux y las peticiones al backend
//Estados de autenticacion: Login, logout, registro de usuario y renovacion de token
export const useAuthStore = () => {

    const {status, user, errorMessage} = useSelector(state => state.auth)
    const dispatch = useDispatch()


     //Guarda el token y la fecha 
    const setToken = (token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('token-init-date', new Date().getTime());   //Se ahorra una peticion al backend para consultar cuanto tiempo le queda al Token
      };




    //Funcion de iniciar session
    const startLogin = async({email, password})=>{
        
        //Cambia el estado a checking en el store de redux
        dispatch( onChecking() )   

        try {

            //Realiza la peticion de tipo post para realizar la autenticacion
            const { data } = await calendarAPI.post('/auth', {email, password})
            

             //Guarda el token y la fecha 
             setToken(data.token)

            //Cambia el estado a autenticado en el store de redux y guarda el usuario y el id 
             dispatch( onLogin({name: data.name, uid: data.uid}) )   

        } catch (error) {   // eslint-disable-line
            dispatch( onLogout('Credenciales incorrectas'))

            setTimeout(()=>{
                dispatch( clearErrorMessage() )
            }, 10)
        }
    }

   

    //Funcion de registro de usuario
    const startRegister = async({name, email, password})=>{

         //Cambia el estado a checking en el store de redux
         dispatch( onChecking() )   

        try {
            const { data } = await calendarAPI.post('/auth/new', {name, email, password})
            
            //Guarda el token y la fecha 
            setToken(data.token)
           
            //Cambia el estado a autenticado en el store de redux y guarda el usuario y el id 
            dispatch( onLogin({name: data.name, uid: data.uid}) )   

            
        } catch (error) {
 
            dispatch( onLogout(
                               error.response.data.errors?.name?.msg || 
                               error.response.data.errors?.email?.msg ||
                               error.response.data.errors?.password?.msg ||
                               error.response.data?.msg
                             )
                    ) 

            setTimeout(()=>{
                dispatch( clearErrorMessage() )
            }, 10)        
        }

    }


   //Funcion de renovacion de Token 
   const checkAuthToken = useCallback(async()=>{

        //Obtiene el token del localstorage
        const token = localStorage.getItem('token')
        
        // Si el token no existe en localstorage limpia el state de auth y cambia el estado a no autenticado
        if( !token ) return dispatch(onLogout())

        
         try {
            
            //Genera un nuevo Token de autenticacion
            const { data } = await calendarAPI.get('/auth/renew')
         
            //Guarda el token y la fecha 
            setToken(data.token)
        
            //Cambia el estado a autenticado en el store de redux y guarda el usuario y el id 
            dispatch( onLogin({name: data.name, uid: data.uid}) )  

        } catch (error) {  // eslint-disable-line
            localStorage.clear()    //Limpia el localstorage
            onLogout()              //limpia el state de auth y cambia el estado a no autenticado para cerrar session
         }   
         
   }, [dispatch])


   //Funcion para cerrar session
   const startLogout = ()=>{
      localStorage.clear()  
      dispatch(onLogout())  //limpia el state de auth y cambia el estado a no autenticado para cerrar session
   }



  return {
    //* Propiedades
    status, 
    user, 
    errorMessage,

    //* Metodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout

  } 
}
