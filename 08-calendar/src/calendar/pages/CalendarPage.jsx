import { Calendar, Views } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent, CalendarModal, Navbar } from "../"
import addHours  from 'date-fns/addHours'
import { localizer, getMessagesEs, getMensajesEN } from '../../helpers';
import { useState } from 'react';



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


export const CalendarPage = () => {

  //Estados del calendario
  const [lenguaje, setLenguaje] = useState(true)
  const [lastView, setLastView] = useState(localStorage.getItem('lastView')|| Views.MONTH )
  const [currentDate, setCurrentDate] = useState(new Date())
 

  //Cambiar el lenguaje del calendario
  const onChangeLenguaje = () => {
    setLenguaje(current => !current);
  };
 

  const onDoubleClick = (event)=>{
    console.log('doble', event)
  }

  const onSelect = (event)=>{
    console.log('click', event)
  }

  //Almacena la vista actual del calendario
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



  return (
    <>
      <Navbar onChangeLenguaje={ () => onChangeLenguaje() }
              lenguaje={ lenguaje }
      />

      <Calendar
          culture={ lenguaje ? 'es-ES' : 'en-US' }
          messages={ lenguaje ? getMessagesEs() : getMensajesEN() }
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={lastView}
          date={currentDate}
          view={lastView}
          onNavigate={setCurrentDate}
          style={{ height: 'calc(100vh - 80px)', width: '100%' }}
          eventPropGetter={ eventStyleGetter }
          components={{event: CalendarEvent}}
          onDoubleClickEvent={onDoubleClick}
          onSelectEvent={onSelect}
          onView={onViewChanged}
        />
        <CalendarModal/>
    </>
  )
}
