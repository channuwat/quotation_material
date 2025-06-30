import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListsRecipePage } from './lists-recipe.page';

const routes: Routes = [
  {
    path: '',
    component: ListsRecipePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListsRecipePageRoutingModule {}
