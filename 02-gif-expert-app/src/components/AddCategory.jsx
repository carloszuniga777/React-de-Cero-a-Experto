import { useState } from "react"
import PropTypes from 'prop-types'


export const AddCategory = ({ onNewCategory }) => {
  const [inputValue, setinputValue] = useState('')


  const onSubmit = (event)=>{
     event.preventDefault()
     
     if(inputValue.trim().length <= 0) return
     
     onNewCategory(inputValue.trim())

     setinputValue('')
  } 
  
  
  return (
    <form onSubmit={onSubmit}>
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