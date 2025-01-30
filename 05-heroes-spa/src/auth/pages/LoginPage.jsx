import { useContext } from "react"
import { useNavigate } from "react-router"
import { AuthContext } from "../hooks"


export const LoginPage = () => {
  
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const onLogin = ()=>{

    //Obtiene la ultima url almacenada en el localStorage
    // y regresa al usuario a la ultima pagina visitada cuando este hace loggin
    const lastPath = localStorage.getItem('lastPath') || '/'
       
    login('Carlos Zuniga')   //configura el usuario, por medio del reducer del context

    //redirecciona al menu principal
    navigate( lastPath, {
      replace: true       //Evita que el usuario pueda regresar al historial de navegacion anterior. En este caso como es Logout no queremos que regrese a la pagina anterior
    })
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr/>

      <button 
          className="btn btn-primary"
          onClick={onLogin}
      >
          Login
      </button>
    </div>
  )
}
