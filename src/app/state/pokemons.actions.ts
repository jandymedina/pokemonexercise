import {createAction, props} from "@ngrx/store";
import {Pokemon} from "../models/pokemon.model";

export const setPokemonsData = createAction(
  '[Pokemons List] Get all Pokemons',
  props<{pokemons: Pokemon[]}>()
);

export const setPokemonDetails = createAction(
  '[Pokemons List] Add pokemons detail',
  props<{pokemon: Pokemon}>()
);

export const setPokemonFavorite = createAction(
  '[Pokemons List] Set favorite pokemon',
  props<{pokemon: Pokemon}>()
);


