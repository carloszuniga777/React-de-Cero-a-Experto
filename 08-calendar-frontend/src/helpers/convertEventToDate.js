import { parseISO } from "date-fns"


// Convierte la fecha de los eventos del calendario, 
// que vienen en formato string ejemplo: "1970-01-01T00:00:00.010Z" a objeto
export const convertEventToDate = (events = [])=>{

    return events.map( event =>{
        
        event.start = parseISO(event.start)
        event.end   = parseISO(event.end)
        return event
    })
}