import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 
import { catchError, map, tap } from 'rxjs/operators';
import { Personnage } from '../models/personnage';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class PersonnagesService {
  api = 'https://swapi.dev/api/people';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getAll(): Observable<Personnage[]> {
    return this.http.get<any>(this.api)
    .pipe(
      tap(() => {
        this.messageService.createToast(`La liste a fini de charger`, 'success', 'top');
      }),
      map(data => data.results),
      catchError(err => {
        this.messageService.createToast(`Oups, quelque chose s'est mal passé`, 'danger', 'bottom');
        console.log(err);
        return of(undefined);
      })
    );
  }

}
