import {Schema, model} from 'mongoose'


//Crear el un esquema
const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start:{
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true
    },
    user:{
       type: Schema.Types.ObjectId,        //Le indica a MongoDB que va a ser una referencia     
       ref: 'Usuario',                      //Nombre del otro esquema Usuario.js
       required: true
    }   
})


//Cambiando el nombre por defecto que genera MongoDB de _id a id y quitando __v
//Esta modificacion no es a nivel de base de datos, sino del json del resultado de la solicitud
EventoSchema.method('toJSON', function(){
    const {_id, __v, ...object} = this.toObject()
    object.id = _id
    return object
})


// Crear el modelo y exportarlo
const Evento = model('Evento', EventoSchema)

export default Evento 