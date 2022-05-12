import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { AuthenticationService } from 'src/app/utils/services/authentication.service';
import { MessageService } from 'src/app/utils/services/message.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.page.html',
  styleUrls: ['./tracker.page.scss'],
})
export class TrackerPage implements OnInit {

  state = 'Pas commencé';
  countdown?: number = null;

  constructor(
    private idle: Idle,
    private changeDetector: ChangeDetectorRef,
    private messageService: MessageService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.initTracker();
    this.detectIdleStart();
    this.detectIdleEnd();
    this.handleTimeout();
    this.warnTimeout();
  }

  initTracker() {
    // Combien de temps avant d'être inactif (en seconde)
    this.idle.setIdle(5);
    // Temps d'inactivité "autorisée" avant d'agir
    this.idle.setTimeout(5);
    // Qu'est-ce qui permettra de désactiver l'inactivité
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    // Watcher
    this.idle.watch(); 
  }

  detectIdleStart() {
    this.idle.onIdleStart.subscribe(() => {
      console.warn('Idle !');
      this.state = 'Inactif'; 
      this.messageService.createToast(`Vous allez être déconnecté`, 'danger', 'bottom');
    });
  }

  detectIdleEnd() {
    this.idle.onIdleEnd.subscribe(() => {
      console.info('Activité détectée');
      this.state = 'Actif';
      this.countdown = null;
      this.changeDetector.detectChanges();
    });
  }

  handleTimeout() {
    this.idle.onTimeout.subscribe(() => {
      this.state = 'TIME OUT !!!'
      this.authenticationService.logout();
    });
  }

  warnTimeout() {
    this.idle.onTimeoutWarning.subscribe(secondes => {
      this.countdown = secondes
    });
  }

  reset() {
    this.state = 'Tout va bien';
    this.countdown = null;
    this.idle.watch();
  }

}
