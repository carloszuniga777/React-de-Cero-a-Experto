import { useCalendarStore, /*useUiStore*/ } from "../../hooks"

export const FabDelete = () => {
  
  //const {isDateModalOpen} = useUiStore()       //Obtiene el estado del modal

  const {startDeleteEvent, /*hasEventSelect*/} = useCalendarStore()

 //Elimina la nota activa del state calendar de redux
 const handleDelete = ()=>{
    startDeleteEvent()           
 }

  return (
    <button 
            className='btn btn-danger fab-danger'   
            onClick={handleDelete}
            //style={{display: hasEventSelect && !isDateModalOpen ? '' : 'none'}}               //Ocultar boton por medio de css
    >
        <i className="fas fa-trash-alt"></i>    
    </button>
  )
}
