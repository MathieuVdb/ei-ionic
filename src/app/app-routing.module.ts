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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
