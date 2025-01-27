import { renderHook, act } from "@testing-library/react"
import { useForm } from "../../src/hooks"



describe('pruebas en useForm', ()=>{
    let result
    
    const initialForm ={
        name: 'Jorge Trochez',
        email: 'jorgetrochez@trochez.trz'
    
    }

    beforeEach(()=>{
        const {result: resultHook} = renderHook(()=> useForm(initialForm))
        result = resultHook
    })

    test('debe de regresar los valores por defecto', ()=>{

       // console.log(result)

        expect(result.current).toEqual({
                                name: initialForm.name,
                                email: initialForm.email,
                                formState: initialForm,
                                onInputChange: expect.any(Function),   //Espera una funcion
                                onResetForm: expect.any(Function)      //Espera una funcion 
                              })
    })



    test('debe de cambiar el nombre del formulario', ()=>{

        const {onInputChange} = result.current
        

        const newInput = {
             name: 'Ingeniero Trochez',
             email: 'ingenieroexportadorimportadorchina@trochez.trz'
        }


        act(()=>{

            // Simular cambio en el campo 'name'
            onInputChange({
                target:{
                    name: 'name',
                    value: newInput.name
                }
            })


            // Simular cambio en el campo 'email'
            onInputChange({
                target: {
                    name: 'email',
                    value: newInput.email
                }
            });

        })

        //console.log(result.current)

         expect(result.current.formState).toEqual(newInput);
         expect(result.current.name).toBe(newInput.name);
         expect(result.current.email).toBe(newInput.email);
         
    })


    test('debe de resetear el formulario', ()=>{
        const {onResetForm, onInputChange} = result.current

        const newInput = {
            name: 'Ingeniero Trochez',
            email: 'ingenieroexportadorimportadorchina@trochez.trz'
       }

        act(()=>{

            // Simular cambio en el campo 'name'
            onInputChange({
                target:{
                    name: 'name',
                    value: newInput.name
                }
            })


             // Simular cambio en el campo 'email'
             onInputChange({
                target: {
                    name: 'email',
                    value: newInput.email
                }
            });

            // Resetear formulario    
            onResetForm()
        
        })

       // console.log(result.current)

       //Espera que los valores sean igual a los iniciales
       expect(result.current.formState).toEqual(initialForm);
       expect(result.current.name).toBe(initialForm.name);
       expect(result.current.email).toBe(initialForm.email);

    })

})