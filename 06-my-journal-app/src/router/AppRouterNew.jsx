import { AuthRoutesNew } from "../auth";
import { JournalRoutesNew } from "../journal";

/**
 * En el AppRouter colocamos las rutas absolutas, 
 * es necesario poner el path de "/auth" 
 * para que sus hijas se consideren anidadas
 */
export const AppRouterNew = [
    {
      path: "/auth/*",
      children: AuthRoutesNew,
    },
    {
      path: "/",
      children: JournalRoutesNew,
    },
  ];