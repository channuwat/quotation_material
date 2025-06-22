import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialMenuPage } from './material-menu.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialMenuPage
  },
  {
    path: 'materials-management',
    loadChildren: () => import('./materials-management/materials-management.module').then(m => m.MaterialsManagementPageModule)
  },
  {
    path: '',
    redirectTo: '/tabs/materials-management',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialMenuPageRoutingModule { }
