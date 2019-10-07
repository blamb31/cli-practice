import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'characters', loadChildren: () => import('./characters/characters.module').then( m => m.CharactersModule)},
  {pathMatch: "full", redirectTo: "characters", path: '**'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
