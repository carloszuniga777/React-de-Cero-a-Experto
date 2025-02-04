import { Route, Routes } from "react-router"
import { AuthRoutes } from "../auth"
import { JournalRoutes } from "../journal"

export const AppRouter = () => {
  return (
    <Routes>
        {/**Login y Registro */}
        <Route path="/auth/*" element={<AuthRoutes/>}/>
        
        {/**JournalApp */}
        <Route path="/*" element={<JournalRoutes/>}/>

        
    </Routes>
  )
}
