import { todoReducer } from "../../../src/08-useReducer/hooks/todoReducer"



describe('Pruebas en todoReducer', ()=>{

   const initialState =[{
        id: 1,
        description: 'Aprender React',
        done: false
    }]


    test('debe de retornar el estado inicial', ()=>{
        const newState = todoReducer(initialState, {})
        expect(newState).toBe(initialState)
    })

    test('debe de agregar un TODO', ()=>{
       
        //Definer el nuevo TODO
        const action = {
            type: 'Add todo',
            payload: {
                id: 2,
                description: 'Aprender Angular',
                done: false
            }
        }
        
        //Agrega un nuevo TODO
        const newState = todoReducer(initialState, action)

        //Espera que el nuevo estado tenga 2 elementos, el estado inicial y el nuevo TODO
        expect(newState.length).toBe(2)
        
        //Espera que el nuevo estado sea igual al estado inicial mas el nuevo TODO
        expect(newState).toEqual([...initialState, action.payload])

        //Espera que el nuevo estado contenga el nuevo TODO
        expect(newState).toContain(action.payload)
    })


    test('debe de eliminar un TODO', ()=>{
        const action = {
            type: 'Delete todo',
            payload: 1
        }

        //Elimina el TODO con id 1
        const newState = todoReducer(initialState, action)

        //Espera que el nuevo estado no contenga elementos    
        expect(newState.length).toBe(0)

    })


    test('debe de hacer el TOGGLE del TODO', ()=>{
        const action = {
            type: 'Toggle todo',
            payload: 1
        }

        //Hace el TOGGLE del TODO con id 1, es decir, done pasa de false a true
        const newState = todoReducer(initialState, action)

        //Espera que el nuevo estado de done sea true
        expect(newState[0].done).toBe(true)
    })


})