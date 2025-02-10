import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getPokemons } from "./store/slices"
import { useSelector } from "react-redux"

export const PokemonApp = () => {

    //Dispara las acciones del reducer de redux
    const dispatch = useDispatch()


    // Acceder al estado del reducer 'pokemon' del store de Redux usando useSelector.
    // Extraemos las propiedades 'pokemons', 'page' e 'isLoading' para usarlas en el componente.
    const {pokemons = [], page, isLoading} = useSelector(state => state.pokemon)       
    

    useEffect(() => {
        dispatch(getPokemons())  //thunks: Se realiza la peticion de los pokemon desde la Api y luego configura el reducer de redux
    }, [dispatch])
    

  return (
    <>
        <h1>PokemonAPP</h1>
        <hr />
        <span>Loading: {isLoading ? 'True' : 'False'}</span>
        
        {
            isLoading 
                ? (<p>Cargando...</p>)
                : (
                    <ul>
                        {
                        pokemons.map(({name}) =>(
                            <li key={name}> {name}</li>
                        ))

                        }
                    </ul>  
                )
        }

          <button
            disabled={isLoading}
            onClick={()=> dispatch(getPokemons(page))}
          >
            Next
          </button>

    </>
  )
}
