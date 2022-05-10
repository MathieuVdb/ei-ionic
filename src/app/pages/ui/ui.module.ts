import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UiPageRoutingModule } from './ui-routing.module';

import { UiPage } from './ui.page';
import { BottomNavComponent } from './component/bottom-nav/bottom-nav.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UiPageRoutingModule
  ],
  declarations: [UiPage, BottomNavComponent]
})
export class UiPageModule {}
