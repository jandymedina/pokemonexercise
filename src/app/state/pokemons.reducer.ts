import {Pokemon} from "../models/pokemon.model";
import {createReducer, on} from "@ngrx/store";
import {PokemonsListActions} from '.';

export const pokemonsStateFeatureKey = "pokemonsState";

export interface PokemonsState {
  pokemons: Pokemon[];
}

const initialState: PokemonsState = {
  pokemons: []
};

export const pokemonsReducer = createReducer(
  initialState,
  on(PokemonsListActions.setPokemonsData, (currentState, action) => ({
    ...currentState,
    pokemons: currentState.pokemons.concat(action.pokemons)
  })),
  on(PokemonsListActions.setPokemonDetails, (currentState, action) => ({
    ...currentState,
    pokemons: currentState.pokemons.map((pokemon: Pokemon) =>
      (action.pokemon.id && pokemon.name === action.pokemon.name) ?
        {
          ...pokemon,
          id: action.pokemon.id, base_experience: action.pokemon.base_experience, height: action.pokemon.height,
          weight: action.pokemon.weight, abilities: action.pokemon.abilities, order: action.pokemon.order,
          sprites: action.pokemon.sprites, types: action.pokemon.types
        } : pokemon
    )
  })),
  on(PokemonsListActions.setPokemonFavorite, (currentState, action) => ({
    ...currentState,
    pokemons: currentState.pokemons.map((pokemon: Pokemon) =>
      (action.pokemon.id && pokemon.name === action.pokemon.name) ?
        {
          ...pokemon, favorite: true
        } : {
          ...pokemon, favorite: false
        }
    )
  }))
)
