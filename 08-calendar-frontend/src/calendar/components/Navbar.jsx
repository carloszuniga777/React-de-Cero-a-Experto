import { useAuthStore } from "../../hooks"


export const Navbar = ({ onChangeLenguaje, lenguaje }) => {
  

  const {user, startLogout} = useAuthStore()

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
        <span className="navbar-brand">
            <i className="fas fa-calendar-alt"></i>
            &nbsp; &nbsp;
            {user?.name}
        </span>

        <button className="btn btn-outline-success" onClick={ onChangeLenguaje }>
            <i className="fas fa-language"></i>
            &nbsp;
            { 
              !lenguaje ? 'Cambiar a Español' : 'Change to English'
            }
        </button>

        <button className="btn btn-outline-danger"
                onClick={startLogout}
        >
            <i className="fas fa-sign-out-alt"></i>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}
