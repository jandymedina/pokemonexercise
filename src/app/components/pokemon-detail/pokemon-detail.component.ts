import {Component, OnInit} from '@angular/core';
import {PokemonService} from "../../services/pokemon.service";
import {Observable} from "rxjs";
import {Pokemon} from "../../models/pokemon.model";
import {Store} from "@ngrx/store";
import {PokemonsSelectors} from '../../state';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css']
})
export class PokemonDetailComponent implements OnInit {
  pokemon: Pokemon;
  constructor(private pokemonService: PokemonService) {
    this.pokemon = this.pokemonService.newPokemon({});
  }
  ngOnInit(): void {
    this.pokemonService.selectPokemonDetailsAdvice.subscribe(pokemon=>{
      this.pokemon = pokemon;
    })
  }
}
