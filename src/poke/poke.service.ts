import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { Poke, PokeCard } from './poke';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  constructor(private http: HttpClient) {}

  getCards(limit: number): Observable<PokeCard[]> {
    const requests: Observable<Poke>[] = [];
    const randomi = Math.floor(Math.random() * 752) + 1;

    for (let i = randomi; i < randomi + limit; i++) {
      const request = this.http.get<Poke>(
        `https://pokeapi.co/api/v2/pokemon/${i}`,
      );

      requests.push(request);
    }

    return forkJoin(requests).pipe(
      map((pokemonDetails: Poke[]) => {
        return pokemonDetails.map((pokemon) => {
          return {
            name: pokemon.species.name,
            cardImage:
              pokemon.sprites.other['official-artwork'].front_default ||
              pokemon.sprites.front_default,
            clicked: false,
          };
        });
      }),
    );
  }
}
