/**
 * Rutas del events
 * host + /api/events
 * 
 * Centraliza las rutas de los eventos: obtener eventos, creacion de un nuevo evento, 
 * actualizar evento y borrar evento bajo el endpoint /api/events.
 * 
 */

import {Router} from 'express';
import validarJWT from '../middlewares/validar-jwt.js';
import { actualizarEvento, crearEvento, eliminarEvento, getEventos } from '../controllers/events.js';
import { body , check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos.js';
import isDate  from '../helpers/isDate.js';

const eventsRouter = Router();

//-----------Middleware--------------
//Middleware para validar si un usuario esta autenticado

//Todas las rutas que esten abajo de este middleware correspondiente a este End Point tienen que pasar por la validacion de JWT
//Si hay una ruta arriba de este middleware no aplica 
eventsRouter.use(validarJWT)    

//--------End points------------------

// Obtener eventos
eventsRouter.get(
    '/',         //Ruta
    //validarJWT,  //Middleware para validar si un usuario esta autenticado
    getEventos  //Controlador 
)

//Crear un nuevo evento
eventsRouter.post(
    '/',                //Ruta    
    [
        //--------------Middleware de validacion de campos de la request---------------------------------------- 
        
        body('title', 'El titulo es obligatorio').not().isEmpty(),                      //Valida que el titulo no este vacio
        body('start', 'Fecha de inicio es obligatoria').custom(isDate),                 //Valida que la fecha de inicio sea una fecha valida            
        body('end', 'Fecha de fin es obligatoria').custom(isDate),                     //Valida que la fecha de final sea una fecha valida
        validarCampos,                                                                 //Maneja los errores de las validaciones de body                                       

        //----------------------------------------------------------
        //validarJWT,                                                                //Middleware para validar si un usuario esta autenticado
    ],
    crearEvento        //Controlador
)




// Actualizar Evento
eventsRouter.put(
    '/:id',             //Ruta 
    [
        //--------------Middleware de validacion de campos de la request---------------------------------------- 
        check('id','Id is not valid').isMongoId(),                              //verifica que el id sea un MongoDB Objectid valido 
        body('title', 'El titulo es obligatorio').not().isEmpty(),              //Valida que el titulo no este vacio
        body('start', 'Fecha de inicio es obligatoria').custom(isDate),         //Valida que la fecha de inicio sea una fecha valida            
        body('end', 'Fecha de fin es obligatoria').custom(isDate),              //Valida que la fecha de final sea una fecha valida
        validarCampos,                                                          //Maneja los errores de las validaciones de body y check                                      

        //----------------------------------------------------------
        //validarJWT,                                                          //Middleware para validar si un usuario esta autenticado
    ],
    actualizarEvento    //Controlador
)


// Borrar Evento
eventsRouter.delete(
    '/:id',             //Ruta
    [  //--------------Middleware de validacion de campos de la request----------------
      check('id','Id is not valid').isMongoId(),                                    //verifica que el id sea un MongoDB Objectid valido 
      validarCampos,                                                                //Maneja los errores de las validaciones de body y check   
      //-------------------------------------------------------------------- 
      //validarJWT,       //Middleware para validar si un usuario esta autenticado
    ], 
    eliminarEvento      //Controlador
)


//-----------------------------------------

export {eventsRouter}