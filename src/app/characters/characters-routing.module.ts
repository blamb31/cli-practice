import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllCharactersComponent } from './all-characters/all-characters.component';
import { CharacterComponent } from './character/character.component';


const routes: Routes = [
  {path: '', component: AllCharactersComponent}, 
  {path: ':name',component: CharacterComponent},
  {path: ':id',component: CharacterComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersRoutingModule { }
