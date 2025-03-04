import { Calendar, Views } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../"
import { localizer, getMessagesEs, getMensajesEN } from '../../helpers';
import { useState } from 'react';
import { useUiStore, useCalendarStore } from '../../hooks';
import { useEffect } from 'react';


/*
const events=[{
  title: 'Cumpleanos de Jorge',
  notes: 'Hay que comprar un pastel',
  start: new Date(),
  end: addHours( new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Jorge'
  }
}]
*/

export const CalendarPage = () => {
  
  //Control del modal del calendario
  const {openDateModal, isDateModalOpen} = useUiStore()

  //Obtiene la data de los eventos del calendario y configura el evento activo del calendario 
  const { events, hasEventSelect, setActiveEvent, startLoadingEvents } = useCalendarStore()

  //Estados del calendario
  const [lenguaje, setLenguaje] = useState(true)
  const [lastView, setLastView] = useState(localStorage.getItem('lastView')|| Views.MONTH )
  const [currentDate, setCurrentDate] = useState(new Date())
 

  //Cambiar el lenguaje del calendario
  const onChangeLenguaje = () => {
    setLenguaje(current => !current);
  };
 
  //Abre el modal
  const onDoubleClick = (/*event*/)=>{
    openDateModal()
  }

  // Configura el state calendar de redux con la nota activa 
  // al momento de seleccionar el evento en el calendario
  // Esto nos permite tener la nota activa actualizada y nos sirve para cuando el modal se abre, 
  // se muestre el evento activo 
  const onSelect = (event)=>{
    setActiveEvent(event)
  }

  //Almacena la vista actual del calendario para que no se pierda al recargar la pagina
  const onViewChanged = (event)=>{
    localStorage.setItem('lastView', event)
    setLastView(event)
  }


  //Estilo de los eventos del calendario
    const eventStyleGetter = (event, start, end, isSelected) => {  // eslint-disable-line
      //console.log({event, start, end, isSelected});
      
      const style = {
          backgroundColor: '#367CF7',
          borderRadius: '0px',
          opacity: 0.9,
          color: 'white'
      }
      return {
          style
      }
  };

  //Carga las notas del calendario desde el backend
  useEffect(() => {
    startLoadingEvents()
  }, [startLoadingEvents])
  


  return (
    <>  
       {/**Menu*/}
      <Navbar onChangeLenguaje={ () => onChangeLenguaje() }
              lenguaje={ lenguaje }
      />

      {/**Calendario */}   
      <Calendar
          culture={ lenguaje ? 'es-ES' : 'en-US' }                    //Idiomas
          messages={ lenguaje ? getMessagesEs() : getMensajesEN() }   //Traduccion de los botones segun el idioma seleccionado
          localizer={localizer}                                       //Configuraciones del calendario: fecha, idioma, etc.
          events={events}                                             //Data de todos los eventos que tiene el calendario  
          startAccessor="start"
          endAccessor="end"
          defaultView={lastView}                                      //Ver la ultima pestana/vista seleccionada 
          date={currentDate}                                          //Fecha actual
          view={lastView}
          onNavigate={setCurrentDate}
          style={{ height: 'calc(100vh - 80px)', width: '100%' }}   //Tamano del calendario
          eventPropGetter={ eventStyleGetter }                      //Estilo de los eventos del calendario
          components={{event: CalendarEvent}}                       //Establece el formato de la nota, es decir, que contenido se va a reflejar en el calendario    
          onDoubleClickEvent={onDoubleClick}                        //Levanta el modal al dar doble click sobre el evento 
          onSelectEvent={onSelect}                                  //Selecciona la nota y la configura como nota activa en el state de redux    
          onView={onViewChanged}                                    //Guarda la ultima pestana/vista seleccionada 
        />

        {/**Modal */}
        <CalendarModal/>

        {/**Boton de agregar nueva nota */}
        <FabAddNew/>

         {/**Boton de eliminar nota */}  
        {
          hasEventSelect & !isDateModalOpen && (  <FabDelete/>)
        
        }
    </>
  )
}
