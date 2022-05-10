import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-content',
  templateUrl: './content.page.html',
  styleUrls: ['./content.page.scss'],
})
export class ContentPage  {

  @ViewChild(IonContent) content: IonContent;

  constructor(
    private menuController: MenuController
  ) { } 

  async toggleMenu() {
    /* Méthode : Open / Close / Toggle     */
    await this.menuController.toggle();
    const isOpen = await this.menuController.isOpen(); 
    console.info('Menu open ? ' + isOpen) 
  }

  scrollTop() { this.content.scrollToTop(1000); }
  scrollBottom() {  this.content.scrollToBottom(500); }

  scrolling() { console.log('Scrolling ....'); }
  scrollStart() { console.log('Starting scroll'); }
  scrollEnd() { console.log('Ending scroll'); }

}
