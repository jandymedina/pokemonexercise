import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";
import {Pokemon} from "../models/pokemon.model";

import {environment} from "../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public selectPokemonFavoriteAdvice: BehaviorSubject<Pokemon> = new BehaviorSubject<Pokemon>(this.newPokemon());
  @Output() public selectPokemonDetailsAdvice: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

  constructor(private http: HttpClient) {
  }
  newPokemon(): Pokemon {
    return {
      id: 0,
      name: '-',
      height: 0.0,
      weight: 0.0,
      order: 0,
      base_experience: 0,
      abilities: [],
      url: '',
      image: '',
      sprites: {front_default: ''},
      types: [{type: {name: ''}}],
      favorite: false
    };
  }

  getPokemons(url: string) {
    return this.http.get(url);
  }

  getPokemonDetailByName(pokemonName: string) {
    return this.http.get<Pokemon>(`${environment.urlPokemonsApi}/${pokemonName}`);
  }

}
