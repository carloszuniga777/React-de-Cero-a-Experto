import express from 'express'
import 'dotenv/config'
import {authRouter} from './routes/auth.js'; 
import {eventsRouter} from './routes/events.js'; 
import { dbConnection } from './dababase/config.js';
import cors from 'cors'


//1. Crear el servidor de express
const app = express()


//2. Base de datos
dbConnection()


//3. CORS: Es un mecanismo de seguridad implementado por los navegadores 
// para restringir las solicutudes HTTP entre diferentes origenes 
//documentacion: https://www.npmjs.com/package/cors 
app.use(cors())


//4. Directorio Publico

//Cuando alguien entre al / desde el navegador se va a mostrar el directorio publico, es decir la aplicacion de react
//Nota: Se tiene que crear la carpeta 'public' con el html/css
app.use( express.static('public'))                                     //App.use es un middleware que se ejecuta en el momento que alguien hace una peticion al servidor


//5. Lectura y parseo del body

//Transforma automaticamente el cuerpo (body) de las peticiones HTTP (en formato JSON) a un objeto javascript
app.use(express.json()) 




//7. Rutas

//Autenticacion
app.use(
    '/api/auth',  //End point
    authRouter    //Definicion de las Rutas
)  

app.use(
    '/api/events',   //End point
    eventsRouter     //Definicion de las Rutas
)     



//8. Escuchar peticiones en el puerto 4000.
app.listen(process.env.PORT, ()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`)
})

