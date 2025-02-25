import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

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


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [ tempEvent ],
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
                if(event._id === payload._id){
                  return payload
                }
                return event     
          })   
        },
         
        //Elimina la nota
        onDeleteEvent: (state)=>{

          if(state.activeEvent){
            state.events = state.events.filter( event => event._id !== state.activeEvent._id)  //Elimina la nota activa
            state.activeEvent = null             //Limpia la nota activa                     
          }
        },


    }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions