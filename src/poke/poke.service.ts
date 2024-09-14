import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Poke } from './poke';

interface PokeApiResponse {
  results: Poke[];
}

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  constructor(private http: HttpClient) {}

  getCards(limit: number): Observable<Poke[]> {
    const randomi = Math.floor(Math.random() * 752) + 1;
    return this.http
      .get<PokeApiResponse>(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${randomi}`
      )
      .pipe(map((response) => response.results));
  }
}
