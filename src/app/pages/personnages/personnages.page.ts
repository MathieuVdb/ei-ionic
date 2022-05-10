import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Personnage } from 'src/app/utils/models/personnage';
import { PersonnagesService } from 'src/app/utils/services/personnages.service';

@Component({
  selector: 'app-personnages',
  templateUrl: './personnages.page.html',
  styleUrls: ['./personnages.page.scss'],
})
export class PersonnagesPage implements OnInit {

  //personnages$: Observable<Personnage[]>;
  personnages: Personnage[];
  displayed: Personnage[];
  search= '';

  constructor(
    private personnageService: PersonnagesService
  ) { }

  ngOnInit() {
    /* Méthode 1*/
    this.personnageService.getAll().
      subscribe(perso => {
        this.personnages = perso;
        this.displayed = perso;
      });

      /* Méthode 2
      this.personnages$ = this.personnageService.getAll(); */
  }

  filterArray() {
    this.displayed = (!this.search) ? 
        this.personnages : this.personnages.filter(p => p.name.toLowerCase().includes(this.search.toLowerCase().trim()))
  }

}
