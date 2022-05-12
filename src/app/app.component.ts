import { Component, OnInit, Renderer2 } from '@angular/core';
import { AuthenticationService } from './utils/services/authentication.service';
import { FileService } from './utils/services/file.service';
import { MessageService } from './utils/services/message.service';
import { StorageService } from './utils/services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  isLogged = false;

  constructor(
    private fileService: FileService,
    private storageService: StorageService,
    private renderer: Renderer2,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.fileService.requestPermission();
    this.setTheme();
    this.authenticationService.checkToken();
    this.authenticationService.isLogged$.subscribe(res => this.isLogged = res);
  }

  async setTheme() {
    await this.storageService.init();
    await this.storageService.getTheme();
    this.storageService.theme$.subscribe(theme => {
      this.renderer.setAttribute(document.body,'color-theme', theme);
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
