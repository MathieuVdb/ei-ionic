import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PushNotifPageRoutingModule } from './push-notif-routing.module';

import { PushNotifPage } from './push-notif.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PushNotifPageRoutingModule
  ],
  declarations: [PushNotifPage]
})
export class PushNotifPageModule {}
