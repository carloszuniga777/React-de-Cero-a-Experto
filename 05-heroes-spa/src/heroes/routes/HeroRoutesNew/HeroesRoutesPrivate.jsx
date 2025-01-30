import { Outlet } from "react-router"
import { Navbar } from "../../../ui"


//Aqui se van a renderizar todas las rutas privadas
export const HeroesRoutesPrivate = () => {
  return (
    <>
        <Navbar />
        <div className="container">
            <Outlet />
        </div>
    </>
  )
}
