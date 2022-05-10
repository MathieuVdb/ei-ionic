import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Personnage } from 'src/app/utils/models/personnage';
import { PersonnagesService } from 'src/app/utils/services/personnages.service';

@Component({
  selector: 'app-personnages',
  templateUrl: './personnages.page.html',
  styleUrls: ['./personnages.page.scss'],
})
export class PersonnagesPage implements OnInit {

  personnages$: Observable<Personnage[]>;


  constructor(
    private personnageService: PersonnagesService
  ) { }

  ngOnInit() {
    /* Méthode 1
    this.personnageService.getAll().
      subscribe(perso => this.personnages = perso);*/

      /* Méthode 2 */
      this.personnages$ = this.personnageService.getAll();
  }

}
