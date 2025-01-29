import { useNavigate } from 'react-router';
import { Link, NavLink } from 'react-router';


export const Navbar = () => {

    const navigate = useNavigate()

    //El usuario al dar click en Logout lo redirecciona al Login
    const onLogout = () =>{
        navigate('/login', {
            replace: true       //Evita que el usuario pueda regresar al historial de navegacion anterior. En este caso como es Logout no queremos que regrese a la pagina anterior
        })
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className="nav-item nav-link" 
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        className="nav-item nav-link" 
                        to="/dc"
                    >
                        DC
                    </NavLink>

                    <NavLink 
                        className="nav-item nav-link" 
                        to="/search"
                    >
                        Search
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse w-100 order-3 dual-collapse2 d-flex justify-content-end">
                <ul className="navbar-nav ml-auto">
                    
                    <span className='nav-item nav-link text-primary'>
                            Carlos
                    </span>

                    <button 
                            className='nav-item nav-link btn'
                            onClick={onLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}