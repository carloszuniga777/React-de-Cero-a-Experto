import { pokemonApi } from "../../../api"
import { setPokemons, startLoadingPokemons } from "./pokemonSlice"

//Los thunks son acciones asincronas que disparan otra accion, 
// cuando se resuelve la petición asincrona
// https://redux.js.org/usage/writing-logic-thunks

export const getPokemons = (page = 0)=>{
    return async(dispatch, /*getState*/) => {
          
          //Cuando se llame getPokemon se pone el Store del redux en un estado de carga
          dispatch( startLoadingPokemons() )
          
          
          try {
            
          //Realizar peticion http con fetchApi
          //const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`)
          //const data = await resp.json() 

          //Realizar peticion con Axios
          const { data } = await pokemonApi.get(`pokemon?limit=10&offset=${page * 10}`) 

          //console.log(data) 
          
          dispatch( setPokemons({
                                  pokemons: data.results, 
                                  page: page + 1
                                }) 
                  )

        }catch (error) {
          console.error("Error al cargar los Pokémon:", error);          
        }  

                 
    }
} 