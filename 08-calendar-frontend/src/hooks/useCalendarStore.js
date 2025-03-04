import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store"
import { calendarAPI } from "../api"
import { useCallback } from "react"
import { convertEventToDate } from "../helpers"
import Swal from "sweetalert2"


// Custom hook para manejar todos los eventos del calendario.  
// Agregar, actualizar, eliminar eventos del calendario, 
// estos eventos son almancenados en el backend por medio de una peticion REST APi 
// y a la vez almacenados en store calendar de redux
export const useCalendarStore = ()=>{

    const dispatch = useDispatch()

    //obteniendo los eventos del state calendar de redux 
    const {events, activeEvent}  = useSelector(state => state.calendar)
    
    //Obteniendo el usuario del store de autenticacion
    const {user}  = useSelector(state => state.auth)
     



    //configurando el state de redux con el evento activo del calendar 
    const setActiveEvent = (calendarEvent)=>{
        dispatch(onSetActiveEvent(calendarEvent))
    }




   //Guardar o actualizar nota del state calendar del redux
    const startSavingEvent = async(calendarEvent)=>{

        try {

              //---------------Actualizar evento----------------

             //Si tiene el id esta actualizando, si no tiene el id esta creando   
            if( calendarEvent.id ){                             
                    
                //Actualiza el evento atraves de una peticon al backend
                await calendarAPI.put(`/events/${calendarEvent.id}`, calendarEvent)

                //Actualiza el state de calendar del redux
                dispatch(onUpdateEvent({...calendarEvent, user}))


                return  //Sale
            }     
        
            
            //-----------Crear Nuevo evento------------------
            
            //Crea un nuevo evento atraves de una peticion al backend
            const { data } = await calendarAPI.post('/events', calendarEvent)

            //Guarda el evento en store de calendar del redux 
            dispatch(onAddNewEvent({...calendarEvent, id: data.evento.id, user}))


        } catch (error) {
            console.error('Error guardar eventos', error)
            Swal.fire('Error al guardar evento', error.response.data.msg, 'error')
        }
    }




   //Elimina la nota del state calendar del redux
    const startDeleteEvent = async()=>{
        try {
            
            //Realiza la peticion de eliminacion del evento hacia al backend
            await calendarAPI.delete(`/events/${activeEvent.id}`)

            //Elimina el evento en el store de calendar de redux
            dispatch(onDeleteEvent())   
            
        } catch (error) {
            console.error('Error al eliminar evento', error)
            Swal.fire('Error al eliminar evento', error.response.data.msg, 'error')
        }

        
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
            Swal.fire('Error al cargar los eventos', error.response.data.msg, 'error')
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