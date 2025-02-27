/**
 * Contiene la logica de autenticacion, creacion de usuario y revalidacion de JWK
 */

import {response} from 'express'
import {Usuario} from '../models/Usuario.js'      //Importamos nuestro modelo. Este modelo representa la estructura y comportamiento de los datos relacionados con un usuario en la base de datos.
import bcrypt, { compareSync } from "bcryptjs"; 
import { generarJWT } from '../helpers/jwt.js'

//Documentacion de codigo de errores: https://www.restapitutorial.com/httpstatuscodes


//Logica de creacion de usaurio
 export const crearUsuario = async(req, res = response)=>{
  
    try {
    
        const {email, password} = req.body

        //-------Validacion en la Base de datos -----------

        //Busca en la base de datos el correo, si lo encuentra lanza error de que el usuario ya existe
        let usuario = await Usuario.findOne({email})
        
         if(usuario){
            //Status 400: Error de mala solicitud del cliente
            return res.status(400).json({
                ok: false,
                msg: 'El usuario ya existe con ese correo'
            })
         }
         

        //------Guardar en la Base de datos ---------------
        
        // 1. Creamos una nueva instancia del modelo "Usuario" utilizando los datos recibidos en el cuerpo de la solicitud (req.body).
        // El objeto "req.body" contiene los datos enviados por el cliente, generalmente en formato JSON, que se utilizarán para crear un nuevo usuario.
         usuario = new Usuario(req.body)
        
         //2. Encriptar contrasena:      | documentacion: https://www.npmjs.com/package/bcryptjs
         const salt = bcrypt.genSaltSync();
         usuario.password = bcrypt.hashSync(password, salt);


        // 3. Guardamos el nuevo usuario en la base de datos utilizando el método "save()" del modelo.
         await usuario.save()
        
        //------------Generar el Json Web Token de autenticacion-----------
        
        const token = await generarJWT(usuario.id, usuario.name)


        //Status 201: Se creo exitosamente     
        res.status(201).json({                    //Envia una respuesta de tipo json
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
        


    } catch (error) {
        console.error('Error al crear el usuario: ', error)

        //Status 500: Error en el sevidor
        res.status(500).json({
             ok: false,
             msg: 'Por favor hable con el administrador'   
        })
    }
    
}





//Logica de Autenticacion
export const loginUsuario = async(req, res = response)=>{
     
   try {

        const {email, password} = req.body

        //-------Validacion si el correo existe en la Base de datos -----------

        //Busca en la base de datos el correo, si no encuentra lanza error de que el usuario no existe
        const usuario = await Usuario.findOne({email})
        
         if(!usuario){
            //Status 400: Error de mala solicitud del cliente
            return res.status(400).json({
                ok: false,
                msg: 'El usuario y contraseña no son correctas'
            })
         }
            
        //----------Validacion si contrasena es correcta-----------------------   
        
        //Compara la contrasena del usuario con la contrasena encriptada que se encuentra en la base de datos 
        const validPassword = compareSync(password, usuario.password)

        //Si la contrasena no es correcta lanza error    
        if(!validPassword){
            //Status 400: Error de mala solicitud del cliente
            return res.status(400).json({
                ok: false,
                msg: 'El usuario y contraseña no son correctas'
            })
        }

        //------------Generar el Json Web Token de autenticacion-----------
        
        const token = await generarJWT(usuario.id, usuario.name)


        //Status 200: Ok     
        res.json({         
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })


   
        
   } catch (error) {

         console.error('Error al crear el usuario: ', error)

        //Status 500: Error en el sevidor
        res.status(500).json({
             ok: false,
             msg: 'Por favor hable con el administrador'   
        })
    
   }    
    
 }




//Logica de revalidacion de Json Web Token
 export const revalidarToken = async(req, res = response)=>{

    //Obtenemos el id y name de la request
    const {uid, name} = req

    try {

        //Generamos un nuevo token
        const token = await generarJWT(uid, name)
    

        //Status 200: Ok   
        res.json({          
            ok: true, 
            token
        })


    } catch (error) {

        console.error('Error al revalidar Token: ', error)

        //Status 500: Error en el sevidor
        res.status(500).json({
             ok: false,
             msg: 'Por favor hable con el administrador'   
        })
        
    }

 }


