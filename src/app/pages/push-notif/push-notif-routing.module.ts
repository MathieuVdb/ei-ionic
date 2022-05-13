import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PushNotifPage } from './push-notif.page';

const routes: Routes = [
  {
    path: '',
    component: PushNotifPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PushNotifPageRoutingModule {}
