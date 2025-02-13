import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {JournalApp} from './JournalApp'
import './styles.css'
import { Provider } from 'react-redux'
import { store } from './store'
import { AppTheme } from './theme'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>   {/**Provider de Redux */}
        <AppTheme>             {/**Tema para que toda la app tome los estilos de Material UI */}
            <JournalApp/>      {/**Aplicacion */}
        </AppTheme>
    </Provider>
  </StrictMode>,
)
