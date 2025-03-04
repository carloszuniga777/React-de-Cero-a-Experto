import { createSlice } from '@reduxjs/toolkit'
//import { addHours } from 'date-fns';

/*
const tempEvent = {
  _id: new Date().getTime(), 
  title: 'Cumpleanos de Jorge',
  notes: 'Hay que comprar un pastel',
  start: new Date(),
  end: addHours( new Date(), 2),
  bgColor: '#fafafa',
  user: {
    _id: '123',
    name: 'Jorge'
  }
}
*/

export const calendarSlice = createSlice({
    name: 'calendar',

    initialState: {
        isLoadingEvents: true,
        events: [ /*tempEvent*/ ],
        activeEvent: null
    },

    reducers: {
        //Configura la nota activa
        onSetActiveEvent: (state,  {payload}  ) => {
            state.activeEvent = payload
        },

        //Crea un nueva nota 
        onAddNewEvent: (state, {payload})=>{
          state.events.push(payload)                         //Inserta la nota  
          state.activeEvent = null                          //Cuando la nueva nota se inserta, limpia la nota activa
        },

        //Actualiza la nota 
        onUpdateEvent: (state, {payload})=>{

          state.events = state.events.map(event=>{

                if(event.id === payload.id){
                  return payload
                }
                return event     
          })   
          
        },
         
        //Elimina la nota
        onDeleteEvent: (state)=>{

          if(state.activeEvent){
            state.events = state.events.filter( event => event.id !== state.activeEvent.id)  //Elimina la nota activa
            state.activeEvent = null             //Limpia la nota activa                     
          }
        },
        
        //Carga todos los eventos al state
        onLoadEvents: (state, { payload = []})=>{
            state.isLoadingEvents = false
           // state.events = payload       //Se pudo hacer de esta forma, pero por performanse se opto for solo insertar los que no existen
            
           //Solo inserta los eventos que no estan en el state
           payload.forEach(event=>{
              //Busca si el evento existe en el state 
              const exists = state.events.some( dbEvent => dbEvent.id === event.id)   //devuelve true si lo encuentra, false si no

              //Si el evento no existe en el state lo inserta
              if(!exists){
                state.events.push(event)  
              }
            })
        },

        //Eliminacion de eventos
        onLogoutCalendar: (state)=>{
          state.isLoadingEvents = true,
          state.events = []
          state.activeEvent = null
        }

    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, 
               onAddNewEvent, 
               onUpdateEvent, 
               onDeleteEvent,
               onLoadEvents,
               onLogoutCalendar
             } = calendarSlice.actions