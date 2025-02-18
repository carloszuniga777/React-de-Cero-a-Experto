// Obtener variables de entorno
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET


/*
  Nomeclatura: [POST] https://api.cloudinary.com/v1_1/:cloud_name/:action
  
  [body]
  file: [imagen-subir]
  upload_preset: [name upload preset]

  Documentacion: https://cloudinary.com/documentation/image_upload_api_reference

  Uploading files with react.js:  https://www.pluralsight.com/resources/blog/guides/uploading-files-with-reactjs
*/


//Funcion para subir las imagenes al CLoudinary
export const fileUpload = async(file) =>{

    if(!file) throw new Error('No tenemos ningun archivo a subir')

    // URL base de la API de Cloudinary para subir archivos. 
    // cloud_name: dhfivi1ye (nombre de tu cuenta en Cloudinary)
    const cloudURL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`

    // Creamos un objeto FormData para enviar los parámetros requeridos por Cloudinary
    const formData = new FormData()
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)      //upload_preset: nombre del 'upload preset' de cloudinay | coincidir exactamente con el nombre de tu preset
    formData.append('file', file)        

    try {
        
        const resp = await fetch(cloudURL, {
            method: 'POST',
            body: formData 
        })
        

        if(!resp.ok) throw new Error('No se pudo subir imagen')

        const cloudResp = await resp.json()
        
        return cloudResp.secure_url

    } catch (error) {
        throw new Error('Ocurrio un erro al momento de subir el archivo a cloudynary', error.message)
    }                           
}



//Crear un archivo .env y buscar las configuraciones de cloudinary (https://console.cloudinary.com/): 
/**
 * Con las variables de entorno:
 * 
    VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
    VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

    -your_cloud_name: Es el Cloud Name obtenido en la seccion del Dashboard de Cloudinary
    -your_upload_preset: Es el Preset obtenido en la seccion configuraciones --> subir, 
                        es necesario crear un nuevo preset y configurarlo en modo: Unsigned 
                        y ponerle un nombre tanto para el preset como al Asset Folder, 
                        el nombre que se le de al preset es el que va a utilizar como variable de entorno
                        VITE_CLOUDINARY_UPLOAD_PRES
 * 
 */