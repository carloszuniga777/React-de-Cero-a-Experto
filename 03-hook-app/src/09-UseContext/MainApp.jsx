import {  Navigate, Route, Routes } from "react-router"
import {  HomePage  } from "./HomePage"
import { LoginPage } from "./LoginPage"
import {  AboutPage } from "./AboutPage"
import { Navbar } from "./components/Navbar"
import { UserProvider } from "./hooks/UserProvider"

export const MainApp = () => {
  return (
    <UserProvider>
            <div>MainApp</div>
            <Navbar/>
            <hr/>

            <Routes>
                <Route path="/" element={<HomePage/>} />
                <Route path="login" element={<LoginPage/>} />
                <Route path="about" element={<AboutPage/>} />

                <Route path="/*" element={<Navigate to='/about'/>} />
            </Routes>
    </UserProvider>
  )
}
