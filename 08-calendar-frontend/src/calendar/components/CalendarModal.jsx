import { useMemo, useState, useEffect } from 'react';
import Modal from 'react-modal';
import './CalendarModal.css'
import { addHours } from 'date-fns/addHours';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';
import differenceInSeconds from 'date-fns/differenceInSeconds';


import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'
import { useCalendarStore, useUiStore } from '../../hooks';



//configuracion del idioma del datapicker
registerLocale('es', es)


//Modal: Estilos del modal
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

//Modal: root de la aplicacion (archivo index)

//Para que no ejecute en modo test
if(import.meta.env.MODE !== 'test'){
  Modal.setAppElement('#root');
} 


//Valores iniciales del formulario
const initialForm = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours( new Date(), 2)
}
 


export const CalendarModal = () => {

  //Control del modal (abrir/cerrar modal)
  const {isDateModalOpen, closeDateModal} = useUiStore()
 
  // Obtiene la nota activa del store del calendar de redux
  // el cual sirve, para actualizar los elementos del formulario con los datos seleccionados del evento 
   const {activeEvent, startSavingEvent} = useCalendarStore()


   //----------------------------------------------
   //      Formulario

  //Estado del formulario
  const [formValues, setformValues] = useState(initialForm)
  

  //Guardando el formulario
  const onInputChanged = ({target})=>{
    setformValues(current => ({
      ...current,
      [target.name]: target.value
    }))
  }

  //guardando el formulario para datapickers
  const onDateChange = (date, name)=>{
    setformValues(current =>({
      ...current,
      [name]: date
    }))
  }


  //Acualiza el form con los valores del evento activo del state del calendar de redux 
  useEffect(() => {

    if(activeEvent !== null) {
      setformValues({...activeEvent})
    }
  }, [activeEvent])

  
  //--------------------Submit--------------------------------
  
  const [formSubmitted, setFormSubmitted] = useState(false)

  
  //Valida si el titulo esta vacio o no, devuelve una clase
  const titleClass = useMemo(()=>{
     
     //Si el formulario no se ha disparado (formSubmitted) siempre devuelve una clase vacia 
    if(!formSubmitted) return ''           

    //Si el formulario se disparo devuelve la clase
    return (formValues.title.length > 0) 
              ? 'is-valid'
              : 'is-invalid'

  }, [formValues.title, formSubmitted])
  

  

  const onSubmit = async(event)=>{
    event.preventDefault()
    
    //Activa la valicion del titulo 
    setFormSubmitted(true)
    
    //Validacion de fechas
    const difference = differenceInSeconds( formValues.end, formValues.start )
    
    if( isNaN(difference) || difference <= 0){
      Swal.fire('Fechas incorrectas', 'Revisar as fechas ingresadas', 'error')
      return
    } 

    //Validacion de titulo
    if( formValues.title.length <= 0) return 


    //Guarda la nota en la base de datos y el store de redux
    await startSavingEvent(formValues)


    //Cerrar modal
    closeDateModal()

    //Desactiva la validacion del title
    setFormSubmitted(false)


    // Limpiar el formulario restableciendo el estado a los valores iniciales
    setformValues({...activeEvent})

  }



  return (
    <Modal
        isOpen={isDateModalOpen}
        onRequestClose={closeDateModal}
        style={customStyles}
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={200}
    >

      {/**-------------Contendio Modal------------------*/} 
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container"
            onSubmit={onSubmit}
      >

          {/**Fecha inicio */}
          <div className="form-group mb-2">
              <label>Fecha y hora inicio</label>
              <DatePicker 
                      className="form-control" 
                      selected={formValues.start} 
                      onChange={(date) => onDateChange(date, 'start')}
                      dateFormat="Pp"
                      showTimeSelect
                      locale='es'
                      timeCaption='Hora'
                     // maxDate={formValues.end} 
              />
          </div>

          
          {/**Fecha fin */}
          <div className="form-group mb-2">
              <label>Fecha y hora fin</label>
              <DatePicker
                    minDate={formValues.start} 
                    className="form-control" 
                    selected={formValues.end}
                    onChange={(date) => onDateChange(date, 'end')}
                    dateFormat="Pp"
                    showTimeSelect
                    locale='es'
                    timeCaption='Hora'
              />
          </div>

          <hr />

          {/**Titulo y notas */}
          <div className="form-group mb-2">
              <label>Titulo y notas</label>
              <input 
                  type="text" 
                  className={`form-control ${titleClass}`}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={formValues.title}
                  onChange={onInputChanged}
              />
              <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
          </div>


           {/**Informacion adicional */} 
          <div className="form-group mb-2">
              <textarea 
                  type="text" 
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={formValues.notes}
                  onChange={onInputChanged}
              ></textarea>
              <small id="emailHelp" className="form-text text-muted">Información adicional</small>
          </div>

          {/**Boton guardar */}  
          <button
              type="submit"
              className="btn btn-outline-primary btn-block"
          >
              <i className="far fa-save"></i>
              <span> Guardar</span>
          </button>
      </form>


      {/**--------------Fin contenido Moda ------------------- */}

    </Modal>
  )
}
