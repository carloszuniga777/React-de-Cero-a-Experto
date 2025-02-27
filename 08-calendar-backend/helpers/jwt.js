import jwt from 'jsonwebtoken'

//Generando el Json Web Token para poder autenticar al usuario | documentacion: https://www.npmjs.com/package/jsonwebtoken
const generarJWT = (uid, name)=>{

    return new Promise((resolve, reject)=>{

        const payload = {uid, name}

        jwt.sign(payload, process.env.SECRET_JWT_SEED, {                //La variable de entorno escrita aleatoriamente, tiene que ser una palabra que sea dificil de adivinar
            expiresIn: '2h'                                             //Tiempo de expiracion del token es de 2 horas            
        }, (error, token)=>{

            //Si hay error al crear el token
            if( error){
                console.error(error)
                reject('No se pudo generar el token')
            }

            //Si todo sale bien
            resolve(token)

        })    
    })


}

export { generarJWT }