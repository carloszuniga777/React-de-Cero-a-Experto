import { useContext } from "react"
import { UserContext } from "./hooks/UserContext"

export const LoginPage = () => {

  const {user, setUser} = useContext(UserContext)

  return (
    <>
        <div>LoginPage</div>
        <hr />
        
        <pre aria-label="pre-arial-label">
            {
              JSON.stringify(user, null, 3)
            }
        </pre>

        <button className="btn btn-primary" onClick={()=>setUser({id: 123, name: 'juan', correo: 'juan@correo.hn'})}>
          Establecer usuario
        </button>  
    </>
  )
}
