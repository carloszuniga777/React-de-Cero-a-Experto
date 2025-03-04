import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import { calendarAPI } from "../api"
import { useCallback } from "react"
import { convertEventToDate } from "../helpers"



export const useCalendarStore = ()=>{

    const dispatch = useDispatch()

    //obteniendo los eventos del state calendar de redux 
    const {events, activeEvent}  = useSelector(state => state.calendar)
    
    //Obteniendo el usuario
    const {user}  = useSelector(state => state.auth)
     
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
         
         //Crea un nuevo evento en el backend
         const { data } = await calendarAPI.post('/events', calendarEvent)

           //Guarda el evento en store de calendar del redux 
           dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}))
       }  

    }




   //Elimina la nota del state calendar del redux
    const startDeleteEvent = ()=>{
        dispatch(onDeleteEvent())
    }


    //Obtiene todos los eventos del calendario desde el backend
    const startLoadingEvents = useCallback(async()=>{
        try {
            
             //Obtiene los eventos del calendario desde una peticion al backend
            const {data} = await calendarAPI.get('/events')
             
            //Convierte las fechas de los eventos de string a un objet de tipo date para poder manipularlo como fecha
            const events = convertEventToDate(data.eventos)

           //Guarda todos los eventos en el store de redux     
           dispatch(onLoadEvents(events))
            
        } catch (error) {
            console.error('Error cargando eventos', error)
        }
    }, [dispatch])



    return {
        //* Propiedades
        events,
        activeEvent,
        hasEventSelect: !!activeEvent,

        //* Metodos
        setActiveEvent,
        startSavingEvent,
        startDeleteEvent,
        startLoadingEvents
    }

}