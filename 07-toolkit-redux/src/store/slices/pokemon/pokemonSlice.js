import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    page: 0,
    pokemons: [],
    isLoading: false
}

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    
    startLoadingPokemons:(state)=>{
      state.isLoading = true
    },

    setPokemons: (state, action)=>{
      //console.log('Payload recibido:', action.payload);

      state.isLoading = false
      state.page = action.payload.page                //page: 1
      state.pokemons = action.payload.pokemons        //pokemons: []

    } 
  }
});

export const {startLoadingPokemons, setPokemons} = pokemonSlice.actions
