import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialMenuPage } from './material-menu.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialMenuPageRoutingModule {}
