
export const todoReducer = (initialState = [], action)=>{

    
    switch (action.type) {
        /*case 'ABC':
            throw new Error('Action.type no esta implementada')*/
        
        //{type: [todo add, payload: todo]}    
        case 'Add todo':
            return [...initialState, action.payload];
        
        //{type: [todo remove, payload: id]}    
        case 'Delete todo':
            return  initialState.filter(todo => todo.id !== action.payload)   

        case 'Toggle todo':
            return initialState.map(todo => todo.id === action.payload ? {...todo, done: !todo.done} : todo)
           
            /* return initialState.map(todo =>{

                if(todo.id === action.payload){
                    return {
                        ...todo,
                        done: !todo.done
                    }
                }
                
                return todo
            })*/   

        default:
            return initialState;
    }
}