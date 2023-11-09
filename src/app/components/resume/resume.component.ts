import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Pokemon} from "../../models/pokemon.model";
import { PokemonsSelectors} from '../../state';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  pokemons$: Observable<Pokemon[]> = this.store.select(PokemonsSelectors.getPokemons);

  displayedColumns: string[] = ['name', 'cantidad'];
  //dataSource!: MatTableDataSource<Pokemon>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {

  }

  listenPokemonsState() {
    this.pokemons$.subscribe((pokemons) => {
      //this.dataSource = new MatTableDataSource<Pokemon>(pokemons);
    });
  }

}
