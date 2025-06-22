import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialsManagementPage } from './materials-management.page';


const routes: Routes = [
  {
    path: '',
    component: MaterialsManagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialsManagementPageRoutingModule {}
