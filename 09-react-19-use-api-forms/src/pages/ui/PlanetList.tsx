import { useState, useOptimistic, useTransition } from 'react';
import { updatePlanetAction } from '../../actions/update-planet.action';
import { Planet } from '../../interfaces/planet.interface';

interface Props {
  planets: Planet[];
}

// Con useOptimistic

/**
 * El hook useOptimistic() en React sirve para implementar actualizaciones 
 * optimistas de manera sencilla. Estas actualizaciones permiten reflejar cambios 
 * en la interfaz de usuario (UI) inmediatamente , antes de confirmar 
 * si una operación asíncrona (como una llamada a una API) fue exitosa. 
 * Esto mejora la experiencia del usuario al evitar esperas innecesarias.
 */

export const PlanetList = ({ planets }: Props) => {

   // useTransition: Gestiona estados de transición para evitar bloqueos en la UI
  const [isPending, startTransition] = useTransition()

    // useOptimistic: Crea un estado optimista basado en el estado real (planets)
   const [optimisticPlanets, setOptimisticPlanets] = useOptimistic(
    planets,           // Estado real inicial
    (current, newPlanet: Planet) => {

      // Lógica de actualización optimista:
      // Mapea los planetas actuales y reemplaza el planeta con el mismo ID
      return current.map((planet) => 
        planet.id === newPlanet.id ? newPlanet : planet
      );
    }
  );




  // Función para manejar la actualización de un planeta
  const handleUpdatePlanet = async(planet: Planet)=>{
    
    // Inicia una transición para evitar bloquear la UI
    startTransition( async()=>{
        
        //Convierte a mayuscula el name del planeta 
        const data = {
          ...planet,
          name: planet.name.toUpperCase() 
        }


      try {      
            // Actualiza el estado optimista inmediatamente, 
            // el usuario podra ver los cambios en pantalla antes que se actualice en la base de datos 
            setOptimisticPlanets(data)
          
            // Ejecuta la llamada a la API para actualizar en el servidor
            const updatePlanet = await updatePlanetAction(data)
        
            //Si el planeta viene con id en la base de datos, actualice el planeta optimisticPlanets
            setOptimisticPlanets(data) 
      
      } catch (error) {
        console.log(error)

        //Si desde la base lanza error, se revierte los cambios 
        setOptimisticPlanets(planet)
      }  
    })

  }



  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {optimisticPlanets.map((planet) => (
        <div key={planet.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{planet.name}</h2>
          <p className="text-gray-700">{planet.type}</p>
          <p className="text-gray-700">{planet.distanceFromSun}</p>
          <br/>
          <button className='bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded w-full'
                  onClick={()=>handleUpdatePlanet(planet)}
                  disabled={isPending}
            >
            Actualizar
          </button>

        </div>
      ))}
    </div>
  );
};



//Sin Use Optimistic
/*

export const PlanetList = ({ planets }: Props) => {

  const [newPlanets, setnewPlanets] = useState(planets)
  




  const handleUpdatePlanet = async(planet: Planet)=>{

    planet.name = planet.name.toUpperCase()

    const updatePlanet = await updatePlanetAction(planet)

   
    setnewPlanets(planets => {

        return planets.map( p =>{
            if(p.id === updatePlanet.id){ return updatePlanet }

            return p
        })
    })


  }



  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 animate-fadeIn">
      {newPlanets.map((planet) => (
        <div key={planet.id} className="p-4 bg-gray-100 rounded shadow">
          <h2 className="text-xl font-semibold">{planet.name}</h2>
          <p className="text-gray-700">{planet.type}</p>
          <p className="text-gray-700">{planet.distanceFromSun}</p>
          <br/>
          <button className='bg-blue-500 text-white p-2 rounded w-full'
                  onClick={()=>handleUpdatePlanet(planet)}
            >
            Actualizar
          </button>

        </div>
      ))}
    </div>
  );
};
*/