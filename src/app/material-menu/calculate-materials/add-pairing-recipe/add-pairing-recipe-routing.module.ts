import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPairingRecipePage } from './add-pairing-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: AddPairingRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPairingRecipePageRoutingModule {}
