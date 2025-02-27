import {response} from 'express'
import { validationResult } from 'express-validator'


//Es un middleware personalizado que revisa si hay errores en la petición
const validarCampos = (req, res = response, next)=>{

   //----------manejo de errores de las validaciones----------- 
   const errors = validationResult(req)

   //Si hay errores
   if(!errors.isEmpty()){
       //Error 400 mala solcitud del frontend
       return res.status(400).json({
           ok: false,
           errors: errors.mapped() 
       }) 
   }

   //-------------------------------------------------------

   next()  //Si no hay ningun error se ejecuta esto

}


export { validarCampos };