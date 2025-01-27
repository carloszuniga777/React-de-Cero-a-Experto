import { useState } from 'react';

//Custom Hook para formularios
export const useForm = ( initialForm = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );

    
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        
        setFormState(prev =>({
            ...prev,
            [ name ]: value
        }));
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
    }
}