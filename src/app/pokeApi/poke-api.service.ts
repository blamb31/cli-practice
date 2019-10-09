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

  private currentPokemonName: string = this.basePokemonUrl;
  private currentNameBs: BehaviorSubject<string> = new BehaviorSubject<string>(this.currentPokemonPage)
  public currentName$: Observable<string> = this.currentUrlBs.asObservable()
  
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


  constructor(private _http: HttpClient) { }
}
