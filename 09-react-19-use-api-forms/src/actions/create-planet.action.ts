import { planetsApi } from "../api/planetsApi";
import { Planet } from "../interfaces/planet.interface";

export const createPlanetAction = async(planet: Partial<Planet>)=>{
    try {
        const response = await planetsApi.post<Planet>('/', planet)

        return response.data

    } catch (error) {
        console.error(error)
        throw new Error("Failed to create planet");
    }
}

export const createPlanetActionForm = async(prevState: unknown, queryData: FormData)=>{
    
    //Obtiene todos los campos del formulario
    const formData = Object.fromEntries(queryData.entries())
    
    try {
        const response = await planetsApi.post<Planet>('/', formData)

        return response.data

    } catch (error) {
        console.error(error)
        throw new Error('No se pudo agregar o agregar plenta')
    }
}