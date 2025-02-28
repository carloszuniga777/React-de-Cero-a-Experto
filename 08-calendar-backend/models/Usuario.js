import {Schema, model} from 'mongoose'


//Crear el un esquema
const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


// Crear el modelo y exportarlo
const Usuario = model('Usuario', UsuarioSchema)

export { Usuario };