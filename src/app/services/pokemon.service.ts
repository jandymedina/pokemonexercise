import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";
import {Pokemon, PokemonAbilities, PokemonSprites, PokemonTypes} from "../models/pokemon.model";

import {environment} from "../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    public selectPokemonFavoriteAdvice: BehaviorSubject<Pokemon> = new BehaviorSubject<Pokemon>(this.newPokemon({}));
    @Output() public selectPokemonDetailsAdvice: EventEmitter<Pokemon> = new EventEmitter<Pokemon>();

    constructor(private http: HttpClient) {
    }

    newPokemon(data: any): Pokemon {
        const newPokemon: Pokemon = {
            id: 0,
            name: '-',
            types: [],
            base_experience:0.0,
            height: 0.0,
            weight: 0.0,
            abilities: [],
            url: '',
            sprites: {
                back_default: '',
                back_shiny: '',
                front_default: '',
                front_shiny: ''
            },
            favorite: false
        };
        if (data.id) {
            newPokemon.id = data.id;
            newPokemon.name = data.name;
            newPokemon.types = data.types;
            newPokemon.base_experience = data.base_experience;
            newPokemon.height = data.height;
            newPokemon.weight = data.weight;
            newPokemon.sprites = data.sprites;
            newPokemon.abilities = data.abilities;
            newPokemon.favorite = data.favorite
            newPokemon.url = data.url
        }
        return newPokemon;
    }

    getPokemons(url: string) {
        return this.http.get(url);
    }

    getPokemonDetailByName(pokemonName: string) {
        return this.http.get<Pokemon>(`${environment.urlPokemonsApi}/${pokemonName}`);
    }

}
