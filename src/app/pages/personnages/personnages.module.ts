import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonnagesPageRoutingModule } from './personnages-routing.module';

import { PersonnagesPage } from './personnages.page';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonnagesPageRoutingModule,
    ReactiveComponentModule
  ],
  declarations: [PersonnagesPage]
})

export class PersonnagesPageModule {}
