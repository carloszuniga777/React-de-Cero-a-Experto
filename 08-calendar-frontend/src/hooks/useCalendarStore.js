import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store"

export const useCalendarStore = ()=>{

    const dispatch = useDispatch()

    //obteniendo los eventos del state calendar de redux 
    const {events, activeEvent}  = useSelector(state => state.calendar)
     
    //configurando el state de redux con el evento activo del calendar 
    const setActiveEvent = (calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }


   //Guardar o actualizar nota del state calendar del redux
    const startSavingEvent = async(calendarEvent)=>{

      //Si tiene el id esta actualizando, si no tiene el id esta creando   
       if( calendarEvent._id ){
            dispatch(onUpdateEvent({...calendarEvent}))
       }else{
           dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime() }))
       }  

    }

   //Elimina la nota del state calendar del redux
    const startDeleteEvent = ()=>{
        dispatch(onDeleteEvent())
    }




    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelect: !!activeEvent,

        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent
    }

}