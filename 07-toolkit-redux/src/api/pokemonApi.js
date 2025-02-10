import axios from 'axios'

//Configuracion de Axios
export const pokemonApi = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'    //Parte de la url de la API que es constante, es decir, nunca cambia
})