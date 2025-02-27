import {response} from 'express'
import jwt from 'jsonwebtoken'



// Valida el Token y la inyecta en la request donde ya haya pasado el 
// JWT dispongan del uid y el name facilmente.

// Sirve para validar si un usuario esta auntenticado, 
// si esta auntenticado inyecta en el req su id y su name 
// para que pueda disponer de el en cualquier punto de la aplicacion 
// donde se encuentre autenticado
const validarJWT = (req, res = response, next)=>{

    // Obtenemos el Token del encabezado (header) llamado 'x-token' (lo nombrado asi)
    const token = req.header('x-token')


    //Si no encontro el Token, significa que el usuario no esta autenticado 
    if(!token){
        //Status 401: La solicitud requiere autenticación de usuario.
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }


    try {
        
        // Validamos que el token sea valido
        // Si el token es válido, se extrae el payload, que contiene los datos codificados (uid, name, fecha de creacion y expiracion del token ).
        const {uid, name} = jwt.verify(
            token, 
            process.env.SECRET_JWT_SEED
        )

        //Inyectamos los datos en la solicitud en la request
        //Agrega los datos del usuario (uid y name) al objeto req para que estén disponibles en middlewares o rutas posteriores.  
        req.uid = uid
        req.name = name



    } catch (error) {
        //Status 401: La solicitud requiere autenticación de usuario.
        return res.status(401).json({
            ok: false,
            msg: "Token no válido"
        })
    }





    next()   //Si todo es correcto, llama a next() para pasar al siguiente middleware o controlador.

}

export default validarJWT