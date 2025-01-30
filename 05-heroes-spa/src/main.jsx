import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import { HeroesApp } from './HeroesApp'
import { BrowserRouter } from "react-router";    // eslint-disable-line

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<BrowserRouter>*/}     {/**Comentar cuando se use AppRouterNew  y descomentar cuando se use AppRouter */}
        <HeroesApp/>
    {/*</BrowserRouter>*/}
  </StrictMode>,
)
