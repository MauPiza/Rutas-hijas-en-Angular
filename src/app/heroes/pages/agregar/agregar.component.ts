import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import {
  RESTHeroeResponse,
  Publisher,
} from '../../interfaces/heroes.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './delete-dialog.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 10px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: RESTHeroeResponse = {
    superhero: '',
    alter_ego: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    characters: '',
  };
  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.obtenerHeroePorID(id)))
      .subscribe((resp) => {
        this.heroe = resp;
        console.log(this.heroe.id);
      });
  }

  agregar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }
    if (this.heroe.id) {
      this.heroesService.editarHeroe(this.heroe).subscribe((resp) => {
        this.heroe = resp;
        this.mostrarSnackbar('Registro actualizado');
      });
      this.router.navigate(['/heroes/editar', this.heroe.id]);
    } else {
      this.heroesService.agregarHeroe(this.heroe).subscribe((resp) => {
        this.heroe = resp;
        this.mostrarSnackbar('Se ha agregado correctamente');
      });
    }
  }
  borrarHeroe() {
    const dialog = this.dialog.open(DeleteDialogComponent);
    dialog.afterClosed().subscribe((result) => {
      if (result) {
        this.heroesService.eliminarHeroe(this.heroe.id!).subscribe((resp) => {
          this.mostrarSnackbar('Registro borrado');
          this.router.navigate(['heroes/']);
        });
      }
    });
  }

  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'Listo!', {
      duration: 2500,
    });
  }
}
