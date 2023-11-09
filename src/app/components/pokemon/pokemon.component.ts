import {Component, Input, OnInit} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {PokemonsSelectors} from '../../state';


@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {
  @Input() pokemon?: Pokemon

  constructor() {
  }

  ngOnInit(): void {
  }

}
