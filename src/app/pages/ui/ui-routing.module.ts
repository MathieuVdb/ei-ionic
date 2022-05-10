import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UiPage } from './ui.page';

const routes: Routes = [
  {
    path: '',
    component: UiPage,
    children: [
        {
          path:'',
          redirectTo: 'buttons',
          pathMatch: 'full'
        },
        {
          path: 'buttons',
          loadChildren: () => import('./views/buttons/buttons.module').then( m => m.ButtonsPageModule)
        },
        {
          path: 'content',
          loadChildren: () => import('./views/content/content.module').then( m => m.ContentPageModule)
        },
        {
          path: 'grid',
          loadChildren: () => import('./views/grid/grid.module').then( m => m.GridPageModule)
        },
        {
          path: 'swipe',
          loadChildren: () => import('./views/swipe/swipe.module').then( m => m.SwipePageModule)
        },
        {
          path: 'messages',
          loadChildren: () => import('./views/messages/messages.module').then( m => m.MessagesPageModule)
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UiPageRoutingModule {}
