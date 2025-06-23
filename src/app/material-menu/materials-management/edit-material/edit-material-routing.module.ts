import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditMaterialPage } from './edit-material.page';

const routes: Routes = [
  {
    path: '',
    component: EditMaterialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditMaterialPageRoutingModule {}
