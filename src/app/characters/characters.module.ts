import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router'

import { CharactersRoutingModule } from './characters-routing.module';
import { AllCharactersComponent } from './all-characters/all-characters.component';
import { CharacterComponent } from './character/character.component';


@NgModule({
  declarations: [AllCharactersComponent, CharacterComponent,],
  imports: [
    CommonModule,
    CharactersRoutingModule,
    RouterModule
  ]
})
export class CharactersModule { }
