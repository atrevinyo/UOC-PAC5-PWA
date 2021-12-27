import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroe } from '../models/heroe.interface';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }

  getAllHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>('https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json');
  }

  getHeroeById(id: string): Observable<Heroe> {
    console.log(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`);
    return this.http.get<Heroe>(`https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/id/${id}.json`);
  }
}
