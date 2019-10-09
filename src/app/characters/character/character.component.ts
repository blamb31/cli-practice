import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, map, switchMap} from 'rxjs/operators'
import {ActivatedRoute, Params } from '@angular/router'
import { PokeApiService } from 'src/app/pokeApi/poke-api.service';
import {Location} from '@angular/common'

@Component({
  selector: 'cp-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _pokeService: PokeApiService, 
    private _location: Location
    ) { }

  private pokemon$: Observable<any>
  private currentUrl$: Observable<string>
  
  ngOnInit() {
    this.currentUrl$ = this._pokeService.currentUrl$
    
    this.pokemon$ = this._activatedRoute.params.pipe(
      tap((params: Params) => console.log(params, "before 1st tap")),
      switchMap((params: Params) => {
        console.log('in switchmap', params)
          return this._pokeService.getPokemonByName(params.name)
      })
    )
  }



}
