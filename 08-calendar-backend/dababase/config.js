import mongoose  from 'mongoose'


//Documentacion: https://mongoosejs.com/docs/connections.html
//nomeclatura: DB_CONNECTION = mongodb://username:password@host:port/database?options..mongodb.net/(nombre especificacion de base de datos : Se le puede dar cualquier nombre)

const dbConnection = async()=>{
    try{

        await mongoose.connect(process.env.DB_CONNECTION); 
        
        console.log('DB online')

    }catch(error){
        console.error(error)
        throw new Error("Error a la hora de inicializar BD")
    }

} 

export { dbConnection}