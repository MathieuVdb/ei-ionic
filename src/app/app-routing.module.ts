import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'presentation', 
    pathMatch: 'full'
  },
  {
    path: 'presentation',
    loadChildren: () => import('./pages/presentation/presentation.module').then(m => m.PresentationPageModule)
  },
  {
    path: 'ui',
    loadChildren: () => import('./pages/ui/ui.module').then( m => m.UiPageModule)
  },
  {
    path: 'personnages',
    loadChildren: () => import('./pages/personnages/personnages.module').then( m => m.PersonnagesPageModule)
  },
  {
    path: 'files',
    loadChildren: () => import('./pages/files/files.module').then( m => m.FilesPageModule)
  },
  {
    path: 'storage',
    loadChildren: () => import('./pages/storage/storage.module').then( m => m.StoragePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
