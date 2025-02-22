

export const Navbar = ({ onChangeLenguaje, lenguaje }) => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp;
            Carlos
        </span>

        <button className="btn btn-outline-success" onClick={ onChangeLenguaje }>
            <i className="fas fa-language"></i>
            &nbsp;
            { 
              !lenguaje ? 'Cambiar a Español' : 'Change to English'
            }
        </button>

        <button className="btn btn-outline-danger">
            <i className="fas fa-sign-out-alt"></i>
            <span>Salir</span>
        </button>
    </div>
  )
}
