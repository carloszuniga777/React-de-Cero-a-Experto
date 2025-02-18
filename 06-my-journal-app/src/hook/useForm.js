import { useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';



export const useForm = ( initialForm = {}, formValidations = {}) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    //Sirve para actualizar el useState cada vez que initialForm inicie con nuevos valores
    useEffect(()=>{
        setFormState(initialForm)
    }, [initialForm])


    // Validaciones de formulario
    // Observacion: El reducer lo que hace es iterar el array y luego devolver un solo valor, ejemplo: return: { emailValid: null, passwordValid: null, displayNameValid: 'El nombre es obligatorio' }
    const formValidation = useMemo(() =>Object.keys(formValidations).reduce((acc, formField) => {
        const [fn, errorMessage] = formValidations[formField];
        return {
          ...acc,
          [`${formField}Valid`]: fn(formState[formField]) ? null : errorMessage
        };
      }, {}), [formState, formValidations]);

      
   // Every prueba si todos los elementos del arreglo pasan la prueba implementada por la funcion proporcionada, 
   // En este caso, si todos los elementos del array son null devuelve true, si algun campo del formulario esta vacio devuelve false    
   //Es util para saber que todos los campos del formulario son validos o no 
   const isFormValid = useMemo(()=>
        Object.values(formValidation).every( value => value === null), 
        [formValidation]
    )


    return {
        ...formState,
        ...formValidation,
        formState,
        onInputChange,
        onResetForm,
        isFormValid
    }
}
