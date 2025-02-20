import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from "../../src/helpers"

/** Para poder borrar la imagen que se carga en cada test 
 *  directamente de Cloudinary, se necesita instalar la dependencia
 *  en ambiente de desarrollo
 * 
 * 1. Se instalo Cloudinary como una dependencia en desarrollo:
 *  pnpm add -D cloudinary
 * 
 * 2. Luego se importo: import { v2 as cloudinary } from 'cloudinary'
 * 
 * 3. Se realiza la configuracion cloudinary.config({})
 * 
 * Documentacion: https://cloudinary.com/documentation/node_integration
 * 
 * Eliminacion metodo 1: https://cloudinary.com/documentation/admin_api#delete_resources
 * Eliminacion metodo 2: https://cloudinary.com/documentation/deleting_assets_tutorial  
*/


// Configuracion de cloudinary
cloudinary.config({
    cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
     api_key: import.meta.env.VITE_CLOUDINARY_API_KEY,
     api_secret: import.meta.env.VITE_CLOUDINARY_API_SECRET,
     secure: true
})


describe('Pruebas en FileUpload', ()=>{
    
    test('debe de subir el archivo correctamente a cloudinary', async()=>{

        const imageUrl = 'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature-825x465.jpg'
        const resp = await fetch(imageUrl)
        const blob = await resp.blob()
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload(file)    
        
        //console.log(url)
        
        expect( typeof url).toBe('string')
        expect(url).toMatch(/cloudinary\.com/);   // Verifica que la URL sea de Cloudinary
        
        //---------------------------------------------

        //Eliminar imagen de directamente de cloudinary

        const segments = url.split('/')
        const imageId = segments[segments.length - 1].replace('.jpg', '')
        
       //metodo 1: Eliminacion de la imagen en cloudinary 
       await cloudinary.api.delete_resources([imageId], { resource_type: 'image' })
    
      //metodo 2: Eliminacion de la imagen en cloudinary
      //await cloudinary.uploader.destroy(imageId);

    })
        


    test('debe de retornar null', async()=>{
        const file = new File([], 'foto.jpg')

        const url = await fileUpload(file)        

        expect(url).toBe(null)

    })
})


