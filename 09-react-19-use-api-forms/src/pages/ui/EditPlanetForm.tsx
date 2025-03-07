import { useActionState, /*useState*/ } from 'react';
import { Planet } from '../../interfaces/planet.interface';
import { createPlanetActionForm } from '../../actions/create-planet.action';
import { SubmitButton } from './SubmitButton';

interface Props {
  onAddPlanet: (planet: Planet) => void;
}


//1. Nuevo Hook: useActionState permite controlar el formulario
//Simplifica la gestión de estados para acciones asíncronas 
// (como envío de formularios, llamadas a APIs, etc.)
export const EditPlanetForm = ({ onAddPlanet }: Props) => { 
 

  //Nuevo hook para controlar el formulario
  const [/*state*/, formAction, isPending] = useActionState(
    async(prevState: unknown, queryData: FormData) => {
        const planet = await createPlanetActionForm(prevState, queryData)   //Guarda la info del formulario
        onAddPlanet(planet)                                                 //Actualiza el state del padre para que se vea actualizado en pantalla en tipo real
    },
    null
 ) 



  return (
    <form className="mb-4 flex flex-col md:flex-row" action={formAction}>

      <h1>{isPending ? 'Pending' : 'No pending'}</h1>

      <input
        type="text"
        placeholder="Nombre del planeta"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="name"
        required
      />
      <input
        type="text"
        placeholder="Tipo de astro"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="type"
        required
      />
      <input
        type="text"
        placeholder="Distancia del sol"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        name="distanceFromSun"
        required
      />
      
      {/**Hook: useFormStatus para obtener el estado del formulario */}
      <SubmitButton/>

      {
      
      //En este caso se usa directamete el estado isPending del hook useActionState
      /* <button
        type="submit"
        className="bg-blue-500 disabled:bg-gray-500 text-white p-2 rounded flex-1 sm:flex-none"
        disabled={isPending}
      >
        Agregar planeta
      </button> 
      
      */}
    </form>
  );
};


//2. Sin useActionState 
/*
interface Props2 {
  onAddPlanet: (planet: Partial<Planet>) => void;
}


export const EditPlanetForm = ({ onAddPlanet }: Props2) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [distanceFromSun, setDistanceFromSun] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddPlanet({ name, type, distanceFromSun });
  };

  return (
    <form className="mb-4 flex flex-col md:flex-row" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del planeta"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tipo de astro"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <input
        type="text"
        placeholder="Distancia del sol"
        className="mb-2 md:mb-0 md:mr-2 p-2 border border-gray-300 rounded flex-1"
        value={distanceFromSun}
        onChange={(e) => setDistanceFromSun(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded flex-1 sm:flex-none"
      >
        Agregar planeta
      </button>
    </form>
  );
};
*/