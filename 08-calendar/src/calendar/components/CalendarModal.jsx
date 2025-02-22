import { useState } from 'react';
import Modal from 'react-modal';
import './CalendarModal.css'
import { addHours } from 'date-fns/addHours';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { es } from 'date-fns/locale/es';

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
Modal.setAppElement('#root');



export const CalendarModal = () => {
  
  //Estado del modal: abrir y cerrar modal
  const [isOpen, setIsOpen] = useState(true)
  
    //Cerrra modal
    const onCloseModal= ()=>{
      setIsOpen(false)
    }

   //----------------------------------------------
   //      Formulario

  //Estado del formulario
  const [formValues, setformValues] = useState({
    title: 'Jorge Trochez',
    notes: 'Trochez',
    start: new Date(),
    end: addHours( new Date(), 2)
  })
  
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

  //----------------------------------------------------


  return (
    <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container">

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
                  className="form-control"
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


    </Modal>
  )
}
