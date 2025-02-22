export const getMessagesEs = ()=>{
  return {
    allDay: 'Todo el día',
    next: 'Siguiente',
    previous: 'Anterior',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: total => `+ Ver más (${total})`
  }
}

export const getMensajesEN = () => {
  return {
      allDay: 'All day',
      previous: 'Previous',
      next: 'Next',
      today: 'Today',
      month: 'Month',
      week: 'Week',
      day: 'Day',
      agenda: 'Diary',
      date: 'Date',
      time: 'Time',
      event: 'Event',
      noEventsInRange: 'There are no events in this range',
      showMore: total => `+ See more (${total})`
  }
};
