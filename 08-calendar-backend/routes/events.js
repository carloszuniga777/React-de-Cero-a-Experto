import {Router} from 'express';
import validarJWT from '../middlewares/validar-jwt.js';
import { actualizarEvento, crearEventos, eliminarEvento, getEventos } from '../controllers/events.js';


const eventsRouter = Router();

//--------End points------------------

// Obtener eventos
eventsRouter.get(
    '/',         //Ruta
    validarJWT,  //Middleware para validar si un usuario esta autenticado
    getEventos  //Controlador 
)

//Crear un nuevo evento
eventsRouter.post(
    '/',                //Ruta    
    validarJWT,         //Middleware para validar si un usuario esta autenticado
    crearEventos        //Controlador
)

// Actualizar Evento
eventsRouter.put(
    '/:id',             //Ruta 
    validarJWT,         //Middleware para validar si un usuario esta autenticado
    actualizarEvento    //Controlador
)


// Borrar Evento
eventsRouter.delete(
    '/:id',             //Ruta
    validarJWT,         //Middleware para validar si un usuario esta autenticado
    eliminarEvento      //Controlador
)


//-----------------------------------------

export {eventsRouter}