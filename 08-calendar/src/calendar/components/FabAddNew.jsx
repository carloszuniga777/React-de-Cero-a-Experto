import { addHours } from "date-fns"
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

 // modal  
 const {openDateModal} = useUiStore()

 //Nota activa
 const {setActiveEvent} = useCalendarStore()
 
 
 const handleClickNew = ()=>{
    
    setActiveEvent({                       //Configura la nota activa como vacia                  
       title: '',
       notes: '',
       start: new Date(),
       end: addHours( new Date(), 2),
       bgColor: '#fafafa',
       user: {
        _id: '123',
        name: 'Carlos'
    }})
                          
    openDateModal()                         //Abre la modal
 }

  return (
    <button 
            className='btn btn-primary fab'
            onClick={handleClickNew}
    >
        <i className="fas fa-plus"></i>    
    </button>
  )
}
