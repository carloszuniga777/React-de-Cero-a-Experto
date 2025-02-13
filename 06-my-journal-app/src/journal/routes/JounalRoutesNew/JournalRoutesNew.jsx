import { Navigate } from "react-router";
import { JournalPage } from "../../pages/JournalPage";

//Define las rutas del JournalAPp
export const JournalRoutesNew = [
    {
      index: true,
      element: <JournalPage />,         /**Pagina principal de la APP */
    },
    {
      path: "/*",
      element: <Navigate to={"/"} />,
    },
  ];
