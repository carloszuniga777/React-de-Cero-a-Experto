import { Navigate } from "react-router"
import { DcPage, MarvelPage, SearchPage, HeroPage } from "../../pages"


//Rutas privadas
export const RutasPrivadas = [
    {
      path: "/marvel",
      element: <MarvelPage />,
    },
    {
      path: "/dc",
      element: <DcPage />,
    },
    {
      path: "/search",
      element: <SearchPage />,
    },
    {
      path: "/hero/:id",
      element: <HeroPage />,
    },
    {
      path: "/*",
      element: <Navigate to={"/marvel"} />,
    },
  ]