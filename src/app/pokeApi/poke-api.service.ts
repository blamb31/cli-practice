import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map, tap} from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private basePokemonUrl: string = 'https://pokeapi.co/api/v2/pokemon'
  
  private nextPokemonPage: string;
  private nextUrlBs: BehaviorSubject<string> = new BehaviorSubject<string>(this.nextPokemonPage)
  public nextUrl$: Observable<string> = this.nextUrlBs.asObservable()

  private prevPokemonPage: string;
  private prevUrlBs: BehaviorSubject<string> = new BehaviorSubject<string>(this.prevPokemonPage)
  public prevUrl$: Observable<string> = this.prevUrlBs.asObservable()
  
  private currentPokemonPage: string = this.basePokemonUrl;
  private currentUrlBs: BehaviorSubject<string> = new BehaviorSubject<string>(this.currentPokemonPage)
  public currentUrl$: Observable<string> = this.currentUrlBs.asObservable()
  
  // getAllPokemon(url:string =this.baseUrl) {
  //   return this._http.get(url).pipe(
  //     map( (data:any) => data.results)
  //   )
  // }

  getPokemonPage(url:string =this.basePokemonUrl) {
    this.currentPokemonPage = url
    this.currentUrlBs.next(this.currentPokemonPage)

    return this._http.get(url).pipe(
      tap((data:any) => {
        this.prevPokemonPage = data.previous
        this.nextPokemonPage = data.next
        this.nextUrlBs.next(this.nextPokemonPage)
        this.prevUrlBs.next(this.prevPokemonPage)

        return data

      }),
      map( (data:any) => data.results)
    )
  }


  getPokemonByName(name:string) {
    return this._http.get(`${this.basePokemonUrl}/${name}`)
  }

  getNextPokemonById(id:string) {
    return this._http.get(`${this.basePokemonUrl}/${+id + 1}`)
  }

  getPrevPokemonById(id:string) {
    return this._http.get(`${this.basePokemonUrl}/${+id - 1}`)
  }

  getPokemonById(id:number) {
    return this._http.get(`${this.basePokemonUrl}/${+id - 1}`)
  }

  constructor(private _http: HttpClient) { }
}
