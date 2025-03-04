import { createSlice } from '@reduxjs/toolkit'
import {authStatus} from '../../helpers';


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: authStatus.CHECKING,     //'authenticated', 'not-authenticated', 'checking'
        user: {},
        errorMessage: undefined
    },
    reducers: {
        //Establece el estado de autenticacion en estado CHECKING
        onChecking: (state ) => {
            state.status = authStatus.CHECKING,
            state.user = {}
            state.errorMessage = undefined
        },

        //Establece el estado de autenticacion en estado AUTHENTICATED y guarda el usuario, id y token de autenticacion
        onLogin: (state, {payload})=>{
            state.status = authStatus.AUTHENTICATED, 
            state.user = payload
            state.errorMessage = undefined
        },
        
        //Establece el estado de autenticacion en estado NOT AUTHENTICATED, borra el usuario y si hay un error lo guarda el mensaje
        onLogout:(state, {payload})=>{
            state.status = authStatus.NOT_AUTHENTICATED,
            state.user = {}
            state.errorMessage = payload 
        },
        
        //Limpia los mensajes de error    
        clearErrorMessage:(state)=>{
            state.errorMessage = undefined
        }
    }
});


// Action creators are generated for each case reducer function
export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions