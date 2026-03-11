import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Character } from './models/character';
import { CharacterService } from './services/character';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  characters: Character[] = [];
  loading: boolean = true;
  searchText: string = '';
  errorMessage: string = '';

  private characterService = inject(CharacterService);

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading = true;
    this.errorMessage = '';

    this.characterService.getCharacters().subscribe({
      next: (data) => {
        this.characters = data.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al consumir la API:', error);
        this.loading = false;
        this.errorMessage = 'No se pudieron cargar los personajes.';
      }
    });
  }

  searchCharacter(): void {
    if (!this.searchText.trim()) {
      this.loadCharacters();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.characterService.searchCharacters(this.searchText).subscribe({
      next: (data) => {
        this.characters = data.results;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error en la búsqueda:', error);
        this.characters = [];
        this.loading = false;
        this.errorMessage = 'No se encontraron personajes con ese nombre.';
      }
    });
  }
}