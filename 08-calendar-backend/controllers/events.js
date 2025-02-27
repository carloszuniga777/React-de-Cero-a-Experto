import {response} from 'express'

export const getEventos = (req, res = response)=>{
    try {
        
        //Status 200: ok
        res.json({
            ok: true,
            msg: 'getEventos'
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




export const crearEventos = (req, res = response)=>{
    try {
        
        //Status 201: Se creo exitosamente
        res.status(201).json({
            ok: true,
            msg: 'crearEventos'
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





export const actualizarEvento = (req, res = response)=>{
    try {
        
         //Status 201: Se creo exitosamente
         res.status(201).json({
            ok: true,
            msg: 'actualizarEvento'
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




export const eliminarEvento = (req, res = response)=>{
    try {

         //Status 
         res.json({
            ok: true,
            msg: 'eliminarEvento'
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
