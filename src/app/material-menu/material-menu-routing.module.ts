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
    path: 'stock-status',
    loadChildren: () => import('./stock-status/stock-status.module').then(m => m.StockStatusPageModule)
  },
  {
    path: '',
    redirectTo: '/tabs/materials-management',
    pathMatch: 'full'
  },
  {
    path: 'stock-status',
    loadChildren: () => import('./material-menu.module').then( m => m.MaterialMenuPageModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialMenuPageRoutingModule { }
