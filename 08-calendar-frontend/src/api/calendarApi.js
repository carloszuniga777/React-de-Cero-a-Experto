import axios from 'axios'


const calendarAPI = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})



//----Configuracion del interceptor------

// Agrega un interceptor a todas las solicitudes HTTP hechas con "calendarAPI"
calendarAPI.interceptors.request.use( config => {

    // Modifica los headers de la solicitud para incluir el token almacenado
    config.headers = {
        ...config.headers,
        'x-token' : localStorage.getItem('token')    // Token de autenticación
    }

    // Retorna la configuración modificada para que Axios continúe con la solicitud
    return config
})

export default calendarAPI