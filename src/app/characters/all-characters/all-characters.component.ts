import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/pokeApi/poke-api.service';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'cp-all-characters',
  templateUrl: './all-characters.component.html',
  styleUrls: ['./all-characters.component.scss']
})
export class AllCharactersComponent implements OnInit {

  public nextUrl$:Observable<string>
  public prevUrl$:Observable<string>

  constructor(
    private _pokeApi: PokeApiService,

    ) { }

  ngOnInit() {
    this.nextUrl$ = this._pokeApi.nextUrl$
  
    this.prevUrl$ = this._pokeApi.prevUrl$

    this._pokeApi.currentUrl$.pipe(
      distinctUntilChanged()
    ).subscribe((url: string) => {
      console.log("hello")
      this.updatePokemon(url);
    })
  }
  pokemon$:Observable<any>;

  updatePokemon(url:string){
    this.pokemon$ = this._pokeApi.getPokemonPage(url)
  }



  
}
