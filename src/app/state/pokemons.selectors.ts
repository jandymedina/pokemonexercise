import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PokemonsState, pokemonsStateFeatureKey} from "./pokemons.reducer";
import {Pokemon} from "../models/pokemon.model";

const pokemonsState = createFeatureSelector<PokemonsState>(pokemonsStateFeatureKey)

export const getPokemons = createSelector(
  pokemonsState,
  (pokemons) => pokemons.pokemons
);

export const getPokemonFavorite = createSelector(
  getPokemons,
  (pokemons):Pokemon => {
    return pokemons.filter((pokemon: Pokemon) => pokemon.favorite)[0];
  }
);
