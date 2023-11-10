import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "./modules/material/material.module";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent, PokemonDialogComponent } from './components/header/header.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { PokemonsComponent } from './components/pokemons/pokemons.component';
import { MainComponent } from './pages/main/main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import {pokemonsReducer, pokemonsStateFeatureKey} from './state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StartCharCounterPipe } from './pipes/start-char-counter.pipe';
import { ResumeComponent } from './components/resume/resume.component';
import { CapitalLetterPipe } from './pipes/capital-letter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PokemonDialogComponent,
    PokemonComponent,
    PokemonDetailComponent,
    PokemonsComponent,
    MainComponent,
    StartCharCounterPipe,
    CapitalLetterPipe,
    ResumeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({},{}),
    StoreModule.forFeature(pokemonsStateFeatureKey, pokemonsReducer),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
