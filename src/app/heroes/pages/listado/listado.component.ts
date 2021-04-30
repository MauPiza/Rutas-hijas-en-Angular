import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { RESTHeroeResponse } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {
  heroes: RESTHeroeResponse[] = [];
  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.heroesService
      .obtenerHeroes()
      .subscribe((resp) => (this.heroes = resp));
  }
}
