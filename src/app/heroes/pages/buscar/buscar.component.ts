import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { RESTHeroeResponse } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: RESTHeroeResponse[] = [];
  heroeSeleccionado!: RESTHeroeResponse | undefined;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {}

  buscando() {
    this.heroesService.obtenerSugerencias(this.termino).subscribe((resp) => {
      this.heroes = resp;
    });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }
    const heroe: RESTHeroeResponse = event.option.value;
    this.heroesService.obtenerHeroePorID(heroe.id!).subscribe((resp) => {
      this.heroeSeleccionado = resp;
    });
  }
}
