import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RESTHeroeResponse } from '../../interfaces/heroes.interface';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: RESTHeroeResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroeService: HeroesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.obtenerHeroePorID(id)))
      .subscribe((response) => {
        this.heroe = response;
      });
  }

  regresar() {
    this.router.navigate(['/heroes/listado/']);
  }
}
