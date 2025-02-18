import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config"
import { login, logout, startLoadingNotes } from "../store"

//Observer
//Custom Hook para mantener el estado de autenticacion del usuario en redux
//Y evita que cuando se recargue la pagina no pierda el estado
export const useCheckAuth = () => {
  
    const {status} = useSelector(state => state.auth)

    const dispatch = useDispatch()
  
    //Mantiene el estado del usuario en redux para evitar que se pierda al recargar la pagina 
    useEffect(() => {
  
        //onAuthStateChanged: Verifica el estado de autenticacion del usuario en vivo en Firebase
        onAuthStateChanged(FirebaseAuth, async(user)=>{          
           
           //Si el usuario no esta autenticado coloca el status en 'no authenticathed'
           if(!user) return dispatch( logout())
  
            const {uid, displayName, email, photoURL} = user
            
            //Si el usuario esta auntenticado, coloca el status en 'authenticated'
            dispatch(login({uid, displayName, email, photoURL} ))
            
            //Carga las notas desde la base de datos firestore de firebase
            dispatch(startLoadingNotes())   //thunk
        })         
        
    }, [dispatch])


    return {status}

}
