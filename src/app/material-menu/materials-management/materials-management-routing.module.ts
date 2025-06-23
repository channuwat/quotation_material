import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialsManagementPage } from './materials-management.page';


const routes: Routes = [
  {
    path: '',
    component: MaterialsManagementPage
  },
  {
    path: 'edit-material/:id',
    loadChildren: () => import('./edit-material/edit-material.module').then( m => m.EditMaterialPageModule)
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
export class MaterialsManagementPageRoutingModule {}
