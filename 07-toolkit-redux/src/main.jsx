import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'                     // eslint-disable-line

import { Provider } from 'react-redux'
import { store } from './store'
import { PokemonApp } from './PokemonApp'        // eslint-disable-line
import { RTKQueryApp } from './RTKQueryApp'       // eslint-disable-line


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider  store={store}>
        {/* <App /> */}
        {/* <PokemonApp/> */}
        <RTKQueryApp/>
    </Provider>
  </StrictMode>,
)
