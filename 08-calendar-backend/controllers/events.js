import {response} from 'express'
import Evento from '../models/Evento.js'



//Documentacion mongoose: https://mongoosejs.com/docs/queries.html


//Obtener todos los eventos
export const getEventos = async(req, res = response)=>{
    try {
       
        //---------------Obteniendo los eventos de la base de datos -----------------

        // 1. 'Evento.find()': Obtiene todos los eventos de la base de datos
        // 2. '.populate('user', 'name')': Reemplaza el ID del usuario por SU NOMBRE SOLAMENTE
        //    - Sin populate: "user": "507f1f77bcf86cd799439011" (solo el ID)
        //    - Con populate: "user": { "name": "Juan Pérez" } (solo el campo especificado)
        //          - Si NO se especifica el segundo parámetro: traería TODOS los campos del usuario (name, email, password, etc)
      const eventos = await Evento.find().populate('user', 'name') 


      //-----------------------------------------------------------------------------
        //Status 200: ok
        res.json({
            ok: true,
            eventos
        })


    } catch (error) {
        console.error('Error al obtener obtener la peticion en getEvents', error)
            
        //Status: Error del servidor
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema. Por favor hable con el administrador'
        })
    }
}



//Crear evento
export const crearEvento = async(req, res = response)=>{
    try {
        
        //-----Guardar en la base de datos ---------------
        const evento = new Evento(req.body)

        evento.user = req.uid    //Agrega el id del usuario de la request | Se agrega el id de la request porque en el schema se especifico que va a ser una referencia


        const eventoGuardado = await evento.save()
        
        //------------------------------------------

        //Status 201: Se creo exitosamente
        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.error('Error al obtener obtener la peticion en crearEventos', error)
            
        //Status: Error del servidor
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema. Por favor hable con el administrador'
        })
    }
}




//Actualizar evento
export const actualizarEvento = async(req, res = response)=>{
    try {
          
          //Se obtiene el id de los parametros de la url: localhost:4000/api/events/id     
          const eventoId = req.params.id
          
          //Se obtiene el id del usuario
          const uid = req.uid

  
          //Validacion si el evento existe en la basde datos
          const evento = await Evento.findById(eventoId)
  

          if(!evento){
            //Status 404: No encontrado
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe con ese id" 
            })
          }

           //Si el id del evento es diferente al id del usuario, 
           //Significa, que es una persona que quiere editar el evento de otra persona y eso no es permitido 
           if(evento.user.toString() !== uid){
                //Status 401: No autorizado
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene provilegio de editar este evento" 
                })
           }

           //Se crea un nuevo evento apartir del request: {title, note, start, end, user}
           const nuevoEvento = {
              ...req.body,       
              user: uid
           }

           //Actualizando en la base de datos
           const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true})   //new: true devuelve el documento actualizado



         //Status 200: Ok
         res.json({
            ok: true,
            evento: eventoActualizado
        })

        
    } catch (error) {
        console.error('Error al obtener obtener la peticion en actualizarEvento', error)
            
        //Status: Error del servidor
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema. Por favor hable con el administrador'
        })
    }
}



//Eliminar evento
export const eliminarEvento = async(req, res = response)=>{
    try {

         //Se obtiene el id de los parametros de la url: localhost:4000/api/events/id     
          const eventoId = req.params.id

          
          //Se obtiene el id del usuario
          const uid = req.uid

  
          //Validacion si el evento existe en la basde datos
          const evento = await Evento.findById(eventoId)
  

          if(!evento){
            //Status 404: No encontrado
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe con ese id" 
            })
          }

           //Si el id del evento es diferente al id del usuario, 
           //Significa, que es una persona que quiere borrar el evento de otra persona y eso no es permitido 
           if(evento.user.toString() !== uid){
                //Status 401: No autorizado
                return res.status(401).json({
                    ok: false,
                    msg: "No tiene provilegio eliminar este evento" 
                })
           }

          //Eliminado en la base de datos
          await Evento.findByIdAndDelete(eventoId)   
          

         //Status 
         res.json({
            ok: true,
        })
        

        
    } catch (error) {
        console.error('Error al obtener obtener la peticion en eliminarEvento', error)
            
        //Status: Error del servidor
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema. Por favor hable con el administrador'
        })
    }
}
