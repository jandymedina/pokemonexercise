import {Component, OnInit, ViewChild} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {map, startWith, debounceTime} from "rxjs/operators";

//import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

import {Pokemon} from "../../models/pokemon.model";
import {PokemonService} from "../../services/pokemon.service";
import {PokemonsListActions, PokemonsSelectors} from '../../state';
import {environment} from "../../../environments/environment.prod";
import {ErrorStateMatcher} from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent implements OnInit {
  pokemons$: Observable<Pokemon[]> = this.store.select(PokemonsSelectors.getPokemons);
  pokemons: Pokemon[] = [];
  pokemonFavorite$: Observable<Pokemon> = this.store.select(PokemonsSelectors.getPokemonFavorite);
  /* FormGoup
  public formFilter!: FormGroup;
  */
  //FormControl
  filterFormControl = new FormControl;
  matcher = new MyErrorStateMatcher();
  filterPokemons!: Observable<string[]>;

  displayedColumns: string[] = ['name', 'favorite'];
  dataSource!: MatTableDataSource<Pokemon>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  lastPageLabel = "Ultima"

  constructor(
    private pokemonService: PokemonService,
    private store: Store
  ) {

  }

  ngOnInit(): void {
    this.getPokemonData(environment.urlPokemonsApi);
    this.listenPokemonsState();
    this.formControl();
    this.initFilter();
  }

  private getPokemonData(url: string) {
    this.pokemonService.getPokemons(url).subscribe((data) => {
      const pokemonsData = JSON.parse(JSON.stringify(data));
      this.store.dispatch(PokemonsListActions.setPokemonsData({pokemons: pokemonsData.results}));
      if (pokemonsData.next) {
        this.getPokemonData(pokemonsData.next);
      }
    });
  }

  private listenPokemonsState() {
    this.pokemons$.subscribe((pokemons) => {
      this.dataSource = new MatTableDataSource<Pokemon>(pokemons);
      this.dataSource.paginator = this.paginator;
      this.pokemons = pokemons;
    });

    this.pokemonFavorite$.subscribe((pokemon) => {
      this.pokemonService.selectPokemonFavoriteAdvice.next(pokemon);
      //this.pokemonService.selectPokemonDetailsAdvice.emit(pokemon);
    });
  }

  private formControl() {
    /*this.filterFormControl = new FormControl(
        '', [Validators.minLength(2)]
    );*/
  }

  private initFilter() {
    this.filterPokemons = this.filterFormControl.valueChanges.pipe(
      debounceTime(500),
      startWith(''),
      map(value => this._filter(value))
    );
  }

  getPokemonDetail(pokemon: Pokemon): void {
    if (!pokemon.id) {
      this.pokemonService.getPokemonDetailByName(pokemon.name).subscribe((poke) => {
        this.store.dispatch(PokemonsListActions.setPokemonDetails({pokemon: poke}));
        this.pokemonService.selectPokemonDetailsAdvice.emit(poke);
      });
    } else {
      this.pokemonService.selectPokemonDetailsAdvice.emit(pokemon);
    }
  }

  addFavorite(pokemon: Pokemon) {
    if (!pokemon.id) {
      this.pokemonService.getPokemonDetailByName(pokemon.name).subscribe((poke: Pokemon) => {
        this.store.dispatch(PokemonsListActions.setPokemonDetails({pokemon: poke}));
        this.store.dispatch(PokemonsListActions.setPokemonFavorite({pokemon: poke}));
      });
    } else {
      this.store.dispatch(PokemonsListActions.setPokemonFavorite({pokemon: pokemon}));
    }
  }

  imputFilterEventListen(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.applyFilter(filterValue);
  }

  applyFilter(value: string) {
    if (this.filterFormControl.valid)
      this.dataSource.filter = value.trim().toLowerCase();
  }

  private _filter(val: string): string[] {
    const formatVal = val.toLowerCase();
    return this.pokemons.map(pokemon => pokemon.name.toLowerCase())
      .filter(pokemon => pokemon.toLowerCase().indexOf(formatVal) === 0);
  }

  OnPageChange(event:PageEvent) {
    console.log(event)
  }
}
