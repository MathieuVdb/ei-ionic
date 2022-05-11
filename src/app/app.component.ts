import { Component, OnInit, Renderer2 } from '@angular/core';
import { FileService } from './utils/services/file.service';
import { MessageService } from './utils/services/message.service';
import { StorageService } from './utils/services/storage.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private fileService: FileService,
    private storageService: StorageService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.fileService.requestPermission();
    this.setTheme();
  }

  async setTheme() {
    await this.storageService.init();
    await this.storageService.getTheme();
    this.storageService.theme$.subscribe(theme => {
      this.renderer.setAttribute(document.body,'color-theme', theme);
    });
  }
}
