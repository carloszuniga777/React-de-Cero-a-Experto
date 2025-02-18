
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
    const cloudURL = 'https://api.cloudinary.com/v1_1/dhfivi1ye/upload'

    // Creamos un objeto FormData para enviar los parámetros requeridos por Cloudinary
    const formData = new FormData()
    formData.append('upload_preset', 'JournalApp-Curso-React')      //upload_preset: nombre del 'upload preset' de cloudinay | 'JournalApp-Curso-React' debe coincidir exactamente con el nombre de tu preset
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