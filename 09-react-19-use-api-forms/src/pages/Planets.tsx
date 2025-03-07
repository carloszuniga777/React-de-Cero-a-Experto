import { FC, use, useEffect, useState } from 'react';
import { Planet } from '../interfaces/planet.interface';
import { EditPlanetForm } from './ui/EditPlanetForm';
import { PlanetList } from './ui/PlanetList';
//import { createPlanetAction } from '../actions/create-planet.action';
//import { getPlanets as getPlanets2 } from '../actions/get-planets.action';

interface Props{
  getPlanets: Promise<Planet[]>
}


//1. Usando el hook Use
//Permite realizar peticiones sin hacer uso del useefect y estados (carga, loading, error)
//Para hacer uso del use es necesario envolver el componente en un Suspense 
// y el ErrorBoundary se encarga de manejar cualquier excepcion no controlada en sus componentes hijos
const Planets: FC<Props> = ({getPlanets}) => {
 
  //Obtiene los planetas por medio de una peticion
  const originalPlanets = use(getPlanets)

  const [planets, setPlanets] = useState<Planet[]>(originalPlanets)



  //Sin hacer uso del hook useActionState en --> EditPlanetForm
   /*
  const handleAddPlanet = async(planetData: Partial<Planet>) => {
    try {
      const newPlanet = await createPlanetAction(planetData);
      
      setPlanets(prev => [...prev, newPlanet]);
  
    } catch (error) {
      console.error("Error creating planet:", error);
    }
  };
  */

  
  //Haciendo uso del nuevo hook useActionState en --> EditPlanetForm
  const handleAddPlanet = async(planet: Planet) => {
    setPlanets([...planets, planet])
  };



  return (
    <>
      <h4 className="text-2xl font-thin mb-4">Agregar y mantener planetas</h4>
      <hr className="border-gray-300 mb-4" />
      {/* Formulario para agregar un planeta */}
      <EditPlanetForm onAddPlanet={handleAddPlanet} />

        
      <PlanetList planets={planets}/> 
    </>
  );
};

export default Planets;



/**2. Sin usar el hook Use */
//Para hacer una peticion se tiene que hacer uso del usefect y los estados 
/*
const Planets: FC<Props> = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    getPlanets2()
      .then((res) => {
        setPlanets(res);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);
 

  const handleAddPlanet = (planet: Partial<Planet>) => {
    console.log(planet);
  };

  return (
    <>
      <h4 className="text-2xl font-thin mb-4">Agregar y mantener planetas</h4>
      <hr className="border-gray-300 mb-4" />
      {
        //Formulario para agregar un planeta 
      }
      <EditPlanetForm onAddPlanet={handleAddPlanet} />

      {
      error && (
        <p>
          Error al cargar los planetas -{' '}
          <small className="text-red-500">{error}</small>
        </p>
      )
      }

      {
        // Lista de planetas Grid
       }
      {
       isLoading ? <p>Cargando...</p> : <PlanetList planets={planets} />
      }
    
    </>
  );
};

export default Planets;
*/