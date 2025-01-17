import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { CounterApp } from './CounterApp'
// import { FirstApp } from './FirstApp'


createRoot(document.getElementById('root')).render(
  <StrictMode>
     <CounterApp value={ 20 }/>
     {/* <FirstApp title='Hola, soy vegeta'/> */}
  </StrictMode>,
)
