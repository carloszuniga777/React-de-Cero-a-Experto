import { useContext } from "react"
import { UserContext } from "./hooks/UserContext"

export const HomePage = () => {

  const {user} = useContext(UserContext)
  
  return (
    <>
      <h1>HomePage <small>{user?.name}</small></h1>
      <hr/>

      <pre aria-label="pre-arial-label">
        {
          JSON.stringify(user, null, 3)
        }
      </pre>
    
    </>
  )
}
