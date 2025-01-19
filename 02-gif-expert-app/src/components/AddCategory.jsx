import { useState } from "react"
import PropTypes from 'prop-types'


export const AddCategory = ({ onNewCategory }) => {
  const [inputValue, setinputValue] = useState('')


  const onSubmit = (event)=>{
     event.preventDefault()
     
    //console.log('Hola mundo desde submit de las pruebas test')    //console.log para verificar que la funcion ejecuta en las pruebas de vitest

     if(inputValue.trim().length <= 0) return
     
     setinputValue('')
     onNewCategory(inputValue.trim())
  } 
  
  
  return (
    <form onSubmit={onSubmit} aria-label='formulario'>
        <input 
            type="text" 
            placeholder="Buscar gift"
            value={inputValue}   
            onChange={e => setinputValue(e.target.value)} 
        />
    </form>
  )
}


// Definir los tipos de las props
AddCategory.propTypes = {
    onNewCategory: PropTypes.func.isRequired, // Define que es una función requerida
};