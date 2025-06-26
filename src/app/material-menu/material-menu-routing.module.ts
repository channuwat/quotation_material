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
    path: '',
    redirectTo: '/tabs/materials-management',
    pathMatch: 'full'
  },
  {
    path: 'recipe',
    loadChildren: () => import('./calculate-materials/recipe/recipe.module').then( m => m.RecipePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaterialMenuPageRoutingModule { }
