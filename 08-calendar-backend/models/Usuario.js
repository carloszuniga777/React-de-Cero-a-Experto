import {Schema, model} from 'mongoose'


//Crear el un esquema
const UsuarioSchema = Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    }
})


// Crear el modelo y exportarlo
const Usuario = model('Usuario', UsuarioSchema)

export { Usuario };