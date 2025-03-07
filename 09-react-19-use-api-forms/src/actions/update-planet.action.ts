import { planetsApi } from "../api/planetsApi"
import { Planet } from "../interfaces/planet.interface"

const sleep = async()=>{
  return new Promise((r)=> setTimeout(r, 2000))
}



export const updatePlanetAction = async(planet: Planet) => {
 try {
   
    await sleep() //relatnizar esto por 2 segundos para efecto de pruebas

    throw new Error('Error de prueba')

    //------------------------------------
    
    const response = await planetsApi.patch<Planet>(`${planet.id}`, planet)

    console.log('planeta actualizado')

    return response.data

 } catch (error) {
    console.log("Error actualizando", error)
    throw new Error('Error actualizando el planeta')
 }
}
