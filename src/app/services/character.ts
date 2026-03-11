import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CharacterResponse } from '../models/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private http = inject(HttpClient);

  getCharacters(): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(this.apiUrl);
  }

  searchCharacters(name: string): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.apiUrl}/?name=${name}`);
  }
}