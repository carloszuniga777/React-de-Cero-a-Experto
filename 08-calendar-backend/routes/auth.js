/**
 *   Rutas de Auth
 *   host + /api/auth
 * 
 *   Centraliza las rutas de autenticación: registro de usuarios, inicio de sesión 
 *   y renovación de tokens JWT bajo el endpoint /api/auth.
 * 
 */

import {Router} from 'express';
import { body /*check*/ } from 'express-validator'
import {crearUsuario, loginUsuario, revalidarToken} from '../controllers/auth.js'
import { validarCampos } from '../middlewares/validar-campos.js';
import validarJWT from '../middlewares/validar-jwt.js';


const authRouter = Router();

//--------End points------------------

//Creacion de usuario
authRouter.post(
    '/new',                           //Ruta               
    [ // middlewares: Validaciones              
        body('name', 'El nombre es obligatorio' ).not().isEmpty(),     
        body('email', 'El email es obligatorio' ).isEmail().normalizeEmail(),      // Sanitiza el email (ej: convierte a minúsculas),     
        body('password', 'La contraseña es muy débil' ).isStrongPassword({ 
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0  
        }),

        //Es un middleware personalizado que revisa si hay errores en la petición
        validarCampos                 
    ],
    crearUsuario                 //Controlador 
)

//Auntenticacion
authRouter.post(
    '/',                              //Ruta                  
    [ // middlewares: validaciones   
        body('email', 'El email es obligatorio').isEmail().normalizeEmail(),       // Sanitiza el email (ej: convierte a minúsculas), ,
        body('password', 'La contraseña es muy débil' ).isStrongPassword({ 
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0  
        }),

        //Es un middleware personalizado que revisa si hay errores en la petición
        validarCampos                            
    ], 
    loginUsuario                       //Controlador             
)


 //Renovacion del JWT                
 authRouter.get('/renew',               //Ruta
                validarJWT,             //Middleware para validar si un usuario esta autenticado
                revalidarToken          //Controlador
               ) 


 //---------------------------------------


export { authRouter };