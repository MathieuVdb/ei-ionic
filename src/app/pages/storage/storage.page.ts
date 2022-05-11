import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/utils/services/storage.service';

@Component({
  selector: 'app-storage',
  templateUrl: './storage.page.html',
  styleUrls: ['./storage.page.scss'],
})
export class StoragePage implements OnInit {

  isDark = false;

  constructor(
    private storageService : StorageService
  ) { }

  ngOnInit() {
    this.initTheme();
  }

  initTheme() {
    this.storageService.theme$.subscribe(theme => {
      this.isDark = theme === 'dark'
    });
  }

  setTheme() {
    const theme = (this.isDark) ? 'dark' : 'light';
    this.storageService.setTheme(theme);
  }

  delete() {
    this.storageService.clear();
  }

}
