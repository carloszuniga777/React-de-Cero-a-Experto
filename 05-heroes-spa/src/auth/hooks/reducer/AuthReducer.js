import { types } from "../../types";





export const authReducer = (state, action)=>{
   
    switch (action.type) {
        case types.login:
            return {
                ...state,                   //En caso que el dia de manana, hayan mas acciones, crear una copia para no afectarlas
                logged: true,
                user: action.payload
            };

        case types.logout:
            return  {
                logged: false,
            };    
    
        default:
            return state;
    }

}