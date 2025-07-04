import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsPairingRecipePage } from './lists-pairing-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: ListsPairingRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsPairingRecipePageRoutingModule {}
