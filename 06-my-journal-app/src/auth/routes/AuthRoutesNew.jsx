import { Navigate } from "react-router";
import { LoginPage, RegisterPage } from "../pages";

/**
 *  El index se usa para especificar la ruta por defecto, 
 *  al ser una ruta anidada los path deben ser relativos a su posición, 
 *  por eso es necesario especificar el path del index
 *  y usar solo un asterisco sin pleca para la redirección automatica
 */
export const AuthRoutesNew = [
    {
      index: true,
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "*",
      element: <Navigate to={"/auth/login"} />,
    },
  ];