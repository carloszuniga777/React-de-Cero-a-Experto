import { useReducer } from "react"
import { AuthContext } from "./AuthContext"
import { authReducer } from "../reducer"
import { types } from "../../types"


//Inicializa el reducer la primera vez que se carga la pagina
// const initialState ={
//     logged: false
// }


//Inicializa el reducer si hay datos en localStorage
const init = () =>{
    const user = JSON.parse(localStorage.getItem('user'))
   
    return{
        logged: !!user,        //Si el usuario existe, va a estar en true
        user: user
    }
}



export const AuthProvider = ({children}) =>{

   const [ authState, authDispatch ] = useReducer(authReducer, /*initialState,*/ {}, init)



   const login = (name = '')=>{

        const user = {id: 'ABC', name}

        //Se crea una action de tipo 'login' que configure el usuario 'user'
        const action = {
            type: types.login,
            payload: user
        }

        //Guarda el usuario en el localstorage
        localStorage.setItem('user', JSON.stringify(user))

        //Configura la accion en el reducer 
        authDispatch(action)
    }



    const logout = ()=>{
        localStorage.removeItem('user')
        
        const action = {
            type: types.logout
        }

        authDispatch(action)   
    }





    return(
        <AuthContext.Provider value={{...authState,     //Propiedades

                                        //Metodos
                                        login, 
                                        logout
                                    }}>
            {children}
        </AuthContext.Provider>
    )
}