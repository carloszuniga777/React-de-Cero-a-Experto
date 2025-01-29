import { useNavigate } from "react-router"


export const LoginPage = () => {
  
  const navigate = useNavigate()

  const onLogin = ()=>{
    navigate('/', {
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
