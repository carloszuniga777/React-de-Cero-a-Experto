//Establece el formato de la nota, es decir, que contenido se va a reflejar en el calendario
export const CalendarEvent = ({event}) => {
   
   const { title, user} = event

  return (
    <>
        <strong>{title}</strong>
        <span> - {user.name}</span>
    </>
  )
}
