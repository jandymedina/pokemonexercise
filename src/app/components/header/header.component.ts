import {Component, Inject, OnInit} from '@angular/core';
import {Pokemon} from "../../models/pokemon.model";
import {BehaviorSubject} from "rxjs";
import {PokemonService} from "../../services/pokemon.service";
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    pokemon$: BehaviorSubject<Pokemon>;
    pokemon?: Pokemon;

    constructor(
        private pokemonService: PokemonService,
        private dialog: MatDialog
    ) {
        this.pokemon$ = this.pokemonService.selectPokemonFavoriteAdvice;
    }

    ngOnInit(): void {
        this.pokemon$.subscribe(pokemon => {
            this.pokemon = pokemon;
        })
    }

    openDialog() {
        this.dialog.open(PokemonDialogComponent, {
            width: '450px',
            data: this.pokemon
        });
    }

}

@Component({
    selector: 'app-pokemon-dialog',
    templateUrl: './pokemon.dialog.html',
})
export class PokemonDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<PokemonDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Pokemon
    ) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
