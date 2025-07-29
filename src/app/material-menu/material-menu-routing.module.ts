import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaterialMenuPage } from './material-menu.page';

const routes: Routes = [
  {
    path: '',
    component: MaterialMenuPage
  },
  {
    path: 'add-material',
    loadChildren: () => import('./add-material/add-material.module').then(m => m.AddMaterialModule)
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
    path: 'calculate-recipe',
    loadChildren: () => import('./calculate-materials/recipe/recipe-routing.module').then(m => m.RecipePageRoutingModule)
  },
  {
    path: 'lists-recipe',
    loadChildren: () => import('./calculate-materials/lists-recipe/lists-recipe.module').then(m => m.ListsRecipePageModule)
  },
  {
    path: 'add-recipe',
    loadChildren: () => import('./calculate-materials/recipe/recipe.module').then(m => m.RecipePageModule)
  },
  {
    path: 'edit-recipe/:id',
    loadChildren: () => import('./calculate-materials/edit-recipe/edit-recipe.module').then(m => m.EditRecipePageModule)
  },
  {
    path: 'lists-pairing-recipe',
    loadChildren: () => import('./calculate-materials/lists-pairing-recipe/lists-pairing-recipe.module').then( m => m.ListsPairingRecipePageModule)
  },
  {
    path: 'add-pairing-recipe',
    loadChildren: () => import('./calculate-materials/add-pairing-recipe/add-pairing-recipe.module').then( m => m.AddPairingRecipePageModule)
  },
  {
    path: 'edit-pairing-recipe/:id',
    loadChildren: () => import('./calculate-materials/add-pairing-recipe/add-pairing-recipe.module').then( m => m.AddPairingRecipePageModule)
  },
  {
    path: '',
    redirectTo: '/tabs/materials-management',
    pathMatch: 'full'
  },





];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialMenuPageRoutingModule { }
