import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, from } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  ready$ = new BehaviorSubject(false);
  theme$ = new BehaviorSubject('');

  constructor(
    private storage: Storage,
    private messageService : MessageService
  ) { }

  async init() {
    console.log('Initializing storage ...');
    await this.storage.create();
    console.log('Storage Created !');
    this.ready$.next(true);
  }

  /* Synthaxe pour attendre la fin de la creation du storage : à utiliser 
  si on doit utiliser le storage très rapidement. Au démarrage de l'appli,
   en ayant le risque que la promesse de create() ne soit pas terminée
  ==> Plutôt utile sur les ajouts */
  getChiant() {
    this.ready$
      .pipe(
        filter(isReady => isReady),
        switchMap(() => from(this.storage.get('ion_key')))
      );
  }

  async getTheme() {
    const t = await this.storage.get('theme');
    if(t) {
      this.theme$.next(t);
    }
  }

  async setTheme(theme: 'dark'|'light') {
    await this.storage.set('theme', theme);
    this.theme$.next(theme);
    this.messageService.createToast(`Theme défini : ${theme}`, 'success', 'bottom');
  }

  clear() {
    this.storage.clear();
    this.messageService.createToast(`Data supprimé`, 'success', 'bottom'); 
  }
  
  async delete(key) {
    const keys = await this.storage.keys();
    if(keys.includes(key)) {
      this.storage.remove(key);
    }
  }

}
